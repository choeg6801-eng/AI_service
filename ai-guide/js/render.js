/*
 * 여러 페이지에서 함께 쓰는 함수 모음
 * (services.js 다음, main.js/service.js 앞에 불러와야 합니다)
 */

/* 데이터 속 글자가 HTML로 해석되지 않도록 바꿔줍니다 */
function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, (ch) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[ch]);
}

/* 분야 id로 분야 정보 찾기 */
function getCategory(id) {
  return CATEGORIES.find((c) => c.id === id) || { id: id, name: "기타" };
}

/* 비용 유형을 한글 이름으로 */
function pricingLabel(type) {
  return PRICING_TYPES[type] || "정보 없음";
}

/* "2026-10-07" → "2026년 10월 7일" */
function formatDate(iso) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${y}년 ${Number(m)}월 ${Number(d)}일`;
}

/* "https://www.example.com/path" → "example.com" */
function displayDomain(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch (e) {
    return url;
  }
}

/*
 * 로고 이미지 주소
 * services.js에 logo가 있으면 그 파일을 쓰고,
 * 없으면 서비스 사이트의 아이콘(파비콘)을 자동으로 불러옵니다.
 */
function logoURL(service) {
  if (service.logo) return service.logo;
  try {
    const host = new URL(service.url).hostname;
    return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(host)}&sz=128`;
  } catch (e) {
    return "";
  }
}

/* 로고: 이미지를 못 불러오면 자동으로 이름 첫 글자가 보입니다 */
function logoHTML(service, extraClass = "") {
  const src = logoURL(service);
  const img = src
    ? `<img class="logo-img" src="${escapeHTML(src)}" alt="" loading="lazy" onerror="this.remove()">`
    : "";
  return `<span class="logo ${extraClass}" aria-hidden="true">
      <span class="logo-initial">${escapeHTML(service.name.charAt(0))}</span>${img}
    </span>`;
}

/* 비용 배지 */
function priceBadgeHTML(type) {
  const safeType = PRICING_TYPES[type] ? type : "unknown";
  return `<span class="price price-${safeType}">${escapeHTML(pricingLabel(type))}</span>`;
}

/* 바깥으로 나가는 링크 아이콘 */
const EXTERNAL_ICON = `<svg class="icon-external" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 4h6v6"/><path d="M20 4 10 14"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>`;

/*
 * 목록용 카드 하나
 * 카드 전체를 누르면 서비스 사이트가 새 탭으로 열리고,
 * 아래쪽 "자세히 보기"를 누르면 이 사이트의 상세 페이지로 이동합니다.
 */
function cardHTML(service) {
  const cat = getCategory(service.category);
  return `
    <li class="card">
      <div class="card-head">
        ${logoHTML(service)}
        <div class="card-title-wrap">
          <h3 class="card-title">
            <a class="card-link" href="${escapeHTML(service.url)}" target="_blank" rel="noopener noreferrer">
              ${escapeHTML(service.name)}<span class="visually-hidden"> 사이트 열기 (새 탭)</span>
            </a>
          </h3>
          <span class="card-cat">${escapeHTML(cat.name)}</span>
        </div>
        ${priceBadgeHTML(service.pricing?.type)}
      </div>
      <p class="card-tagline">${escapeHTML(service.tagline)}</p>
      <div class="card-foot">
        <span class="card-domain">${escapeHTML(displayDomain(service.url))}${EXTERNAL_ICON}</span>
        <a class="card-detail" href="service.html?id=${encodeURIComponent(service.id)}">자세히 보기</a>
      </div>
    </li>`;
}

/* 문자열 배열 → <li> 목록 */
function listItemsHTML(items) {
  return (items || []).map((item) => `<li>${escapeHTML(item)}</li>`).join("");
}