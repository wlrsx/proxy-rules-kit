// ============================================================================
// Script: 策略组图标智能补全 (Auto Icon Injector)
// Description: 动态拉取云端图标字典，通过正则匹配组名，为没有 icon 属性的策略组自动注入对应的应用 (App) 或地区 (Region) 图标。
// ============================================================================

const DICTIONARY_URL = "https://cdn.jsdelivr.net/gh/wlrsx/proxy-rules-kit@main/sub-store/scripts/dictionary.js";

// 动态拉取并解析云端字典
const dictCode = await fetch(DICTIONARY_URL).then(res => res.text());
const dict = new Function(dictCode)();

// 1. 将 YAML 字符串解析为 JS 对象
let config = ProxyUtils.yaml.safeLoad($content ?? $files[0]);

// ================= 预编译区 =================
const compiledAppIcons = Object.entries(dict.appIcons).map(([key, url]) => {
    const isPlainAsciiWord = /^[a-z0-9]+$/i.test(key);
    const pattern = isPlainAsciiWord ? `\\b${key}\\b` : key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return { regex: new RegExp(pattern, 'i'), url };
});

const compiledCountryRegions = dict.countryRegions.map(region => ({
    icon: region.icon,
    regex: new RegExp(region.filter.replace(/^\(\?i\)/, ''), 'i'),
}));

function getIconForGroup(groupName) {
    if (!groupName) return null;
    
    // 1. 优先匹配业务应用
    for (const { regex, url } of compiledAppIcons) {
        if (regex.test(groupName)) return url;
    }
    
    // 2. 匹配国家地区
    for (const { regex, icon } of compiledCountryRegions) {
        if (regex.test(groupName)) return icon;
    }
    return null;
}

if (config && Array.isArray(config['proxy-groups'])) {
    config['proxy-groups'].forEach(group => {
        // 如果该组还没有图标，则去匹配填充
        if (!group.icon) {
            const matchedIconUrl = getIconForGroup(group.name);
            if (matchedIconUrl) {
                group.icon = matchedIconUrl;
            }
        }
    });
}

$content = ProxyUtils.yaml.dump(config);
