// ============================================================
// 根据 Clash Meta authentication 自动生成用户专属代理组 / 规则
// ============================================================

// ---------- 读取 YAML ----------
const yaml = ProxyUtils.yaml.safeLoad($content ?? $files[0])


// ---------- 读取 authentication ----------
const authentication = Array.isArray(yaml.authentication)
    ? yaml.authentication
    : []


// ---------- 提取用户名 ----------
const usernames = authentication
    .map(item => {
        if (typeof item !== 'string') return null

        // username:password
        const index = item.indexOf(':')

        if (index === -1) {
            return item.trim()
        }

        return item.slice(0, index).trim()
    })
    .filter(Boolean)


// ---------- 去重 ----------
const uniqueUsernames = [...new Set(usernames)]


// ============================================================
// 生成 Proxy Groups
// ============================================================

const generatedProxyGroups = []

for (const username of uniqueUsernames) {

    generatedProxyGroups.push({
        name: `TikTok-Bypass(${username})`,
        type: "select",
        "exclude-filter": "(?i)(🇭🇰|\\bHK\\b|Hong\\sKong|港)",
        "include-all": true
    })

    generatedProxyGroups.push({
        name: `TikTok(${username})`,
        type: "select",
        // 👇 新增这一行：将对应的 Bypass 策略组作为该组的第一个选项
        proxies: [`TikTok-Bypass(${username})`], 
        "include-all": true
    })

    generatedProxyGroups.push({
        name: `Match(${username})`,
        type: "select",
        "include-all": true
    })
}


// ============================================================
// 生成 Rules
// ============================================================

const generatedRules = []

for (const username of uniqueUsernames) {

    generatedRules.push(
        `SUB-RULE,(IN-USER,${username}),${username}`
    )
}

// 最终拒绝规则
generatedRules.push("MATCH,REJECT")


// ============================================================
// 生成 Sub-Rules
// ============================================================

const generatedSubRules = {}

for (const username of uniqueUsernames) {

    generatedSubRules[username] = [
        `RULE-SET,tiktok_bypass_domain,TikTok-Bypass(${username})`,
        `RULE-SET,tiktok_domain(wlrsx),TikTok(${username})`,
        `RULE-SET,tiktok_domain,TikTok(${username})`,
        `MATCH,Match(${username})`
    ]
}


// ============================================================
// 写回配置
// ============================================================

// 覆盖 proxy-groups
yaml["proxy-groups"] = generatedProxyGroups


// 覆盖 rules
yaml.rules = [
    // 全局直连规则
    "RULE-SET,custom-direct,DIRECT",

    // 用户规则
    ...generatedRules
]


// 覆盖 sub-rules
yaml["sub-rules"] = generatedSubRules


// ============================================================
// 输出 YAML
// ============================================================

$content = ProxyUtils.yaml.dump(yaml)