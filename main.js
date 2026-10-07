/*
 * 메인 페이지: 분야 필터 버튼과 검색
 * 선택한 조건은 주소에 저장되어 (예: index.html?category=image&q=영상)
 * 새로고침하거나 링크를 공유해도 그대로 유지됩니다.
 */
(function () {
  const state = { category: "all", q: "" };

  const els = {
    hero: document.getElementById("hero"),
    tabs: document.getElementById("category-tabs"),
    search: document.getElementById("search-input"),
    list: document.getElementById("service-list"),
    count: document.getElementById("result-count"),
    empty: document.getElementById("empty-state"),
    reset: document.getElementById("reset-filters"),
    total: document.getElementById("total-count")
  };

  /* 주소의 조건 읽기 (잘못된 값은 무시) */
  function readURL() {
    const p = new URLSearchParams(location.search);
    const category = p.get("category");
    if (category && CATEGORIES.some((c) => c.id === category)) state.category = category;
    state.q = p.get("q") || "";
  }

  /* 현재 조건을 주소에 쓰기 (뒤로가기 기록은 남기지 않음) */
  function writeURL() {
    const p = new URLSearchParams();
    if (state.category !== "all") p.set("category", state.category);
    if (state.q.trim()) p.set("q", state.q.trim());
    const query = p.toString();
    history.replaceState(null, "", query ? `?${query}` : location.pathname);
  }

  /* 검색어가 이름, 소개, 추천 용도, 분야 이름 중 하나에 들어 있는지 */
  function matchesQuery(service, q) {
    if (!q) return true;
    const haystack = [
      service.name,
      service.tagline,
      getCategory(service.category).name,
      ...(service.useCases || [])
    ].join(" ").toLowerCase();
    return haystack.includes(q);
  }

  function getFiltered() {
    const q = state.q.trim().toLowerCase();
    /* services.js에 적힌 순서 그대로 표시 */
    return SERVICES.filter((s) =>
      (state.category === "all" || s.category === state.category) &&
      matchesQuery(s, q)
    );
  }

  /* 분야 필터 버튼 만들기 (각 분야의 서비스 개수 표시) */
  function renderTabs() {
    const tabs = [{ id: "all", name: "전체" }, ...CATEGORIES];
    els.tabs.innerHTML = tabs.map((tab) => {
      const count = tab.id === "all"
        ? SERVICES.length
        : SERVICES.filter((s) => s.category === tab.id).length;
      return `<button type="button" class="chip" data-category="${escapeHTML(tab.id)}" aria-pressed="false">
        ${escapeHTML(tab.name)}<span class="chip-count">${count}</span>
      </button>`;
    }).join("");
  }

  /* 분야 제목 + 카드 묶음 */
  function groupHTML(id, name, items) {
    return `
      <section class="group" aria-labelledby="g-${escapeHTML(id)}">
        <div class="group-head">
          <h2 class="group-title" id="g-${escapeHTML(id)}">${escapeHTML(name)}</h2>
          <span class="group-count">${items.length}</span>
        </div>
        <ul class="card-grid">${items.map(cardHTML).join("")}</ul>
      </section>`;
  }

  /*
   * 카드 목록 그리기
   * "전체"이고 검색어가 없으면 분야별로 제목을 붙여 묶어서 보여주고,
   * 분야를 고르거나 검색하면 결과만 바로 보여줍니다.
   */
  function renderList(items) {
    if (!items.length) {
      els.list.innerHTML = "";
      return;
    }
    if (state.category === "all" && !state.q.trim()) {
      const groups = CATEGORIES
        .map((cat) => {
          const group = items.filter((s) => s.category === cat.id);
          return group.length ? groupHTML(cat.id, cat.name, group) : "";
        })
        .join("");
      /* 분야가 잘못 적힌 서비스도 사라지지 않게 "기타"로 */
      const others = items.filter((s) => !CATEGORIES.some((c) => c.id === s.category));
      els.list.innerHTML = groups + (others.length ? groupHTML("etc", "기타", others) : "");
    } else {
      els.list.innerHTML = `<ul class="card-grid">${items.map(cardHTML).join("")}</ul>`;
    }
  }

  /* 상태가 바뀔 때마다 화면 다시 그리기 */
  function update() {
    const items = getFiltered();

    renderList(items);
    els.empty.hidden = items.length > 0;
    els.count.textContent = state.category === "all" && !state.q.trim()
      ? `${CATEGORIES.length}개 분야, ${items.length}개 서비스`
      : `${items.length}개 서비스`;

    els.tabs.querySelectorAll(".chip").forEach((btn) => {
      btn.setAttribute("aria-pressed", String(btn.dataset.category === state.category));
    });
    if (els.search.value !== state.q) els.search.value = state.q;

    writeURL();
  }

  /* 아래로 스크롤한 상태에서 분야를 바꾸면 목록 맨 위로 올려줌 */
  function scrollToResults() {
    const top = els.hero.offsetTop + els.hero.offsetHeight;
    if (window.scrollY > top) window.scrollTo({ top: top });
  }

  /* 이벤트 연결 */
  els.tabs.addEventListener("click", (e) => {
    const btn = e.target.closest(".chip");
    if (!btn) return;
    state.category = btn.dataset.category;
    update();
    scrollToResults();
  });

  els.search.addEventListener("input", () => {
    state.q = els.search.value;
    update();
  });

  /* 검색창에서 엔터를 눌러도 페이지가 새로고침되지 않게 */
  els.search.closest("form").addEventListener("submit", (e) => e.preventDefault());

  els.reset.addEventListener("click", () => {
    state.category = "all";
    state.q = "";
    update();
    els.search.focus();
  });

  /*
   * 히어로 장식: 제목 주변에 떠 있는 로고 6개
   * 아래 id를 바꾸면 다른 서비스 로고가 떠 있게 됩니다.
   */
  const FLOATING_IDS = ["perplexity", "figma", "gamma", "midjourney", "notebooklm", "deepl"];

  function renderFloatingLogos() {
    const box = document.getElementById("floating-logos");
    if (!box) return;
    box.innerHTML = FLOATING_IDS
      .map((id) => SERVICES.find((s) => s.id === id))
      .filter(Boolean)
      .map((s) => `
        <span class="float-tile">
          <span class="logo-initial">${escapeHTML(s.name.charAt(0))}</span>
          <img src="${escapeHTML(logoURL(s))}" alt="" onerror="this.remove()">
        </span>`)
      .join("");
  }

  /* 시작 */
  renderFloatingLogos();
  els.total.textContent = SERVICES.length;
  renderTabs();
  readURL();
  update();
})();