// ProxyIconAutoTagger：为 proxy-groups 自动匹配并注入 icon（应用图标优先，其次国家/地区）

// 1. 将 YAML 字符串解析为 JS 对象
let config = ProxyUtils.yaml.safeLoad($content ?? $files[0]);

// ================= 数据字典区 =================

// 图标仓库基址（统一维护，换源只改这一行）
// 主仓库：Hawaiine/Oasisic-Icons —— 441 图标 / 23 分类，每日自动同步上游（Qure Color 等）
const ICON_BASE = "https://fastly.jsdelivr.net/gh/Hawaiine/Oasisic-Icons@main/icons";
const FLAG_ICON_BASE = "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags";

// 业务应用图标字典（全部使用小写作为键名进行模糊匹配）
// path 对应 Oasisic-Icons 仓库内 "<分类>/<文件名>.png"
const appIcons = {
    // 即时通讯 / 社交 Social
    "whatsapp": `${ICON_BASE}/Social/WhatsApp-2.png`,
    "telegram": `${ICON_BASE}/Social/Telegram-1.png`,
    "discord": `${ICON_BASE}/Social/Discord-1.png`,
    "facebook": `${ICON_BASE}/Social/Facebook-1.png`,
    "instagram": `${ICON_BASE}/Social/Instagram-1.png`,
    "messenger": `${ICON_BASE}/Social/Messenger.png`,
    "reddit": `${ICON_BASE}/Social/Reddit-1.png`,
    "twitter": `${ICON_BASE}/Social/X-1.png`,
    "x-twitter": `${ICON_BASE}/Social/X-1.png`,
    "threads": `${ICON_BASE}/Social/Threads-1.png`,
    "line": `${ICON_BASE}/Social/Line.png`,
    "wechat": `${ICON_BASE}/Social/WeChat-1.png`,
    "tiktok": `${ICON_BASE}/Social/TikTok-1.png`,

    // AI
    "chatgpt": `${ICON_BASE}/AI/OpenAI-1.png`,
    "openai": `${ICON_BASE}/AI/OpenAI-1.png`,
    "claude": `${ICON_BASE}/AI/Anthropic-1.png`,
    "anthropic": `${ICON_BASE}/AI/Anthropic-1.png`,
    "copilot": `${ICON_BASE}/AI/Copilot-1.png`,
    "perplexity": `${ICON_BASE}/AI/Perplexity.png`,
    "gemini": `${ICON_BASE}/Google/Gemini.png`,

    // 影音 / 流媒体 Media & Music
    "netflix": `${ICON_BASE}/Media/Netflix-1.png`,
    "disney": `${ICON_BASE}/Media/Disney-Plus-1.png`,
    "hbo": `${ICON_BASE}/Media/HBO-1.png`,
    "hulu": `${ICON_BASE}/Media/Hulu.png`,
    "primevideo": `${ICON_BASE}/Media/PrimeVideo-1.png`,
    "prime video": `${ICON_BASE}/Media/PrimeVideo-1.png`,
    "youtube": `${ICON_BASE}/Media/YouTube-1.png`,
    "spotify": `${ICON_BASE}/Music/Spotify-1.png`,
    "tidal": `${ICON_BASE}/Music/TIDAL-1.png`,

    // Google / Microsoft
    "google": `${ICON_BASE}/Google/Google-1.png`,
    "gmail": `${ICON_BASE}/Google/Gmail.png`,
    "microsoft": `${ICON_BASE}/Microsoft/Microsoft-1.png`,
    "bing": `${ICON_BASE}/Microsoft/Bing-1.png`,
    "onedrive": `${ICON_BASE}/Microsoft/OneDrive.png`,

    // 支付 / 金融 Payment
    "paypal": `${ICON_BASE}/Payment/PayPal-1.png`,
    "wise": "https://upload.wikimedia.org/wikipedia/commons/e/e8/Wise_Logo_512x124.svg", // Oasisic-Icons 暂无 Wise，沿用原有来源
    "alipay": `${ICON_BASE}/Payment/AliPay.png`,

    // 云盘 Drive
    "dropbox": `${ICON_BASE}/Drive/Dropbox-1.png`,
    "googledrive": `${ICON_BASE}/Google/GoogleDrive.png`,

    // 工具 Tool
    "github": `${ICON_BASE}/Tool/GitHub-1.png`,
    "notion": `${ICON_BASE}/Tool/Notion.png`,
    "cloudflare": `${ICON_BASE}/Tool/Cloudflare.png`,
    "1password": `${ICON_BASE}/Tool/1Password.png`,
    "speedtest": `${ICON_BASE}/Tool/Speedtest-1.png`,

    // 游戏 Game
    "steam": `${ICON_BASE}/Game/Steam-1.png`,
    "xbox": `${ICON_BASE}/Game/Xbox.png`,
    "playstation": `${ICON_BASE}/Game/PlayStation-1.png`,
    "epicgames": `${ICON_BASE}/Game/EpicGames.png`,
};

const countryRegions = [
    { code: "HK", icon: `${FLAG_ICON_BASE}/hk.svg`, filter: "香港|\\bHK\\b|Hong\\sKong" },
    { code: "TW", icon: `${FLAG_ICON_BASE}/tw.svg`, filter: "台湾|\\bTW\\b|Taiwan|🇹🇼" },
    { code: "SG", icon: `${FLAG_ICON_BASE}/sg.svg`, filter: "新加坡|狮城|\\bSG\\b|Singapore|🇸🇬" },
    { code: "JP", icon: `${FLAG_ICON_BASE}/jp.svg`, filter: "日本|东京|\\bJP\\b|Japan|🇯🇵" },
    { code: "US", icon: `${FLAG_ICON_BASE}/us.svg`, filter: "美国|洛杉矶|\\bUS(A)?\\b|United\\sStates|America|🇺🇸" },
    { code: "DE", icon: `${FLAG_ICON_BASE}/de.svg`, filter: "德国|\\bDE\\b|Germany|🇩🇪" },
    { code: "KR", icon: `${FLAG_ICON_BASE}/kr.svg`, filter: "韩国|首尔|\\bKR\\b|Korea|🇰🇷" },
    { code: "UK", icon: `${FLAG_ICON_BASE}/gb.svg`, filter: "英国|\\bUK\\b|United\\sKingdom|Britain|🇬🇧" },
    { code: "CA", icon: `${FLAG_ICON_BASE}/ca.svg`, filter: "加拿大|\\bCA\\b|Canada|🇨🇦" },
    { code: "AU", icon: `${FLAG_ICON_BASE}/au.svg`, filter: "澳大利亚|澳洲|\\bAU\\b|Australia|🇦🇺" },
    { code: "FR", icon: `${FLAG_ICON_BASE}/fr.svg`, filter: "法国|\\bFR\\b|France|🇫🇷" },
    { code: "NL", icon: `${FLAG_ICON_BASE}/nl.svg`, filter: "荷兰|\\bNL\\b|Netherlands|🇳🇱" },
    { code: "RU", icon: `${FLAG_ICON_BASE}/ru.svg`, filter: "俄罗斯|\\bRU\\b|Russia|🇷🇺" },
    { code: "IN", icon: `${FLAG_ICON_BASE}/in.svg`, filter: "印度|\\bIN\\b|India|🇮🇳" },
    { code: "MY", icon: `${FLAG_ICON_BASE}/my.svg`, filter: "马来西亚|大马|吉隆坡|\\bMY\\b|Malaysia|🇲🇾" },
    { code: "TH", icon: `${FLAG_ICON_BASE}/th.svg`, filter: "泰国|曼谷|\\bTH\\b|Thailand|🇹🇭" },
    { code: "VN", icon: `${FLAG_ICON_BASE}/vn.svg`, filter: "越南|河内|胡志明|\\bVN\\b|Vietnam|🇻🇳" },
    { code: "PH", icon: `${FLAG_ICON_BASE}/ph.svg`, filter: "菲律宾|马尼拉|\\bPH\\b|Philippines|🇵🇭" },
    { code: "ID", icon: `${FLAG_ICON_BASE}/id.svg`, filter: "印尼|印度尼西亚|雅加达|\\bID\\b|Indonesia|🇮🇩" },
    { code: "TR", icon: `${FLAG_ICON_BASE}/tr.svg`, filter: "土耳其|伊斯坦布尔|\\bTR\\b|Turkey|🇹🇷" },
    { code: "AR", icon: `${FLAG_ICON_BASE}/ar.svg`, filter: "阿根廷|\\bAR\\b|Argentina|🇦🇷" },
    { code: "BR", icon: `${FLAG_ICON_BASE}/br.svg`, filter: "巴西|圣保罗|\\bBR\\b|Brazil|🇧🇷" },
    { code: "IT", icon: `${FLAG_ICON_BASE}/it.svg`, filter: "意大利|米兰|\\bIT\\b|Italy|🇮🇹" },
    { code: "ES", icon: `${FLAG_ICON_BASE}/es.svg`, filter: "西班牙|马德里|\\bES\\b|Spain|🇪🇸" },
];

// ================= 预编译区 =================
// 提前把国家正则编译好，避免在 getIconForGroup 里对每个 group 重复 new RegExp()
const compiledCountryRegions = countryRegions.map(region => ({
    icon: region.icon,
    regex: new RegExp(region.filter.replace(/^\(\?i\)/, ''), 'i'),
}));

// 应用关键词也做同样处理，并用 \b 词边界降低误伤概率
// （中文关键词、含空格的关键词如 "prime video" 不套用词边界，因为 \b 对它们没有实际约束意义）
const compiledAppIcons = Object.entries(appIcons).map(([key, url]) => {
    const isPlainAsciiWord = /^[a-z0-9]+$/i.test(key);
    const pattern = isPlainAsciiWord ? `\\b${key}\\b` : key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return { regex: new RegExp(pattern, 'i'), url };
});

// ================= 核心匹配逻辑 =================
function getIconForGroup(groupName) {
    if (!groupName) return null;

    // 1. 优先匹配业务应用（如 WhatsApp 等）
    for (const { regex, url } of compiledAppIcons) {
        if (regex.test(groupName)) {
            return url;
        }
    }

    // 2. 如果不是特定业务，则匹配国家/地区
    for (const { regex, icon } of compiledCountryRegions) {
        if (regex.test(groupName)) {
            return icon;
        }
    }

    return null; // 都没匹配上，返回 null
}

// ================= 修改 YAML 核心对象 =================
if (config && Array.isArray(config['proxy-groups'])) {
    config['proxy-groups'].forEach(group => {
        const matchedIconUrl = getIconForGroup(group.name);

        if (matchedIconUrl) {
            // 给当前代理组注入 icon 属性
            group.icon = matchedIconUrl;
        }
    });
}

// 4. 将修改后的 JS 对象，重新打包为 YAML 字符串，覆盖输出
$content = ProxyUtils.yaml.dump(config);
