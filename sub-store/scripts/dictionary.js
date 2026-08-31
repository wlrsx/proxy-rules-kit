const FLAG_ICON_BASE = "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags";

const dict = {
    // 过滤规则严格排序：
    // 国旗 | 国家代码 | 国家英文全名 | 简体中文全名 | 繁体中文命名 | 简体城市命名 | 繁体城市命名 | 城市英文全名
    countryRegions: [
        // ================= 亚洲 (Asia) =================
        { code: "HK", icon: `${FLAG_ICON_BASE}/hk.svg`, filter: "🇭🇰|\\bHK\\b|Hong\\sKong|香港|香港|九龙|九龍|Kowloon" },
        { code: "TW", icon: `${FLAG_ICON_BASE}/tw.svg`, filter: "🇹🇼|\\bTW\\b|Taiwan|台湾|台灣|台北|臺北|Taipei" },
        { code: "SG", icon: `${FLAG_ICON_BASE}/sg.svg`, filter: "🇸🇬|\\bSG\\b|Singapore|新加坡|新加坡|狮城|獅城|Lion\\sCity" },
        { code: "JP", icon: `${FLAG_ICON_BASE}/jp.svg`, filter: "🇯🇵|\\bJP\\b|Japan|日本|日本|东京|東京|Tokyo" },
        { code: "KR", icon: `${FLAG_ICON_BASE}/kr.svg`, filter: "🇰🇷|\\bKR\\b|Korea|韩国|韓國|首尔|首爾|Seoul" },
        { code: "MY", icon: `${FLAG_ICON_BASE}/my.svg`, filter: "🇲🇾|\\bMY\\b|Malaysia|马来西亚|馬來西亞|吉隆坡|吉隆坡|Kuala\\sLumpur" },
        { code: "TH", icon: `${FLAG_ICON_BASE}/th.svg`, filter: "🇹🇭|\\bTH\\b|Thailand|泰国|泰國|曼谷|曼谷|Bangkok" },
        { code: "VN", icon: `${FLAG_ICON_BASE}/vn.svg`, filter: "🇻🇳|\\bVN\\b|Vietnam|越南|越南|胡志明|胡志明|Ho\\sChi\\sMinh" },
        { code: "PH", icon: `${FLAG_ICON_BASE}/ph.svg`, filter: "🇵🇭|\\bPH\\b|Philippines|菲律宾|菲律賓|马尼拉|馬尼拉|Manila" },
        { code: "ID", icon: `${FLAG_ICON_BASE}/id.svg`, filter: "🇮🇩|\\bID\\b|Indonesia|印度尼西亚|印度尼西亞|雅加达|雅加達|Jakarta" },
        { code: "IN", icon: `${FLAG_ICON_BASE}/in.svg`, filter: "🇮🇳|\\bIN\\b|India|印度|印度|孟买|孟買|Mumbai" },
        { code: "AE", icon: `${FLAG_ICON_BASE}/ae.svg`, filter: "🇦🇪|\\bAE\\b|United\\sArab\\sEmirates|阿联酋|阿聯酋|迪拜|迪拜|Dubai" },
        { code: "IL", icon: `${FLAG_ICON_BASE}/il.svg`, filter: "🇮🇱|\\bIL\\b|Israel|以色列|以色列|特拉维夫|特拉維夫|Tel\\sAviv" },
        { code: "TR", icon: `${FLAG_ICON_BASE}/tr.svg`, filter: "🇹🇷|\\bTR\\b|Turkey|土耳其|土耳其|伊斯坦布尔|伊斯坦布爾|Istanbul" },

        // ================= 欧洲 (Europe) =================
        { code: "UK", icon: `${FLAG_ICON_BASE}/gb.svg`, filter: "🇬🇧|\\bUK\\b|United\\sKingdom|英国|英國|伦敦|倫敦|London" },
        { code: "DE", icon: `${FLAG_ICON_BASE}/de.svg`, filter: "🇩🇪|\\bDE\\b|Germany|德国|德國|法兰克福|法蘭克福|Frankfurt" },
        { code: "FR", icon: `${FLAG_ICON_BASE}/fr.svg`, filter: "🇫🇷|\\bFR\\b|France|法国|法國|巴黎|巴黎|Paris" },
        { code: "NL", icon: `${FLAG_ICON_BASE}/nl.svg`, filter: "🇳🇱|\\bNL\\b|Netherlands|荷兰|荷蘭|阿姆斯特丹|阿姆斯特丹|Amsterdam" },
        { code: "RU", icon: `${FLAG_ICON_BASE}/ru.svg`, filter: "🇷🇺|\\bRU\\b|Russia|俄罗斯|俄羅斯|莫斯科|莫斯科|Moscow" },
        { code: "IT", icon: `${FLAG_ICON_BASE}/it.svg`, filter: "🇮🇹|\\bIT\\b|Italy|意大利|意大利|米兰|米蘭|Milan" },
        { code: "ES", icon: `${FLAG_ICON_BASE}/es.svg`, filter: "🇪🇸|\\bES\\b|Spain|西班牙|西班牙|马德里|馬德里|Madrid" },
        { code: "CH", icon: `${FLAG_ICON_BASE}/ch.svg`, filter: "🇨🇭|\\bCH\\b|Switzerland|瑞士|瑞士|苏黎世|蘇黎世|Zurich" },
        { code: "SE", icon: `${FLAG_ICON_BASE}/se.svg`, filter: "🇸🇪|\\bSE\\b|Sweden|瑞典|瑞典|斯德哥尔摩|斯德哥爾摩|Stockholm" },
        { code: "PL", icon: `${FLAG_ICON_BASE}/pl.svg`, filter: "🇵🇱|\\bPL\\b|Poland|波兰|波蘭|华沙|華沙|Warsaw" },

        // ================= 北美洲 (North America) =================
        { code: "US", icon: `${FLAG_ICON_BASE}/us.svg`, filter: "🇺🇸|\\bUS(A)?\\b|United\\sStates|美国|美國|洛杉矶|洛杉磯|Los\\sAngeles" },
        { code: "CA", icon: `${FLAG_ICON_BASE}/ca.svg`, filter: "🇨🇦|\\bCA\\b|Canada|加拿大|加拿大|多伦多|多倫多|Toronto" },
        { code: "MX", icon: `${FLAG_ICON_BASE}/mx.svg`, filter: "🇲🇽|\\bMX\\b|Mexico|墨西哥|墨西哥|墨西哥城|墨西哥城|Mexico\\sCity" },

        // ================= 南美洲 (South America) =================
        { code: "AR", icon: `${FLAG_ICON_BASE}/ar.svg`, filter: "🇦🇷|\\bAR\\b|Argentina|阿根廷|阿根廷|布宜诺斯艾利斯|布宜諾斯艾利斯|Buenos\\sAires" },
        { code: "BR", icon: `${FLAG_ICON_BASE}/br.svg`, filter: "🇧🇷|\\bBR\\b|Brazil|巴西|巴西|圣保罗|聖保羅|Sao\\sPaulo" },
        { code: "CL", icon: `${FLAG_ICON_BASE}/cl.svg`, filter: "🇨🇱|\\bCL\\b|Chile|智利|智利|圣地亚哥|聖地亞哥|Santiago" },
        { code: "CO", icon: `${FLAG_ICON_BASE}/co.svg`, filter: "🇨🇴|\\bCO\\b|Colombia|哥伦比亚|哥倫比亞|波哥大|波哥大|Bogota" },

        // ================= 大洋洲 (Oceania) =================
        { code: "AU", icon: `${FLAG_ICON_BASE}/au.svg`, filter: "🇦🇺|\\bAU\\b|Australia|澳大利亚|澳大利亞|悉尼|悉尼|Sydney" },
        { code: "NZ", icon: `${FLAG_ICON_BASE}/nz.svg`, filter: "🇳🇿|\\bNZ\\b|New\\sZealand|新西兰|新西蘭|奥克兰|奧克蘭|Auckland" },

        // ================= 非洲 (Africa) =================
        { code: "ZA", icon: `${FLAG_ICON_BASE}/za.svg`, filter: "🇿🇦|\\bZA\\b|South\\sAfrica|南非|南非|约翰内斯堡|約翰內斯堡|Johannesburg" },
        { code: "EG", icon: `${FLAG_ICON_BASE}/eg.svg`, filter: "🇪🇬|\\bEG\\b|Egypt|埃及|埃及|开罗|開羅|Cairo" },
        { code: "NG", icon: `${FLAG_ICON_BASE}/ng.svg`, filter: "🇳🇬|\\bNG\\b|Nigeria|尼日利亚|尼日利亞|拉各斯|拉各斯|Lagos" }
    ]
};

return dict;
