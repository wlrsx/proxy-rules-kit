// 智能注入订阅组名称到代理组（select / url-test / fallback / load-balance）
// exclude 参数支持关键词模糊匹配：写"日本"会排除所有组名包含"日本"的组
//
// URL 参数：
//   group   - 必填，要注入的订阅组名称
//   exclude - 可选，逗号分隔的关键词列表。只要组名包含某个关键词就会被排除
//
// 调用示例：
//   全部组都注入：
//     ?$options=group%3DHKSS-VIP3
//   排除包含"TikTok"或"日本"的所有组：
//     ?$options=group%3DHKSS-VIP3%26exclude%3DTikTok,日本

const groupName = ($options && $options.group) || '';
const excludeRaw = ($options && $options.exclude) || '';

const EXCLUDE_KEYWORDS = excludeRaw
  ? excludeRaw.split(',').map((s) => s.trim()).filter(Boolean)
  : [];

let text = $content ?? ($files && $files[0]) ?? '';

if (groupName) {
  const pattern = /^([^\n=]+?)(\s*=\s*(?:select|url-test|fallback|load-balance)\s*,)/gm;

  text = text.replace(pattern, (match, name, eqType) => {
    const trimmedName = name.trim();

    // 关键词模糊匹配：只要组名包含任意一个排除关键词，就跳过
    const isExcluded = EXCLUDE_KEYWORDS.some((keyword) =>
      trimmedName.includes(keyword)
    );
    if (isExcluded) {
      return match;
    }

    // 幂等性检查：已经注入过同样的值就跳过，避免重复
    const escapedEqType = eqType.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const alreadyInjected = new RegExp(
      `${escapedEqType}\\s*${groupName}\\s*,\\s*use=true`
    );
    if (alreadyInjected.test(match)) {
      return match;
    }

    return `${name}${eqType}${groupName},use=true,`;
  });
}

$content = text;