// ========================= AutoCountryGroups + AutoAppGroups + AutoAppRules =========================

const targetGroupName = (typeof $arguments !== 'undefined' && $arguments.defGroupName)
    ? $arguments.defGroupName
    : "默认代理";

// ---------- 0. 拉取云端字典 ----------
// const DICTIONARY_URL = "https://cdn.jsdelivr.net/gh/wlrsx/proxy-rules-kit@main/sub-store/scripts/dictionary.js";
const DICTIONARY_URL = "https://cdn.jsdelivr.net/gh/wlrsx/proxy-rules-kit@refs/heads/main/sub-store/scripts/dictionary.js";
const dictCode = await fetch(DICTIONARY_URL).then(res => res.text());
const dict = new Function(dictCode)();

const countryRegions = dict.countryRegions || [];
const appRules       = dict.appRules       || {}; // { AI: [...], Facebook: [...], ... }

let config = ProxyUtils.yaml.safeLoad($content ?? $files[0]);

const TEST_URL = (typeof $arguments !== 'undefined' && $arguments.testUrl) || "https://www.gstatic.com/generate_204";

// ---------- 1. proxy-group 模板：直接写死在脚本里 ----------
const fallbackTemplate = { type: "fallback", url: TEST_URL, interval: 300 };
const urltestTemplate  = { type: "url-test", url: TEST_URL, interval: 300, tolerance: 50 };
const lbHashTemplate   = { type: "load-balance", strategy: "consistent-hashing", url: TEST_URL, interval: 300 };
const lbRRTemplate     = { type: "load-balance", strategy: "round-robin", url: TEST_URL, interval: 300 };

const existingGroups = Array.isArray(config["proxy-groups"]) ? config["proxy-groups"] : [];

// ---------- 2. 探测 proxies 中出现的国家 ----------
const nodeNames = (Array.isArray(config.proxies) ? config.proxies : []).map(p => p.name || "");
const compiledCountryRegions = countryRegions.map(region => ({
    ...region,
    regex: new RegExp(region.filter.replace(/^\(\?i\)/, ''), 'i'),
}));
const presentCountries = compiledCountryRegions.filter(({ regex }) =>
    nodeNames.some(name => regex.test(name))
);

// ---------- 3. 为每个国家生成四类分组 ----------
function buildGroupsForCountry({ code, filter }) {
    return [
        { name: `${code} 故障转移`, ...fallbackTemplate, filter, "include-all": true },
        { name: `${code} 自动延迟`, ...urltestTemplate, filter, "include-all": true },
        { name: `${code} 负载均衡 (散列)`, ...lbHashTemplate, filter, "include-all": true },
        { name: `${code} 负载均衡 (轮询)`, ...lbRRTemplate, filter, "include-all": true },
    ];
}
const generatedGroups = presentCountries.flatMap(buildGroupsForCountry);
const generatedNamesArr = generatedGroups.map(g => g.name);
const generatedNames = new Set(generatedNamesArr);

// ---------- 4. 拆分模板里手写的组：默认代理单独取出，其余都是"应用组" ----------
const templateTargetGroup = existingGroups.find(g => g.name === targetGroupName);
const appGroupsRaw = existingGroups.filter(
    g => !generatedNames.has(g.name) && g.name !== targetGroupName
);

// ---------- 5. 应用组：注入 [默认代理, ...国家分组]，保留模板自身字段（exclude-filter 等）----------
const appGroupProxies = [targetGroupName, ...generatedNamesArr];

const patchedAppGroups = appGroupsRaw.map(g => ({
    type: "select",              // 默认 select，模板显式写了 type 会覆盖
    ...g,                        // 模板里手写的字段（exclude-filter、disable-udp 等）原样保留
    proxies: appGroupProxies,    // 只强制覆盖 proxies
}));

// ---------- 6. 默认代理组：塞进所有国家分组 ----------
const targetGroup = templateTargetGroup
    ? { type: "select", ...templateTargetGroup, proxies: [...generatedNamesArr] }
    : { name: targetGroupName, type: "select", proxies: [...generatedNamesArr] };

// ---------- 7. 组装最终 proxy-groups ----------
config["proxy-groups"] = [targetGroup, ...patchedAppGroups, ...generatedGroups];

// ---------- 8. 应用组 → 规则集/规则 自动写入 ----------
config["rule-providers"] = config["rule-providers"] || {};
config.rules = Array.isArray(config.rules) ? config.rules : [];

const existingGroupNames = new Set(config["proxy-groups"].map(g => g.name));

// 已经在 rules 里出现过的 provider key（含手写、含上次脚本生成的），避免重复写入
const usedKeys = new Set(
    config.rules
        .filter(r => typeof r === "string" && r.startsWith("RULE-SET,"))
        .map(r => r.split(",")[1])
);

const domainLines = [];
const ipLines = [];

Object.entries(appRules).forEach(([groupName, providers]) => {
    // 字典里配置了，但模板还没建这个策略组 —— 跳过，避免规则指向不存在的组
    if (!existingGroupNames.has(groupName)) return;

    providers.forEach(({ key, behavior, format, url, noResolve }) => {
        if (usedKeys.has(key)) return; // 已存在，不重复添加

        config["rule-providers"][key] = {
            type: "http",
            interval: 86400,
            behavior,
            format,
            url,
        };

        const line = `RULE-SET,${key},${groupName}${noResolve ? ",no-resolve" : ""}`;

        (behavior === "ipcidr" ? ipLines : domainLines).push(line);
        usedKeys.add(key);
    });
});

const newRuleLines = [...domainLines, ...ipLines];

if (newRuleLines.length) {
    // 【核心修复】精准定位到“大陆直连规则块”的开头，忽略 GEOSITE,private
    let anchorIndex = config.rules.findIndex(r => /^(?:GEOSITE|GEOIP),(?:cn|microsoft@cn|apple-cn|steam@cn)/i.test(r));
    
    // 如果没写大陆规则，就找 MATCH 兜底
    if (anchorIndex === -1) {
        anchorIndex = config.rules.findIndex(r => /^MATCH,/i.test(r));
    }
    
    // 插入规则
    if (anchorIndex === -1) {
        config.rules.push(...newRuleLines);
    } else {
        config.rules.splice(anchorIndex, 0, ...newRuleLines);
    }
}

// ---------- 9. 清理仅供 YAML 复用的锚点字段（mihomo 内核不认，留着也没影响，可选）----------
delete config['group-anchor'];
delete config['rule-anchor'];

$content = ProxyUtils.yaml.dump(config);