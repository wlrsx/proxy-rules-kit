const ICON_BASE = "https://fastly.jsdelivr.net/gh/Hawaiine/Oasisic-Icons@main/icons";
const FLAG_ICON_BASE = "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags";

const dict = {
    appIcons: {
        // 即时通讯 / 社交 Social
        "whatsapp": `${ICON_BASE}/Social/WhatsApp.png`,
        "telegram": `${ICON_BASE}/Social/Telegram-2.png`,
        "discord": `${ICON_BASE}/Social/Discord.png`,
        "facebook": `${ICON_BASE}/Social/Facebook-1.png`,
        "instagram": `${ICON_BASE}/Social/Instagram.png`,
        "messenger": `${ICON_BASE}/Social/Messenger.png`,
        "reddit": `${ICON_BASE}/Social/Reddit.png`,
        "twitter": `${ICON_BASE}/Social/X.png`,
        "x-twitter": `${ICON_BASE}/Social/X.png`,
        "threads": `${ICON_BASE}/Social/Threads.png`,
        "line": `${ICON_BASE}/Social/Line.png`,
        "wechat": `${ICON_BASE}/Social/WeChat.png`,
        "tiktok": `${ICON_BASE}/Social/TikTok.png`,

        // AI
        "ai": `${ICON_BASE}/AI/AI.png`,
        "chatgpt": `${ICON_BASE}/AI/OpenAI-1.png`,
        "openai": `${ICON_BASE}/AI/OpenAI-1.png`,
        "claude": `${ICON_BASE}/AI/Anthropic-1.png`,
        "anthropic": `${ICON_BASE}/AI/Anthropic-1.png`,
        "copilot": `${ICON_BASE}/AI/Copilot-1.png`,
        "perplexity": `${ICON_BASE}/AI/Perplexity.png`,
        "gemini": `${ICON_BASE}/Google/Gemini.png`,
        "deepseek": `${ICON_BASE}/AI/DeepSeek.png`,

        // 影音 / 流媒体 Media & Music
        "netflix": `${ICON_BASE}/Media/Netflix.png`,
        "disney": `${ICON_BASE}/Media/Disney-Plus-1.png`,
        "hbo": `${ICON_BASE}/Media/HBO-4.png`,
        "hulu": `${ICON_BASE}/Media/Hulu.png`,
        "primevideo": `${ICON_BASE}/Media/PrimeVideo.png`,
        "prime video": `${ICON_BASE}/Media/PrimeVideo.png`,
        "youtube": `${ICON_BASE}/Google/YouTube.png`,
        "spotify": `${ICON_BASE}/Music/Spotify-1.png`,
        "tidal": `${ICON_BASE}/Music/TIDAL-1.png`,

        // Google / Microsoft
        "google": `${ICON_BASE}/Google/Google-2.png`,
        "gmail": `${ICON_BASE}/Google/Gmail.png`,
        "microsoft": `${ICON_BASE}/Microsoft/Microsoft-1.png`,
        "bing": `${ICON_BASE}/Microsoft/Bing-1.png`,
        "onedrive": `${ICON_BASE}/Microsoft/OneDrive.png`,
        "apple": `${ICON_BASE}/Apple/Apple.png`,

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
        "game": `${ICON_BASE}/Game/Game-1.png`,
        "games": `${ICON_BASE}/Game/Game-1.png`,
        "steam": `${ICON_BASE}/Game/Steam-1.png`,
        "xbox": `${ICON_BASE}/Game/Xbox.png`,
        "playstation": `${ICON_BASE}/Game/PlayStation-1.png`,
        "epicgames": `${ICON_BASE}/Game/EpicGames.png`,
    },
    // 过滤规则严格排序：
    // 国旗 | 国家代码 | 国家英文全名 | 简体中文全名 | 繁体中文命名 | 简体城市命名 | 繁体城市命名 | 城市英文全名
    countryRegions: [
        // ================= 亚洲 (Asia) =================
        { code: "HK", icon: `${FLAG_ICON_BASE}/hk.svg`, filter: "(?i)(🇭🇰|\\bHK\\b|Hong\\sKong|香港|香港|九龙|九龍|Kowloon)" },
        { code: "TW", icon: `${FLAG_ICON_BASE}/tw.svg`, filter: "(?i)(🇹🇼|\\bTW\\b|Taiwan|台湾|台灣|台北|臺北|Taipei)" },
        { code: "SG", icon: `${FLAG_ICON_BASE}/sg.svg`, filter: "(?i)(🇸🇬|\\bSG\\b|Singapore|新加坡|新加坡|狮城|獅城|Lion\\sCity)" },
        { code: "JP", icon: `${FLAG_ICON_BASE}/jp.svg`, filter: "(?i)(🇯🇵|\\bJP\\b|Japan|日本|日本|东京|東京|Tokyo)" },
        { code: "KR", icon: `${FLAG_ICON_BASE}/kr.svg`, filter: "(?i)(🇰🇷|\\bKR\\b|Korea|韩国|韓國|首尔|首爾|Seoul)" },
        { code: "MY", icon: `${FLAG_ICON_BASE}/my.svg`, filter: "(?i)(🇲🇾|\\bMY\\b|Malaysia|马来西亚|馬來西亞|吉隆坡|吉隆坡|Kuala\\sLumpur)" },
        { code: "TH", icon: `${FLAG_ICON_BASE}/th.svg`, filter: "(?i)(🇹🇭|\\bTH\\b|Thailand|泰国|泰國|曼谷|曼谷|Bangkok)" },
        { code: "VN", icon: `${FLAG_ICON_BASE}/vn.svg`, filter: "(?i)(🇻🇳|\\bVN\\b|Vietnam|越南|越南|胡志明|胡志明|Ho\\sChi\\sMinh)" },
        { code: "PH", icon: `${FLAG_ICON_BASE}/ph.svg`, filter: "(?i)(🇵🇭|\\bPH\\b|Philippines|菲律宾|菲律賓|马尼拉|馬尼拉|Manila)" },
        { code: "ID", icon: `${FLAG_ICON_BASE}/id.svg`, filter: "(?i)(🇮🇩|\\bID\\b|Indonesia|印度尼西亚|印度尼西亞|雅加达|雅加達|Jakarta)" },
        { code: "IN", icon: `${FLAG_ICON_BASE}/in.svg`, filter: "(?i)(🇮🇳|\\bIN\\b|India|印度|印度|孟买|孟買|Mumbai)" },
        { code: "AE", icon: `${FLAG_ICON_BASE}/ae.svg`, filter: "(?i)(🇦🇪|\\bAE\\b|United\\sArab\\sEmirates|阿联酋|阿聯酋|迪拜|迪拜|Dubai)" },
        { code: "IL", icon: `${FLAG_ICON_BASE}/il.svg`, filter: "(?i)(🇮🇱|\\bIL\\b|Israel|以色列|以色列|特拉维夫|特拉維夫|Tel\\sAviv)" },
        { code: "TR", icon: `${FLAG_ICON_BASE}/tr.svg`, filter: "(?i)(🇹🇷|\\bTR\\b|Turkey|土耳其|土耳其|伊斯坦布尔|伊斯坦布爾|Istanbul)" },

        // ================= 欧洲 (Europe) =================
        { code: "UK", icon: `${FLAG_ICON_BASE}/gb.svg`, filter: "(?i)(🇬🇧|\\bUK\\b|United\\sKingdom|英国|英國|伦敦|倫敦|London)" },
        { code: "DE", icon: `${FLAG_ICON_BASE}/de.svg`, filter: "(?i)(🇩🇪|\\bDE\\b|Germany|德国|德國|法兰克福|法蘭克福|Frankfurt)" },
        { code: "FR", icon: `${FLAG_ICON_BASE}/fr.svg`, filter: "(?i)(🇫🇷|\\bFR\\b|France|法国|法國|巴黎|巴黎|Paris)" },
        { code: "NL", icon: `${FLAG_ICON_BASE}/nl.svg`, filter: "(?i)(🇳🇱|\\bNL\\b|Netherlands|荷兰|荷蘭|阿姆斯特丹|阿姆斯特丹|Amsterdam)" },
        { code: "RU", icon: `${FLAG_ICON_BASE}/ru.svg`, filter: "(?i)(🇷🇺|\\bRU\\b|Russia|俄罗斯|俄羅斯|莫斯科|莫斯科|Moscow)" },
        { code: "IT", icon: `${FLAG_ICON_BASE}/it.svg`, filter: "(?i)(🇮🇹|\\bIT\\b|Italy|意大利|意大利|米兰|米蘭|Milan)" },
        { code: "ES", icon: `${FLAG_ICON_BASE}/es.svg`, filter: "(?i)(🇪🇸|\\bES\\b|Spain|西班牙|西班牙|马德里|馬德里|Madrid)" },
        { code: "CH", icon: `${FLAG_ICON_BASE}/ch.svg`, filter: "(?i)(🇨🇭|\\bCH\\b|Switzerland|瑞士|瑞士|苏黎世|蘇黎世|Zurich)" },
        { code: "SE", icon: `${FLAG_ICON_BASE}/se.svg`, filter: "(?i)(🇸🇪|\\bSE\\b|Sweden|瑞典|瑞典|斯德哥尔摩|斯德哥爾摩|Stockholm)" },
        { code: "PL", icon: `${FLAG_ICON_BASE}/pl.svg`, filter: "(?i)(🇵🇱|\\bPL\\b|Poland|波兰|波蘭|华沙|華沙|Warsaw)" },

        // ================= 北美洲 (North America) =================
        { code: "US", icon: `${FLAG_ICON_BASE}/us.svg`, filter: "(?i)(🇺🇸|\\bUS(A)?\\b|United\\sStates|美国|美國|洛杉矶|洛杉磯|Los\\sAngeles)" },
        { code: "CA", icon: `${FLAG_ICON_BASE}/ca.svg`, filter: "(?i)(🇨🇦|\\bCA\\b|Canada|加拿大|加拿大|多伦多|多倫多|Toronto)" },
        { code: "MX", icon: `${FLAG_ICON_BASE}/mx.svg`, filter: "(?i)(🇲🇽|\\bMX\\b|Mexico|墨西哥|墨西哥|墨西哥城|墨西哥城|Mexico\\sCity)" },

        // ================= 南美洲 (South America) =================
        { code: "AR", icon: `${FLAG_ICON_BASE}/ar.svg`, filter: "(?i)(🇦🇷|\\bAR\\b|Argentina|阿根廷|阿根廷|布宜诺斯艾利斯|布宜諾斯艾利斯|Buenos\\sAires)" },
        { code: "BR", icon: `${FLAG_ICON_BASE}/br.svg`, filter: "(?i)(🇧🇷|\\bBR\\b|Brazil|巴西|巴西|圣保罗|聖保羅|Sao\\sPaulo)" },
        { code: "CL", icon: `${FLAG_ICON_BASE}/cl.svg`, filter: "(?i)(🇨🇱|\\bCL\\b|Chile|智利|智利|圣地亚哥|聖地亞哥|Santiago)" },
        { code: "CO", icon: `${FLAG_ICON_BASE}/co.svg`, filter: "(?i)(🇨🇴|\\bCO\\b|Colombia|哥伦比亚|哥倫比亞|波哥大|波哥大|Bogota)" },

        // ================= 大洋洲 (Oceania) =================
        { code: "AU", icon: `${FLAG_ICON_BASE}/au.svg`, filter: "(?i)(🇦🇺|\\bAU\\b|Australia|澳大利亚|澳大利亞|悉尼|悉尼|Sydney)" },
        { code: "NZ", icon: `${FLAG_ICON_BASE}/nz.svg`, filter: "(?i)(🇳🇿|\\bNZ\\b|New\\sZealand|新西兰|新西蘭|奥克兰|奧克蘭|Auckland)" },

        // ================= 非洲 (Africa) =================
        { code: "ZA", icon: `${FLAG_ICON_BASE}/za.svg`, filter: "(?i)(🇿🇦|\\bZA\\b|South\\sAfrica|南非|南非|约翰内斯堡|約翰內斯堡|Johannesburg)" },
        { code: "EG", icon: `${FLAG_ICON_BASE}/eg.svg`, filter: "(?i)(🇪🇬|\\bEG\\b|Egypt|埃及|埃及|开罗|開羅|Cairo)" },
        { code: "NG", icon: `${FLAG_ICON_BASE}/ng.svg`, filter: "(?i)(🇳🇬|\\bNG\\b|Nigeria|尼日利亚|尼日利亞|拉各斯|拉各斯|Lagos)" }
    ],
    appRules: {
      "CustomProxy": [
        { key: "customproxy_domain", behavior: "domain", format: "yaml",
          url: "https://cdn.jsdelivr.net/gh/wlrsx/proxy-rules-kit@refs/heads/main/rules/CustomProxy.yaml" }
      ],
      "TikTok-Bypass": [
        { key: "tiktok_bypass", behavior: "domain", format: "mrs",
          url: "https://cdn.jsdelivr.net/gh/wlrsx/proxy-rules-kit@refs/heads/main/rules/TikTok/TikTok-Bypass.mrs" }
      ],
      "TikTok": [
        { key: "tiktok_domain", behavior: "domain", format: "mrs",
          url: "https://cdn.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/tiktok.mrs" }
      ],
      "AI": [
        { key: "ai_domain", behavior: "domain", format: "mrs",
          url: "https://cdn.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/category-ai-!cn.mrs" }
      ],
      "DeepSeek": [
        { key: "deepseek_domain", behavior: "domain", format: "mrs",
          url: "https://cdn.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/deepseek.mrs" }
      ],
       "YouTube": [
        { key: "youtube_domain", behavior: "domain", format: "mrs",
          url: "https://cdn.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/youtube.mrs" }
      ],
       "Google": [
        { key: "google_domain", behavior: "domain", format: "mrs",
          url: "https://cdn.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/google.mrs" },
        { key: "google_ipcidr", behavior: "ipcidr", format: "mrs",
          url: "https://cdn.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geoip/google.mrs", noResolve: true },
      ],
       "Microsoft": [
        { key: "microsoft_domain", behavior: "domain", format: "mrs",
          url: "https://cdn.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/microsoft.mrs" }
      ],
      "Whatsapp": [
        { key: "whatsapp_domain", behavior: "domain", format: "mrs",
          url: "https://cdn.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/whatsapp.mrs" }
      ],
      "Facebook": [
        { key: "facebook_domain", behavior: "domain", format: "mrs",
          url: "https://cdn.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/facebook.mrs" },
        { key: "facebook_ipcidr", behavior: "ipcidr", format: "mrs",
          url: "https://cdn.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geoip/facebook.mrs", noResolve: true },
      ],
      "Instagram": [
        { key: "instagram_domain", behavior: "domain", format: "mrs",
          url: "https://cdn.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/instagram.mrs" }
      ],
      "X": [
        { key: "x_domain", behavior: "domain", format: "mrs",
          url: "https://cdn.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/x.mrs" }
      ],
      "Reddit": [
        { key: "reddit_domain", behavior: "domain", format: "mrs",
          url: "https://cdn.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/reddit.mrs" }
      ],
      "Telegram": [
        { key: "telegram_domain", behavior: "domain", format: "mrs",
          url: "https://cdn.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/telegram.mrs" },
        { key: "telegram_ipcidr", behavior: "ipcidr", format: "mrs",
          url: "https://cdn.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geoip/telegram.mrs", noResolve: true },
      ],
      "Games": [
        { key: "games_domain", behavior: "domain", format: "mrs",
          url: "https://cdn.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/category-games-!cn.mrs" }
      ],
    },
};

return dict;
