/*
 * 상세 페이지: 주소의 id(service.html?id=chatgpt)로 서비스를 찾아 표시합니다.
 */
(function () {
  const root = document.getElementById("service-detail");
  const id = new URLSearchParams(location.search).get("id");
  const service = SERVICES.find((s) => s.id === id);

  /* 없는 서비스일 때 */
  if (!service) {
    document.title = "서비스를 찾을 수 없음 | AI 도구 안내서";
    root.innerHTML = `
      <div class="not-found">
        <h1>서비스를 찾을 수 없습니다</h1>
        <p>주소가 잘못되었거나 목록에서 빠진 서비스입니다.</p>
        <a class="btn btn-primary" href="index.html">전체 목록 보기</a>
      </div>`;
    return;
  }

  const cat = getCategory(service.category);

  /* 브라우저 탭 제목과 설명 */
  document.title = `${service.name} | AI 도구 안내서`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", `${service.name}: ${service.tagline}`);

  /* 소감: 빈 줄 기준으로 문단 나누기 */
  const reviewParagraphs = String(service.review || "")
    .split(/\n\s*\n/)
    .filter((p) => p.trim())
    .map((p) => `<p>${escapeHTML(p.trim()).replace(/\n/g, "<br>")}</p>`)
    .join("");

  /* 요금 설명: 비어 있으면 안내 문구, 줄바꿈(\n)은 그대로 표시 */
  const pricingDetail = service.pricing?.detail
    ? escapeHTML(service.pricing.detail).replace(/\n/g, "<br>")
    : "자세한 요금은 공식 사이트에서 확인하세요.";

  /* (선택) 검색 범위 */
  const sourceSection = service.source ? `
    <section class="detail-section" aria-labelledby="h-source">
      <h2 id="h-source">검색 범위</h2>
      <p>${escapeHTML(service.source)}</p>
    </section>` : "";

  /* (선택) 소감 작성자 */
  const authorLine = service.author
    ? `<p class="review-author">작성: ${escapeHTML(service.author)}</p>`
    : "";

  /* 같은 분야의 다른 서비스 (최대 3개) */
  const related = SERVICES
    .filter((s) => s.category === service.category && s.id !== service.id)
    .slice(0, 3);

  root.innerHTML = `
    <nav class="breadcrumb" aria-label="현재 위치">
      <a href="index.html">전체</a>
      <span aria-hidden="true">/</span>
      <a href="index.html?category=${encodeURIComponent(cat.id)}">${escapeHTML(cat.name)}</a>
    </nav>

    <header class="detail-header">
      <div class="detail-title-row">
        ${logoHTML(service, "logo-lg")}
        <div>
          <h1 class="detail-title">${escapeHTML(service.name)}</h1>
          <span class="detail-cat">${escapeHTML(cat.name)}</span>
        </div>
      </div>
      <p class="detail-tagline">${escapeHTML(service.tagline)}</p>
      <div class="detail-actions">
        <a class="btn btn-primary" href="${escapeHTML(service.url)}" target="_blank" rel="noopener noreferrer">
          사이트 방문하기${EXTERNAL_ICON}<span class="visually-hidden"> (새 탭)</span>
        </a>
      </div>
    </header>

    <section class="detail-section" aria-labelledby="h-pricing">
      <h2 id="h-pricing">비용</h2>
      <div class="pricing-row">
        ${priceBadgeHTML(service.pricing?.type)}
        <p>${pricingDetail}</p>
      </div>
      <p class="muted">정보 확인일: ${escapeHTML(formatDate(service.updatedAt))}</p>
    </section>
${sourceSection}

    <div class="pros-cons">
      <section class="pc-box pros" aria-labelledby="h-pros">
        <h2 id="h-pros">장점</h2>
        <ul class="pc-list">${listItemsHTML(service.pros)}</ul>
      </section>
      <section class="pc-box cons" aria-labelledby="h-cons">
        <h2 id="h-cons">아쉬운 점</h2>
        <ul class="pc-list">${listItemsHTML(service.cons)}</ul>
      </section>
    </div>

    <section class="detail-section" aria-labelledby="h-use">
      <h2 id="h-use">추천 용도</h2>
      <ul class="use-cases">${listItemsHTML(service.useCases)}</ul>
    </section>

    <section class="detail-section review" aria-labelledby="h-review">
      <h2 id="h-review">직접 써본 소감</h2>
      <blockquote>${reviewParagraphs || "<p>아직 소감을 작성하지 않았습니다.</p>"}</blockquote>
      ${authorLine}
    </section>

    ${related.length ? `
    <section class="related" aria-labelledby="h-related">
      <h2 id="h-related">${escapeHTML(cat.name)} 분야의 다른 서비스</h2>
      <ul class="card-grid">${related.map(cardHTML).join("")}</ul>
    </section>` : ""}
  `;
})();