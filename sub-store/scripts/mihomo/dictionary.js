// ============================================================================
// Script: 云端规则与图标字典 (Proxy Dictionary)
// Description: 作为公共数据源，集中管理应用图标 (appIcons)、地区映射与正则 (countryRegions)、以及分流规则集 (appRules)。
// Usage: 专供其他 Sub-Store 或配置处理脚本通过 fetch 动态拉取并解析执行。
// ============================================================================

// ---------- 图标基础路径定义 ----------
const ICON_BASE = "https://fastly.jsdelivr.net/gh/Hawaiine/Oasisic-Icons@main/icons";
const FLAG_ICON_BASE = "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags";

const dict = {
  // ==========================================
  // 1. 应用图标映射 (App Icons)
  // ==========================================
  appIcons: {
    // [即时通讯 / 社交 Social & Communication]
    "whatsapp": `${ICON_BASE}/Meta/Facebook/WhatsApp/WhatsApp.png`,
    "telegram": `${ICON_BASE}/Communication/Telegram/Telegram.png`,
    "discord": `${ICON_BASE}/Communication/Discord/Discord.png`,
    "facebook": `${ICON_BASE}/Meta/Facebook/Facebook.png`,
    "instagram": `${ICON_BASE}/Meta/Facebook/Instagram/Instagram.png`,
    "messenger": `${ICON_BASE}/Meta/Facebook/Messenger/Messenger.png`,
    "reddit": `${ICON_BASE}/Social/Reddit/Reddit.png`,
    "x": `${ICON_BASE}/SpaceXAI/X/X.png`,
    "threads": `${ICON_BASE}/Meta/Facebook/Threads/Threads.png`,
    "line": `${ICON_BASE}/Communication/LINE/LINE.png`,
    "wechat": `${ICON_BASE}/Tencent/WeChat/WeChat.png`,
    "tiktok": `${ICON_BASE}/ByteDance/TikTok/TikTok.png`,
    "slack": `${ICON_BASE}/Communication/Slack/Slack.png`,
    "signal": `${ICON_BASE}/Communication/Signal/Signal.png`,
    "snapchat": `${ICON_BASE}/Social/Snapchat/Snapchat.png`,
    "linkedin": `${ICON_BASE}/Social/LinkedIn/LinkedIn.png`,
    "pinterest": `${ICON_BASE}/Social/Pinterest/Pinterest.png`,
    "tumblr": `${ICON_BASE}/Social/Tumblr/Tumblr.png`,
    "clubhouse": `${ICON_BASE}/Social/Clubhouse/Clubhouse.png`,
    "mastodon": `${ICON_BASE}/Social/Mastodon/Mastodon.png`,
    "viber": `${ICON_BASE}/Communication/Viber/Viber.png`,
    "skype": `${ICON_BASE}/Microsoft/Skype/Skype.png`,
    "zoom": `${ICON_BASE}/Communication/Zoom/Zoom.png`,
    "teams": `${ICON_BASE}/Microsoft/Teams/Teams.png`,

    // [人工智能 AI]
    "ai": `${ICON_BASE}/AI/AI.png`,
    "chatgpt": `${ICON_BASE}/AI/OpenAI/OpenAI.png`,
    "openai": `${ICON_BASE}/AI/OpenAI/OpenAI.png`,
    "claude": `${ICON_BASE}/AI/Anthropic/Anthropic.png`,
    "anthropic": `${ICON_BASE}/AI/Anthropic/Anthropic.png`,
    "copilot": `${ICON_BASE}/Microsoft/Copilot/Copilot.png`,
    "perplexity": `${ICON_BASE}/AI/Perplexity/Perplexity.png`,
    "gemini": `${ICON_BASE}/Google/Gemini/Gemini.png`,
    "deepseek": `${ICON_BASE}/AI/DeepSeek/DeepSeek.png`,
    "manus": `${ICON_BASE}/AI/Manus/Manus.png`,
    "muse": `${ICON_BASE}/AI/Muse/Muse.png`,
    "kimi": `${ICON_BASE}/AI/Kimi/Kimi.png`,
    "grok": `${ICON_BASE}/SpaceXAI/xAI/Grok/Grok.png`,
    "midjourney": `${ICON_BASE}/AI/Midjourney/Midjourney.png`,
    "huggingface": `${ICON_BASE}/AI/HuggingFace/HuggingFace.png`,
    "civitai": `${ICON_BASE}/AI/Civitai/Civitai.png`,
    "stabilityai": `${ICON_BASE}/AI/StabilityAI/StabilityAI.png`,

    // [影音 / 流媒体 Media & Music]
    "netflix": `${ICON_BASE}/Media/Netflix/Netflix.png`,
    "disney": `${ICON_BASE}/Disney/Disney/Disney.png`,
    "hbo": `${ICON_BASE}/WarnerBrosDiscovery/HBOMax/HBOMax.png`,
    "hulu": `${ICON_BASE}/Disney/Hulu/Hulu.png`,
    "primevideo": `${ICON_BASE}/Amazon/PrimeVideo/PrimeVideo.png`,
    "prime video": `${ICON_BASE}/Amazon/PrimeVideo/PrimeVideo.png`,
    "youtube": `${ICON_BASE}/Google/YouTube/YouTube.png`,
    "youtubemusic": `${ICON_BASE}/Google/YouTube/YouTubeMusic/YouTubeMusic.png`,
    "spotify": `${ICON_BASE}/Music/Spotify/Spotify.png`,
    "tidal": `${ICON_BASE}/Music/TIDAL/TIDAL.png`,
    "apple music": `${ICON_BASE}/Apple/AppleMusic/AppleMusic.png`,
    "soundcloud": `${ICON_BASE}/Music/SoundCloud/SoundCloud.png`,
    "pandora": `${ICON_BASE}/Music/Pandora/Pandora.png`,
    "twitch": `${ICON_BASE}/Media/Twitch/Twitch.png`,
    "crunchyroll": `${ICON_BASE}/Media/Crunchyroll/Crunchyroll.png`,
    "vimeo": `${ICON_BASE}/Media/Vimeo/Vimeo.png`,

    // [Google / Microsoft / Apple]
    "google": `${ICON_BASE}/Google/Google/Google.png`,
    "gmail": `${ICON_BASE}/Google/Gmail/Gmail.png`,
    "microsoft": `${ICON_BASE}/Microsoft/Microsoft/Microsoft.png`,
    "bing": `${ICON_BASE}/Microsoft/Bing/Bing.png`,
    "onedrive": `${ICON_BASE}/Microsoft/OneDrive/OneDrive.png`,
    "apple": `${ICON_BASE}/Apple/Apple/Apple.png`,
    "icloud": `${ICON_BASE}/Apple/iCloud/iCloud.png`,
    "chrome": `${ICON_BASE}/Google/Chrome/Chrome.png`,
    "safari": `${ICON_BASE}/Apple/Safari/Safari.png`,
    "firefox": `${ICON_BASE}/Development/Firefox/Firefox.png`,
    "edge": `${ICON_BASE}/Microsoft/Edge/Edge.png`,

    // [支付 / 金融 Payment & Finance]
    "paypal": `${ICON_BASE}/Payment/PayPal/PayPal.png`,
    "wise": "https://upload.wikimedia.org/wikipedia/commons/e/e8/Wise_Logo_512x124.svg",
    "mastercard": `${ICON_BASE}/Payment/Mastercard/Mastercard.png`,
    "visa": `${ICON_BASE}/Payment/Visa/Visa.png`,
    "stripe": `${ICON_BASE}/Payment/Stripe/Stripe.png`,
    "venmo": `${ICON_BASE}/Payment/Venmo/Venmo.png`,
    "cashapp": `${ICON_BASE}/Payment/CashApp/CashApp.png`,
    "revolut": `${ICON_BASE}/Finance/Revolut/Revolut.png`,
    "robinhood": `${ICON_BASE}/Finance/Robinhood/Robinhood.png`,
    "coinbase": `${ICON_BASE}/Crypto/Coinbase/Coinbase.png`,
    "binance": `${ICON_BASE}/Crypto/Binance/Binance.png`,

    // [云盘 Cloud Storage]
    "dropbox": `${ICON_BASE}/CloudStorage/Dropbox/Dropbox.png`,
    "googledrive": `${ICON_BASE}/Google/GoogleDrive/GoogleDrive.png`,
    "box": `${ICON_BASE}/CloudStorage/Box/Box.png`,
    "mega": `${ICON_BASE}/CloudStorage/MEGA/MEGA.png`,

    // [工具 / 开发者 Utilities & Development]
    "github": `${ICON_BASE}/Microsoft/GitHub/GitHub.png`,
    "gitlab": `${ICON_BASE}/Development/GitLab/GitLab.png`,
    "docker": `${ICON_BASE}/Infrastructure/Docker/Docker.png`,
    "notion": `${ICON_BASE}/Utilities/Notion/Notion.png`,
    "cloudflare": `${ICON_BASE}/Infrastructure/Cloudflare/Cloudflare.png`,
    "1password": `${ICON_BASE}/Utilities/1Password/1Password.png`,
    "speedtest": `${ICON_BASE}/Utilities/Speedtest/Speedtest.png`,
    "figma": `${ICON_BASE}/Development/Figma/Figma.png`,
    "postman": `${ICON_BASE}/Development/Postman/Postman.png`,
    "vscode": `${ICON_BASE}/Microsoft/VSCode/VSCode.png`,
    "trello": `${ICON_BASE}/Utilities/Trello/Trello.png`,
    "asana": `${ICON_BASE}/Utilities/Asana/Asana.png`,
    "jira": `${ICON_BASE}/Utilities/Jira/Jira.png`,
    "evernote": `${ICON_BASE}/Utilities/Evernote/Evernote.png`,

    // [游戏 Game]
    "game": `${ICON_BASE}/Game/Game/Game.png`,
    "games": `${ICON_BASE}/Game/Game/Game.png`,
    "steam": `${ICON_BASE}/Game/Steam/Steam.png`,
    "xbox": `${ICON_BASE}/Game/Xbox/Xbox.png`,
    "playstation": `${ICON_BASE}/Game/Sony/PlayStation/PlayStation.png`,
    "epicgames": `${ICON_BASE}/Game/EpicGames/EpicGames.png`,
    "nintendo": `${ICON_BASE}/Game/Nintendo/Nintendo.png`,
    "ea": `${ICON_BASE}/Game/EA/EA.png`,
    "blizzard": `${ICON_BASE}/Game/Blizzard/Blizzard.png`,
    "riotgames": `${ICON_BASE}/Game/RiotGames/RiotGames.png`,
    "roblox": `${ICON_BASE}/Game/Roblox/Roblox.png`,
    "minecraft": `${ICON_BASE}/Game/Minecraft/Minecraft.png`,

    // [电商 / 出行 / 生活 Shopping & Transport]
    "amazon": `${ICON_BASE}/Amazon/Amazon/Amazon.png`,
    "ebay": `${ICON_BASE}/Shopping/eBay/eBay.png`,
    "shopify": `${ICON_BASE}/Shopping/Shopify/Shopify.png`,
    "etsy": `${ICON_BASE}/Shopping/Etsy/Etsy.png`,
    "airbnb": `${ICON_BASE}/Transport/Airbnb/Airbnb.png`,
    "uber": `${ICON_BASE}/Transport/Uber/Uber.png`,
    "lyft": `${ICON_BASE}/Transport/Lyft/Lyft.png`,
    "booking": `${ICON_BASE}/Transport/Booking/Booking.png`,
    "tripadvisor": `${ICON_BASE}/Transport/TripAdvisor/TripAdvisor.png`
  },

  // ==========================================
  // 2. 国家/地区映射与正则提取规则 (Country & Regions)
  // 过滤规则匹配顺序（严格）：国旗 | 国家代码 | 国家英文全名 | 简体中文全名 | 繁体中文命名 | 简体城市命名 | 繁体城市命名 | 城市英文全名
  // ==========================================
  countryRegions: [
    // ================= 亚洲 (Asia) =================
    { code: "HK", icon: `${FLAG_ICON_BASE}/hk.svg`, filter: "(?i)(🇭🇰|\\bHK\\b|Hong\\sKong|香港)" },
    { code: "MO", icon: `${FLAG_ICON_BASE}/mo.svg`, filter: "(?i)(🇲🇴|\\bMO\\b|Macau|Macao|澳门|澳門)" },
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

  // ==========================================
  // 3. 应用分流规则集 (Rule Providers Configuration)
  // 匹配的组名指向对应的 Meta-rules-dat 等外部规则文件
  // ==========================================
  appRules: {
    "Custom-Proxy": [
      {
        key: "customproxy_domain", behavior: "domain", format: "yaml",
        url: "https://cdn.jsdelivr.net/gh/wlrsx/proxy-rules-kit@refs/heads/main/rules/custom_proxy.yaml"
      }
    ],
    "Custom-Direct": [
      {
        key: "customproxy_domain", behavior: "domain", format: "yaml",
        url: "https://cdn.jsdelivr.net/gh/wlrsx/proxy-rules-kit@refs/heads/main/rules/custom_direct.yaml"
      }
    ],
    "TikTok-Bypass": [
      {
        key: "tiktok_bypass_domain", behavior: "domain", format: "mrs",
        url: "https://cdn.jsdelivr.net/gh/wlrsx/proxy-rules-kit@refs/heads/main/rules/tiktok/tiktok_bypass.mrs"
      }
    ],
    "TikTok": [
      {
        key: "tiktok_domain(wlrsx)", behavior: "domain", format: "mrs",
        url: "https://cdn.jsdelivr.net/gh/wlrsx/proxy-rules-kit@refs/heads/main/rules/tiktok/tiktok.mrs"
      },
      {
        key: "tiktok_domain", behavior: "domain", format: "mrs",
        url: "https://cdn.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/tiktok.mrs"
      }
    ],
    "AI": [
      {
        key: "ai_domain", behavior: "domain", format: "mrs",
        url: "https://cdn.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/category-ai-!cn.mrs"
      }
    ],
    "DeepSeek": [
      {
        key: "deepseek_domain", behavior: "domain", format: "mrs",
        url: "https://cdn.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/deepseek.mrs"
      }
    ],
    "YouTube": [
      {
        key: "youtube_domain", behavior: "domain", format: "mrs",
        url: "https://cdn.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/youtube.mrs"
      }
    ],
    "Google": [
      {
        key: "google_domain", behavior: "domain", format: "mrs",
        url: "https://cdn.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/google.mrs"
      },
      {
        key: "google_ipcidr", behavior: "ipcidr", format: "mrs",
        url: "https://cdn.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geoip/google.mrs", noResolve: true
      },
    ],
    "Microsoft": [
      {
        key: "microsoft_domain", behavior: "domain", format: "mrs",
        url: "https://cdn.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/microsoft.mrs"
      }
    ],
    "Whatsapp": [
      {
        key: "whatsapp_domain", behavior: "domain", format: "mrs",
        url: "https://cdn.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/whatsapp.mrs"
      }
    ],
    "Facebook": [
      {
        key: "facebook_domain", behavior: "domain", format: "mrs",
        url: "https://cdn.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/facebook.mrs"
      },
      {
        key: "facebook_ipcidr", behavior: "ipcidr", format: "mrs",
        url: "https://cdn.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geoip/facebook.mrs", noResolve: true
      },
    ],
    "Instagram": [
      {
        key: "instagram_domain", behavior: "domain", format: "mrs",
        url: "https://cdn.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/instagram.mrs"
      }
    ],
    "X": [
      {
        key: "x_domain", behavior: "domain", format: "mrs",
        url: "https://cdn.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/x.mrs"
      },
      {
        key: "twitter_domain", behavior: "domain", format: "mrs",
        url: "https://cdn.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/twitter.mrs"
      },
      {
        key: "twitter_ipcidr", behavior: "ipcidr", format: "mrs",
        url: "https://cdn.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geoip/twitter.mrs", noResolve: true
      },
    ],
    "Twitter": [
      {
        key: "x_domain", behavior: "domain", format: "mrs",
        url: "https://cdn.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/x.mrs"
      },
      {
        key: "twitter_domain", behavior: "domain", format: "mrs",
        url: "https://cdn.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/twitter.mrs"
      },
      {
        key: "twitter_ipcidr", behavior: "ipcidr", format: "mrs",
        url: "https://cdn.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geoip/twitter.mrs", noResolve: true
      },
    ],
    "Netflix": [
      {
        key: "netflix_domain", behavior: "domain", format: "mrs",
        url: "https://cdn.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/netflix.mrs"
      }
    ],
    "Reddit": [
      {
        key: "reddit_domain", behavior: "domain", format: "mrs",
        url: "https://cdn.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/reddit.mrs"
      }
    ],
    "Telegram": [
      {
        key: "telegram_domain", behavior: "domain", format: "mrs",
        url: "https://cdn.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/telegram.mrs"
      },
      {
        key: "telegram_ipcidr", behavior: "ipcidr", format: "mrs",
        url: "https://cdn.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geoip/telegram.mrs", noResolve: true
      },
    ],
    "Games": [
      {
        key: "games_domain", behavior: "domain", format: "mrs",
        url: "https://cdn.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/category-games-!cn.mrs"
      }
    ],
    "Ads": [
      {
        key: "ads_domain", behavior: "domain", format: "mrs",
        url: "https://cdn.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/category-ads.mrs"
      },

      // https://github.com/privacy-protection-tools/anti-AD
      {
        key: "anti_ad_domain", behavior: "domain", format: "yaml",
        url: "https://cdn.jsdelivr.net/gh/privacy-protection-tools/anti-AD@master/anti-ad-clash.yaml"
      },

      // https://github.com/loyalsoldier/v2ray-rules-dat
      {
        key: "reject_domain", behavior: "domain", format: "text",
        url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/v2ray-rules-dat@release/reject-list.txt"
      },
    ],
  },
};

return dict;
