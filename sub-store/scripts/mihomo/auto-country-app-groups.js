// ============================================================================
// Script: 地区分组自动探测 & 聚合组生成 & AppGroup与Rule智能注入引擎
// ============================================================================

const defGroupName = ($options && $options.defGroupName) || '默认代理';

const DICTIONARY_URL = "https://cdn.jsdelivr.net/gh/wlrsx/proxy-rules-kit@refs/heads/main/sub-store/scripts/mihomo/dictionary.js";
const dictCode = await fetch(DICTIONARY_URL).then(res => res.text());
const dict = new Function(dictCode)();
const countryRegions = dict.countryRegions || [];
const appRules = dict.appRules || {};

let config = ProxyUtils.yaml.safeLoad($content ?? $files[0]);
const existingGroups = config["proxy-groups"] || [];

const TEST_URL = "https://www.gstatic.com/generate_204";

// ---------- 1. 探测 proxies 中出现的国家 ----------
const nodeNames = (Array.isArray(config.proxies) ? config.proxies : []).map(p => p.name || "");
const compiledCountryRegions = countryRegions.map(region => ({
    ...region,
    regex: new RegExp(region.filter.replace(/^\(\?i\)/, ''), 'i'),
}));

const presentCountries = compiledCountryRegions.filter(({ regex }) =>
    nodeNames.some(name => regex.test(name))
);

// ---------- 2. 为每个存在的国家生成基础分组 ----------
function buildGroupsForCountry({ code, filter }) {
    return [
        { name: `${code} 故障转移`, type: "fallback", url: TEST_URL, interval: 300, filter, "include-all": true },
        { name: `${code} 自动延迟`, type: "url-test", url: TEST_URL, interval: 300, tolerance: 50, filter, "include-all": true },
        { name: `${code} 负载均衡 (轮询)`, type: "load-balance", strategy: "round-robin", url: TEST_URL, interval: 300, filter, "include-all": true },
    ];
}
const generatedCountryGroups = presentCountries.flatMap(buildGroupsForCountry);
const countryGroupNames = generatedCountryGroups.map(g => g.name);

// ---------- 3. 生成聚合国家组的函数 ----------
function buildAggregatedCountryGroup(groupName, parentType, childType, excludeRegex = null) {
    const proxies = generatedCountryGroups
        .filter(g => g.type === childType)
        .filter(g => !excludeRegex || !excludeRegex.test(g.name))
        .map(g => g.name);

    return {
        name: groupName,
        type: parentType,
        url: TEST_URL,
        interval: 300,
        proxies: proxies.length > 0 ? proxies : [defGroupName],
    };
}

// ---------- 4. 创建聚合组 ----------
const tiktokFallbackGroup = buildAggregatedCountryGroup(
    "TikTok Fallback",
    "fallback",
    "url-test",
    /香港|HK|Hong\s*Kong/i
);

const aiFallbackGroup = buildAggregatedCountryGroup(
    "AI Fallback",
    "fallback",
    "fallback",
    /香港|HK|Hong\s*Kong/i
);

// ---------- 5. AppGroup 应用组处理逻辑 ----------
const templateTargetGroup = existingGroups.find(g => g.name === defGroupName);
const appGroupsRaw = existingGroups.filter(g => g.name !== defGroupName);

const targetGroup = templateTargetGroup
    ? { type: "select", ...templateTargetGroup, proxies: [...countryGroupNames] }
    : { name: defGroupName, type: "select", proxies: [...countryGroupNames] };

const defaultAppGroupProxies = [defGroupName, ...countryGroupNames];

const patchedAppGroups = appGroupsRaw.map(g => {
    const existingProxies = Array.isArray(g.proxies) ? g.proxies : [];
    // 使用 Set 去重，让原有的 REJECT/DIRECT 等优先放在最前面
    const proxies = [...new Set([...existingProxies, ...defaultAppGroupProxies])];

    const targetIdx = proxies.indexOf(defGroupName);
    const insertIdx = targetIdx !== -1 ? targetIdx + 1 : 1; // 默认插入到“默认代理”之后，或排在 REJECT 之后

    // 针对 TikTok 组注入
    if (/tiktok/i.test(g.name)) {
        proxies.splice(insertIdx, 0, tiktokFallbackGroup.name);
    }

    // 针对 AI 组注入
    // 注意: \bAI\b 确保只匹配独立的 AI 单词，不会把 T(ai)wan 匹配进去
    if (/\bAI\b|deepseek|gemini|chatgpt|openai|claude|copilot|anthropic|midjourney/i.test(g.name)) {
        proxies.splice(insertIdx, 0, aiFallbackGroup.name);
    }

    return { type: "select", ...g, proxies };
});

// ---------- 6. 组装最终的 proxy-groups ----------
config["proxy-groups"] = [
    targetGroup,
    ...patchedAppGroups,
    aiFallbackGroup,
    tiktokFallbackGroup,
    ...generatedCountryGroups
];

// ---------- 7. rule-providers / rules 规则自动注入 ----------
config["rule-providers"] = config["rule-providers"] || {};
config.rules = Array.isArray(config.rules) ? config.rules : [];

const finalGroupNames = new Set(config["proxy-groups"].map(g => g.name));

// 提取当前 rules 中已有的 RULE-SET 的 provider key，避免重复写入
const usedKeys = new Set(
    config.rules
        .filter(r => typeof r === "string" && r.startsWith("RULE-SET,"))
        .map(r => r.split(",")[1])
);

const domainLines = [];
const ipLines = [];

Object.entries(appRules).forEach(([groupName, providers]) => {
    // 安全校验：字典里配置了，但配置中没有这个策略组 —— 跳过，避免规则指向不存在的组报错
    if (!finalGroupNames.has(groupName)) return;

    providers.forEach(({ key, behavior, format, url, noResolve }) => {
        if (usedKeys.has(key)) return; // 已存在则跳过

        config["rule-providers"][key] = {
            type: "http",
            interval: 86400,
            behavior,
            format,
            url,
        };

        const line = `RULE-SET,${key},${groupName}${noResolve ? ",no-resolve" : ""}`;

        // 区分 domain 规则 和 ipcidr 规则，保证 ipcidr 规则放在后面
        (behavior === "ipcidr" ? ipLines : domainLines).push(line);
        usedKeys.add(key);
    });
});

const newRuleLines = [...domainLines, ...ipLines];

if (newRuleLines.length > 0) {
    // 智能寻址：精准定位到“大陆直连规则块”的开头
    let anchorIndex = config.rules.findIndex(r => typeof r === "string" && /^(?:GEOSITE|GEOIP),(?:cn|microsoft@cn|apple-cn|steam@cn)/i.test(r));

    // 如果没写大陆规则，就找 MATCH 兜底
    if (anchorIndex === -1) {
        anchorIndex = config.rules.findIndex(r => typeof r === "string" && /^MATCH,/i.test(r));
    }

    // 插入规则
    if (anchorIndex === -1) {
        config.rules.push(...newRuleLines);
    } else {
        config.rules.splice(anchorIndex, 0, ...newRuleLines);
    }
}

// ---------- 9. 返回配置 ----------
$content = ProxyUtils.yaml.dump(config);