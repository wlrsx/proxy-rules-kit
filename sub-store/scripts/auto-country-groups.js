// AutoCountryGroups：探测 proxies 中出现的国家，自动生成 "故障转移/自动延迟/负载均衡(散列)/负载均衡(轮询)" 四类分组

// 在 GitHub 上托管的 dictionary.js 的直链
const DICTIONARY_URL = "https://cdn.jsdelivr.net/gh/wlrsx/proxy-rules-kit@main/sub-store/scripts/dictionary.js";
// 动态拉取并解析云端字典
const dictCode = await fetch(DICTIONARY_URL).then(res => res.text());
const dict = new Function(dictCode)(); 
const countryRegions = dict.countryRegions;

let config = ProxyUtils.yaml.safeLoad($content ?? $files[0]);

const TEST_URL = "https://www.gstatic.com/generate_204";
// const TEST_URL = "http://cp.cloudflare.com/generate_204";          // Cloudflare (推荐，全球高可用)
// const TEST_URL = "http://captive.apple.com/hotspot-detect.html"; // Apple 苹果官方测速
// const TEST_URL = "http://wifi.vivo.com.cn/generate_204";         // 国内连通性测试 (Vivo)

const fallbackTemplate = { type: "fallback", url: TEST_URL, interval: 300 };
const urltestTemplate  = { type: "url-test", url: TEST_URL, interval: 300, tolerance: 50 };
const lbHashTemplate   = { type: "load-balance", strategy: "consistent-hashing", url: TEST_URL, interval: 300 };
const lbRRTemplate     = { type: "load-balance", strategy: "round-robin", url: TEST_URL, interval: 300 };

const existingGroups = Array.isArray(config["proxy-groups"]) ? config["proxy-groups"] : [];
// 预编译正则，探测存在的国家
const nodeNames = (Array.isArray(config.proxies) ? config.proxies : []).map(p => p.name || "");
const compiledCountryRegions = countryRegions.map(region => ({
    ...region,
    regex: new RegExp(region.filter, 'i'),
}));

const presentCountries = compiledCountryRegions.filter(({ regex }) => {
    return nodeNames.some(name => regex.test(name));
});

function buildGroupsForCountry({ code, filter }) {
    return [
        { name: `${code} 故障转移`, ...fallbackTemplate, filter, "include-all": true },
        { name: `${code} 自动延迟`, ...urltestTemplate, filter, "include-all": true },
        { name: `${code} 负载均衡 (散列)`, ...lbHashTemplate, filter, "include-all": true },
        { name: `${code} 负载均衡 (轮询)`, ...lbRRTemplate, filter, "include-all": true },
    ];
}

const generatedGroups = presentCountries.flatMap(buildGroupsForCountry);
const generatedNames = new Set(generatedGroups.map(g => g.name));
const untouchedGroups = existingGroups.filter(g => !generatedNames.has(g.name));

config["proxy-groups"] = [...untouchedGroups, ...generatedGroups];
$content = ProxyUtils.yaml.dump(config);
