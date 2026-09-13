// ============================================================
// 根据 Clash Meta authentication 自动生成用户专属代理组 / 规则
// ============================================================
//
// 相比上一版的改动:
//   1. rules 不再整份覆盖 —— 保留你原有的规则(GEOSITE/GEOIP/自定义域名等)，
//      只把每个用户的 SUB-RULE 入口插到 rules 数组最前面，让认证用户的流量优先分流，
//      未命中任何用户的流量继续往下走你原来的规则，最后落到你自己的 MATCH,默认代理。
//   2. 去掉脚本里硬塞的 "RULE-SET,custom-direct,DIRECT" 和 "MATCH,REJECT" ——
//      前者你的模板里已经有了，后者会跟你自己的 MATCH,默认代理 冲突，交给你自己的规则兜底。
//   3. proxy-groups 也改成追加，而不是整份覆盖 —— 避免跟其它脚本(比如按国家生成分组的脚本)
//      链式使用时互相吃掉对方生成的内容。
//   4. sub-rules 改成合并写入，同样是为了不吃掉其它脚本可能已经写入的 sub-rules。
//   5. 加了一个轻量去重: 如果这个脚本被重复执行，不会把同一批 SUB-RULE 入口重复叠加进 rules。
// ============================================================

// ---------- 读取 YAML ----------
const yaml = ProxyUtils.yaml.safeLoad($content ?? $files[0]);

// ---------- 读取 authentication ----------
const authentication = Array.isArray(yaml.authentication) ? yaml.authentication : [];

// ---------- 提取用户名 ----------
const usernames = authentication
    .map(item => {
        if (typeof item !== 'string') return null;

        // username:password
        const index = item.indexOf(':');
        return index === -1 ? item.trim() : item.slice(0, index).trim();
    })
    .filter(Boolean);

// ---------- 去重 ----------
const uniqueUsernames = [...new Set(usernames)];

// ============================================================
// 生成 Proxy Groups
// ============================================================

const generatedProxyGroups = [];

for (const username of uniqueUsernames) {
    generatedProxyGroups.push({
        name: `TikTok-Bypass(${username})`,
        type: "select",
        "exclude-filter": "(?i)(🇭🇰|\\bHK\\b|Hong\\sKong|港)",
        "include-all": true,
    });

    generatedProxyGroups.push({
        name: `TikTok(${username})`,
        type: "select",
        // 将对应的 Bypass 策略组作为该组的第一个选项
        proxies: [`TikTok-Bypass(${username})`],
        "include-all": true,
    });

    generatedProxyGroups.push({
        name: `Match(${username})`,
        type: "select",
        "include-all": true,
    });
}

// ============================================================
// 生成每个用户的 SUB-RULE 入口 (插在 rules 最前面，而不是覆盖 rules)
// ============================================================

const generatedSubRuleEntries = uniqueUsernames.map(
    username => `SUB-RULE,(IN-USER,${username}),${username}`
);

// ============================================================
// 生成 Sub-Rules
// ============================================================

const generatedSubRules = {};

for (const username of uniqueUsernames) {
    generatedSubRules[username] = [
        `RULE-SET,tiktok_bypass_domain,TikTok-Bypass(${username})`,
        `RULE-SET,tiktok_domain(wlrsx),TikTok(${username})`,
        `RULE-SET,tiktok_domain,TikTok(${username})`,
        `MATCH,Match(${username})`,
    ];
}

// ============================================================
// 写回配置
// ============================================================

// ---- proxy-groups: 追加，不覆盖 ----
const existingProxyGroups = Array.isArray(yaml["proxy-groups"]) ? yaml["proxy-groups"] : [];
const generatedGroupNames = new Set(generatedProxyGroups.map(g => g.name));
// 如果重复执行过，先把上一次生成的同名组去掉，避免越叠越多
const dedupedExistingProxyGroups = existingProxyGroups.filter(g => !generatedGroupNames.has(g.name));

yaml["proxy-groups"] = [
    ...dedupedExistingProxyGroups,
    ...generatedProxyGroups,
];

// ---- rules: 保留原有规则，只把 SUB-RULE 入口插到最前面 ----
const existingRules = Array.isArray(yaml.rules) ? yaml.rules : [];
const subRuleEntrySet = new Set(generatedSubRuleEntries);
// 同样做一次去重，避免重复执行时 SUB-RULE 入口越插越多
const dedupedExistingRules = existingRules.filter(r => !subRuleEntrySet.has(r));

yaml.rules = [
    ...generatedSubRuleEntries,
    ...dedupedExistingRules,
];

// ---- sub-rules: 合并写入，不覆盖 ----
yaml["sub-rules"] = {
    ...(yaml["sub-rules"] || {}),
    ...generatedSubRules,
};

// ============================================================
// 输出 YAML
// ============================================================

$content = ProxyUtils.yaml.dump(yaml);