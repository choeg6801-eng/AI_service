/*
 * 사이트에 표시되는 모든 데이터는 이 파일에서 관리합니다.
 * 서비스를 추가하려면 SERVICES 배열에 객체 하나를 복사해 붙여넣고 내용을 바꾸면 됩니다.
 */

/* 분야 목록: id는 영문, name은 화면에 표시될 이름 (이 순서대로 버튼이 생김) */
const CATEGORIES = [
  { id: "research", name: "리서치·검색" },
  { id: "agent",    name: "범용 AI 에이전트" },
  { id: "coding",   name: "바이브 코딩" },
  { id: "uiux",     name: "웹·UI/UX 디자인" },
  { id: "image",    name: "이미지 생성·편집" },
  { id: "ppt",      name: "시각화·PPT" },
  { id: "notes",    name: "회의록·기록" },
  { id: "voice",    name: "음성·번역" }
];

/* 비용 유형: 카드 배지에 표시 */
const PRICING_TYPES = {
  free: "무료",
  freemium: "무료+유료",
  paid: "유료"
};

/*
 * 서비스 항목 형식
 * id        : 영문 소문자와 하이픈만 사용 (상세 페이지 주소가 됨: service.html?id=perplexity)
 * name      : 서비스 이름
 * category  : 위 CATEGORIES의 id 중 하나
 * tagline   : 한 줄 소개
 * url       : 공식 사이트 주소 (카드를 누르면 새 탭으로 열림)
 * pricing   : { type: "free" | "freemium" | "paid", detail: "요금 설명 (\n으로 줄바꿈)" }
 * pros      : 장점 (여러 개)
 * cons      : 아쉬운 점 (여러 개)
 * useCases  : 추천 용도 (여러 개)
 * review    : 직접 써본 소감. 비워두면 "아직 소감을 작성하지 않았습니다"로 표시
 * updatedAt : 정보를 마지막으로 확인한 날짜 (YYYY-MM-DD)
 * source    : (선택) 검색 범위. 리서치 서비스에 사용
 * author    : (선택) 소감 작성자
 * logo      : (선택) "assets/logos/파일명.png". 없으면 첫 글자로 표시
 */
const SERVICES = [
  /* ===== 리서치·검색 ===== */
  {
    id: "perplexity",
    name: "Perplexity",
    category: "research",
    tagline: "궁금한 것을 바로 묻고, 출처 링크와 함께 빠르게 답을 얻는 AI 검색",
    url: "https://www.perplexity.ai/",
    pricing: { type: "freemium", detail: "" },
    source: "웹 전체 (뉴스, 블로그, 공식 사이트)",
    pros: ["답마다 출처 링크가 붙어 바로 검증할 수 있음"],
    cons: ["무료는 고급 검색 횟수 제한"],
    useCases: ["뉴스 조사", "팩트 체크"],
    review: "사실 체크를 위한 자료 검색에 특화됨",
    updatedAt: "2026-10-07"
  },
  {
    id: "notebooklm",
    name: "NotebookLM",
    category: "research",
    tagline: "내가 모은 자료 안에서만 답해 주는 나만의 자료 비서",
    url: "https://notebooklm.google.com/",
    pricing: { type: "freemium", detail: "" },
    source: "사용자가 올린 자료 (웹에서 찾은 자료를 추가할 수도 있음)",
    pros: ["올린 자료 안에서만 답해서 엉뚱한 답이 적음", "음성 요약 기능"],
    cons: ["웹 검색이 아니라 자료를 먼저 넣어야 함"],
    useCases: ["강의자료·논문 요약", "시험 공부"],
    review: "내가 넣은 자료 안에서만 답하고 어느 부분에서 나온 답인지 표시해 줘서, 자료에 없는 내용을 지어낼 가능성이 낮음",
    updatedAt: "2026-10-07"
  },
  {
    id: "liner",
    name: "Liner",
    category: "research",
    tagline: "웹과 논문을 함께 찾고, 논문의 어느 문단이 근거인지까지 보여 주는 학술 검색",
    url: "https://app.liner.com/ko",
    pricing: { type: "freemium", detail: "" },
    source: "웹 + 학술 논문 (Scholar 모드)",
    pros: ["한국어 화면", "학술 자료 중심"],
    cons: ["무료 기능 범위가 좁은 편"],
    useCases: ["레포트 참고문헌 찾기"],
    review: "문단 단위로 출처를 달아줘서 자료 찾기가 쉽고, 초안 작성도 사이트 내에서 가능하다.",
    updatedAt: "2026-10-07"
  },
  {
    id: "gemini-deep-research",
    name: "Gemini Deep Research",
    category: "research",
    tagline: "주제 하나로 웹을 조사해 보고서 작성",
    url: "https://gemini.google.com/",
    pricing: { type: "freemium", detail: "" },
    source: "웹 전체를 넓고 깊게 (허용하면 내 Gmail·Drive까지)",
    pros: [
      "조사 계획을 확인·수정한 뒤 수많은 웹페이지를 읽고 보고서로 정리함",
      "Google Docs로 바로 내보낼 수 있음"
    ],
    cons: ["시간이 몇 분 걸림", "분량이 길어 다시 읽어야 함"],
    useCases: ["과제 초반 자료 조사"],
    review: "",
    updatedAt: "2026-10-07"
  },
  {
    id: "consensus",
    name: "Consensus",
    category: "research",
    tagline: "연구 논문들이 어떤 주장에 얼마나 동의하는지 한눈에 보여 주는 AI",
    url: "https://consensus.app",
    pricing: { type: "freemium", detail: "" },
    source: "학술 논문만",
    pros: [
      "연구로 검증된 근거만 사용",
      "예/아니오로 답할 수 있는 질문에 대해 \"연구 몇 %가 그렇다고 한다\"처럼 연구들의 합의 정도를 보여 줌"
    ],
    cons: [
      "예/아니오 질문에서만 합의 정도를 보여 주고, \"~의 원인은?\"처럼 열린 질문에는 이 장점이 줄어듦",
      "영어 논문 중심"
    ],
    useCases: ["어떤 주장이 과학적으로 맞는지 빠르게 확인"],
    review: "",
    updatedAt: "2026-10-07"
  },
  {
    id: "elicit",
    name: "Elicit",
    category: "research",
    tagline: "여러 논문의 연구 방법과 결과를 표로 뽑아 비교해 주는 AI",
    url: "https://elicit.com",
    pricing: { type: "freemium", detail: "" },
    source: "학술 논문만",
    pros: ["여러 논문에서 연구 방법, 대상 수, 결과 같은 항목을 뽑아 표로 정리"],
    cons: ["표로 정리하는 기능은 비교할 항목을 사용자가 정해야 해서 연구 주제를 어느 정도 알아야 잘 쓸 수 있음"],
    useCases: ["레포트나 논문 쓸 때 선행연구 비교·정리"],
    review: "",
    updatedAt: "2026-10-07"
  },

  /* ===== 범용 AI 에이전트 ===== */
  {
    id: "manus",
    name: "Manus",
    category: "agent",
    tagline: "자료 조사를 다양한 곳에서 하고 싶고 PPT의 대략적인 흐름만 파악하고 싶을 때 사용하면 좋은 AI",
    url: "https://manus.im/",
    pricing: {
      type: "freemium",
      detail: "무료: 매일 300 크레딧 (작업 2개 정도 요청하면 소진되는 양)\n" +
        "Manus Pro (월 4,000 크레딧): 3개월 동안 월 10달러, 이후 월 20달러\n" +
        "Manus Pro (월 8,000 크레딧): 3개월 동안 월 30달러, 이후 월 40달러\n" +
        "Manus Pro (월 40,000 크레딧): 3개월 동안 월 190달러, 이후 월 200달러"
    },
    pros: ["출처를 제대로 표기", "다양한 곳에서 데이터 수집"],
    cons: [
      "[자료 수집] 상당히 시간이 오래 걸림",
      "[자료 수집] 출처가 불명확하거나 신뢰도가 떨어지는 데이터를 수집할 때가 있음",
      "[자료 수집] 다양하지 않은 세그먼트 제공",
      "[PPT 제작] 내용이 빈약함",
      "[PPT 제작] 디자인이 별로 좋지 않음"
    ],
    useCases: ["다양한 곳에서 자료 조사하기를 원할 때"],
    review: "제공해주는 자료가 정리가 잘 안 되어 있는 느낌이 들어서 이 자료는 참고 자료로만 써야 될 것 같은 생각이 듦",
    updatedAt: "2026-10-07"
  },
  {
    id: "genspark",
    name: "Genspark",
    category: "agent",
    tagline: "대시보드를 간단하게 만들어 보고 싶을 때 추천",
    url: "https://www.genspark.ai/",
    pricing: {
      type: "freemium",
      detail: "무료: 매일 100 크레딧\n" +
        "1단계 구독 (월 10,000 크레딧): 월 24.99달러\n" +
        "2단계 구독 (월 21,000 크레딧): 월 49.99달러\n" +
        "3단계 구독 (월 125,000 크레딧): 월 249.99달러"
    },
    pros: [
      "용도에 맞는 대시보드 템플릿을 다양하게 제공",
      "만들어지는 과정을 단계별로 세세하게 보여 줌",
      "대시보드를 단계에 맞게 체계적으로 완성"
    ],
    cons: [
      "시스템상에서 몇몇 부분들이 영어로 표기되어 있음",
      "시간이 좀 오래 걸림",
      "템플릿 디자인들이 그다지 좋아 보이진 않음",
      "사용자에게 입력받을 정보들을 한 번에 요청하지 않고 단계별로 하나씩 요청함"
    ],
    useCases: ["대시보드 제작 과정을 단계별로 확인하며 빠르게 시각화·초안을 만들고 싶을 때"],
    review: "실제로 대시보드가 만들어지는 과정 하나하나를 확인해볼 수 있어서 좋았는데, 주어지는 템플릿 디자인이 별로 마음에 들진 않아서 아쉬웠음",
    updatedAt: "2026-10-07"
  },

  /* ===== 바이브 코딩 ===== */
  {
    id: "cursor",
    name: "Cursor",
    category: "coding",
    tagline: "클로드보다는 구현이 잘 안 되는 것 같아서, 간단한 코딩을 빠르게 보고 싶을 때 추천",
    url: "https://cursor.com/agents",
    pricing: {
      type: "freemium",
      detail: "무료 플랜 있음\nPro: 월 20달러\nPro+: 월 60달러\nUltra: 월 200달러"
    },
    pros: [
      "사용자 작업에 맞는 프롬프트·수정 방향 제안",
      "웹 기반 AI 툴 대비 빠른 코드 반영 및 실행 속도"
    ],
    cons: [
      "따로 다운로드를 해야 함",
      "처음에 프로그램을 깔고 실행시키기까지 시간이 오래 걸림",
      "사용하는 게 약간 복잡함"
    ],
    useCases: ["바이브 코딩"],
    review: "클로드보다 실행 자체는 빨리 되는데 그만큼 퀄리티가 좋지는 않은 것 같다고 느꼈음",
    updatedAt: "2026-10-07"
  },
  {
    id: "windsurf",
    name: "Windsurf",
    category: "coding",
    tagline: "AI가 알아서 파일과 터미널을 오가며 코딩해줘서, 손을 최소한으로 쓰며 바이브 코딩하고 싶을 때 추천",
    url: "https://windsurf.com/",
    pricing: {
      type: "freemium",
      detail: "무료 플랜 있음\nPro: 월 20달러\nTeams: 월 80달러\nMax: 월 200달러"
    },
    pros: [
      "여러 파일을 스스로 탐색하고 터미널 명령어까지 알아서 실행해 줌",
      "Cursor 대비 전체 코드 맥락 파악 및 연계 수정 능력이 뛰어남"
    ],
    cons: [
      "Cursor와 마찬가지로 프로그램을 따로 설치(다운로드)해야 함",
      "프로젝트 규모가 커지면 인덱싱 시간이 다소 걸림",
      "가끔 의도하지 않은 다른 파일 코드까지 건드리거나 에러 루프에 빠질 때가 있음"
    ],
    useCases: ["바이브 코딩", "다중 파일(풀스택) 웹·앱 개발", "터미널 작업 자동화"],
    review: "파일 하나하나 지정 안 해줘도 알아서 필요한 코드를 찾아 수정해주니까 손이 훨씬 덜 가고 편했음. 다만 가끔 엉뚱한 파일을 수정해둘 때가 있어서 중간중간 확인은 꼭 필요하다고 느꼈음",
    updatedAt: "2026-10-07"
  },

  /* ===== 웹·UI/UX 디자인 ===== */
  {
    id: "google-stitch",
    name: "Google Stitch",
    category: "uiux",
    tagline: "말로 설명하면 화면 시안을 여러 개 뽑아 비교하게 해 주는 무료 AI",
    url: "https://stitch.withgoogle.com",
    pricing: { type: "free", detail: "" },
    pros: ["무료이고, 시안을 여러 개 받아 비교할 수 있음", "Figma로 내보내기 가능"],
    cons: ["실험 단계라 기능이 자주 바뀌고, 세밀한 수정은 어려움"],
    useCases: ["디자인 방향을 정하기 전 아이디어 얻기"],
    review: "",
    updatedAt: "2026-10-07"
  },
  {
    id: "claude-design",
    name: "클로드 디자인",
    category: "uiux",
    tagline: "대화하면서 프로토타입과 발표 슬라이드를 만드는 AI",
    url: "https://claude.ai/design",
    pricing: { type: "paid", detail: "" },
    pros: ["대화로 수정하며 프로토타입과 슬라이드를 함께 만들 수 있음"],
    cons: ["2026년 4월에 나온 서비스라 참고 자료가 적고, 무료 사용 범위 확인 필요"],
    useCases: ["아이디어를 클릭되는 시제품으로 보여 줄 때"],
    review: "Claude에 Figma를 연결한 느낌. 바이브 코딩은 디자인이 원하는 대로 바뀌지 않아 여러 번 다시 지시해야 했는데, Claude Design은 글씨 크기와 위치 같은 요소 값을 직접 조절할 수 있어 원하는 모양을 바로 만들 수 있음. 반복 지시가 줄어 토큰 절약에도 도움이 될 것 같음.",
    updatedAt: "2026-10-07"
  },
  {
    id: "v0",
    name: "v0",
    category: "uiux",
    tagline: "말로 설명한 화면을 실제로 작동하는 코드로 만들어 주는 AI",
    url: "https://v0.dev",
    pricing: { type: "freemium", detail: "" },
    pros: ["미리보기 화면과 코드가 함께 나와 바로 개발에 쓸 수 있음"],
    cons: ["React 기반 코드가 기본이라 HTML 과제에는 따로 요청해야 함"],
    useCases: ["디자인을 실제 웹페이지로 옮길 때"],
    review: "",
    updatedAt: "2026-10-07"
  },
  {
    id: "figma",
    name: "Figma",
    category: "uiux",
    tagline: "AI로 만든 화면을 세밀하게 직접 다듬는 업계 표준 디자인 툴",
    url: "https://figma.com",
    pricing: { type: "freemium", detail: "" },
    pros: ["원하는 대로 세밀하게 수정 가능", "팀원과 동시 작업"],
    cons: ["기능이 많아 처음에 익히는 데 시간이 걸림"],
    useCases: ["시안을 완성도 있게 다듬을 때"],
    review: "PPT와 Adobe Illustrator에 AI가 합쳐진 느낌. 요소 하나하나를 세밀하게 조정할 수 있어 웹 디자이너가 화면을 완성도 있게 다듬기에 적합함.",
    updatedAt: "2026-10-07"
  },
  {
    id: "canva-design",
    name: "Canva",
    category: "uiux",
    tagline: "템플릿과 AI로 배너·포스터 같은 그래픽을 빠르게 만드는 툴",
    url: "https://canva.com",
    pricing: { type: "freemium", detail: "" },
    pros: ["템플릿이 많아 디자인 경험이 없어도 쉬움"],
    cons: ["웹 화면 설계보다는 그래픽에 강함"],
    useCases: ["홍보물", "썸네일", "카드뉴스"],
    review: "PPT와 가장 비슷하여, 초보자도 쉽게 접근 가능",
    updatedAt: "2026-10-07"
  },
  {
    id: "framer",
    name: "Framer",
    category: "uiux",
    tagline: "프롬프트로 웹사이트를 만들고 바로 인터넷에 배포하는 툴",
    url: "https://framer.com",
    pricing: { type: "freemium", detail: "" },
    pros: ["코딩 없이 사이트를 만들고 바로 공개"],
    cons: ["무료 플랜은 도메인과 페이지 수에 제한"],
    useCases: ["포트폴리오·소개 사이트를 빨리 공개할 때"],
    review: "",
    updatedAt: "2026-10-07"
  },

  /* ===== 이미지 생성·편집 ===== */
  {
    id: "ideogram",
    name: "Ideogram",
    category: "image",
    tagline: "글자 타이포그래피 구현에 특화된 AI",
    url: "https://ideogram.ai/",
    pricing: {
      type: "freemium",
      detail: "무료: 매일 10회 느린 생성 크레딧 리셋\n유료: Basic 월 $8 / Plus 월 $20부터"
    },
    pros: [
      "기본 생성 시 4가지 시안을 한 번에 제공하여 의도에 가장 가까운 결과를 선택하기 수월함",
      "커뮤니티 피드를 통해 고품질 결과물의 프롬프트를 확인하고 벤치마킹(학습)할 수 있음"
    ],
    cons: ["한국어 텍스트 이해도는 떨어지는 편", "무료 플랜은 JPEG만 다운로드 가능"],
    useCases: ["영문 타이포그래피 로고 시안", "영문 포스터 및 굿즈 그래픽 생성"],
    review: "다른 사람들이 만든 디자인 및 프롬프트를 볼 수 있어서 좋았고, 시안을 다양하게 뽑고 싶을 때 유리할 듯",
    updatedAt: "2026-10-07"
  },
  {
    id: "canva-magic-studio",
    name: "Canva (Magic Studio)",
    category: "image",
    tagline: "생성부터 배경 제거(누끼)까지 처리하는 실무 디자인 툴",
    url: "https://www.canva.com/",
    pricing: {
      type: "freemium",
      detail: "무료: 기본 기능 및 월별 소량 AI 크레딧 제공\nPro: 월 9,900원 (연간 99,000원)"
    },
    pros: [
      "이미지 편집, 시각화 편집에 강점",
      "이미지 일러스트 레이어를 나누는 기능, 배경 제거 기능(누끼)이 뛰어남"
    ],
    cons: ["핵심 AI·편집 기능은 Canva Pro 구독 필수"],
    useCases: ["SNS 콘텐츠·배너 제작", "발표용 PPT 템플릿", "카드뉴스 및 마케팅 디자인"],
    review: "웹 기반이라 직관적임. 기능이 다양함에도 UI가 다루기 매우 편함.",
    updatedAt: "2026-10-07"
  },
  {
    id: "midjourney",
    name: "Midjourney",
    category: "image",
    tagline: "극사실주의 묘사와 예술적 질감 표현에 특화된 대표 이미지 생성 AI",
    url: "https://www.midjourney.com/",
    pricing: {
      type: "paid",
      detail: "유료 전용 (무료 체험 불가)\nBasic 플랜: 월 $10부터"
    },
    pros: ["압도적인 사실적 그래픽 디테일", "조명·질감 묘사 최상급", "예술적 연출력 탁월"],
    cons: [
      "무료 체험이 없어 최소 결제 필수",
      "복잡한 영문 타이포그래피(글자 철자) 렌더링은 Ideogram 대비 아쉬움"
    ],
    useCases: ["포토리얼리즘 인물·배경 그래픽", "판타지·SF 콘셉트 아트", "고화질 상업용 일러스트 시안"],
    review: "유료여서 사용해보지 못함",
    updatedAt: "2026-10-07"
  },

  /* ===== 시각화·PPT ===== */
  {
    id: "canva-ppt",
    name: "Canva",
    category: "ppt",
    tagline: "템플릿 기반 올인원 디자인 툴",
    url: "https://www.canva.com/ko_kr/",
    pricing: { type: "freemium", detail: "Pro 월간 ₩9,900" },
    pros: ["방대한 템플릿", "세부 조정 및 협업 용이"],
    cons: ["퀄리티 높은 템플릿과 아이콘 요소 대부분이 유료"],
    useCases: ["카드뉴스", "간단한 발표 자료"],
    review: "초보도 금방 안정적인 퀄리티의 결과물을 낼 수 있음",
    author: "최유진",
    updatedAt: "2026-10-07"
  },
  {
    id: "gamma",
    name: "Gamma",
    category: "ppt",
    tagline: "프롬프트로 PPT를 만들어 주는 AI",
    url: "https://gamma.app/",
    pricing: { type: "freemium", detail: "Plus 월간 $12" },
    pros: ["몇 분 만에 초안 완성 가능"],
    cons: ["세부 수정 자유도가 비교적 낮음"],
    useCases: ["발표 초안", "빠른 공유용 자료"],
    review: "PPT의 대략적인 틀을 잡을 때 매우 유용함",
    author: "최유진",
    updatedAt: "2026-10-07"
  },

  /* ===== 회의록·기록 ===== */
  {
    id: "clovanote",
    name: "클로바노트",
    category: "notes",
    tagline: "네이버 하이퍼클로바 기반으로 한국어 구어체까지 정확히 받아적는 서비스",
    url: "https://clovanote.naver.com/",
    pricing: {
      type: "free",
      detail: "매월 300분 무료 (데이터 수집 동의 시 최대 600분)"
    },
    pros: [
      "한국어 구어체·방언 인식률 최상급",
      "화자 분리 우수",
      "네이버 계정 연동 및 모바일-PC 동기화 편리"
    ],
    cons: [
      "글로벌 언어 지원 종류가 상대적으로 적음",
      "녹취록을 바탕으로 대화형 질문을 던지는 기능(보드 챗 등)이 부족함"
    ],
    useCases: ["오프라인 미팅 녹음 및 전사", "인터뷰 정리", "회의 시간대별 핵심 요약"],
    review: "인터페이스가 깔끔해 처음 써보는 사람도 진입장벽 없이 간편하게 사용 가능함",
    updatedAt: "2026-10-07"
  },
  {
    id: "daglo",
    name: "다글로",
    category: "notes",
    tagline: "회의 녹음, 유튜브 링크, 오디오 파일을 텍스트로 바꾸고 분석하는 기록 AI",
    url: "https://daglo.ai/",
    pricing: {
      type: "freemium",
      detail: "무료: 매월 1,000 크레딧 (약 4시간 상당)\nPro: 월 11,900원부터"
    },
    pros: [
      "녹음 내용을 바탕으로 PPT 슬라이드 및 퀴즈 제작 기능이 있음",
      "받아쓴 텍스트 기반 대화형 질의응답(보드 챗) 가능",
      "노션 연결성"
    ],
    cons: [
      "대용량·장시간 오디오 파일 전사 시 처리 지연이 발생할 수 있음",
      "전문 용어 인식 오차 발생 가능"
    ],
    useCases: ["강의 및 사내 교육 내용 복습", "인터뷰 자료 정리", "회의 내용 발표자료(PPT·퀴즈) 빠른 초안 제작"],
    review: "퀴즈 및 슬라이드 생성을 지원해 텍스트에 그치지 않고 시각적으로 바로 이해할 수 있어 유용함",
    updatedAt: "2026-10-07"
  },
  {
    id: "otter",
    name: "Otter.ai",
    category: "notes",
    tagline: "실시간 회의에 봇이 참여해 영문 전사 및 회의록을 생성하는 글로벌 툴",
    url: "https://otter.ai/",
    pricing: {
      type: "freemium",
      detail: "Basic 무료: 매월 300분 지원 (1회 미팅당 최대 30분)\nPro: 연간 결제 시 월 $8.33 / 월간 결제 시 $16.99"
    },
    pros: [
      "주요 화상회의(Zoom, Teams, Meet) 캘린더 자동 연동",
      "실시간 화면 캡처 및 영문 회의록 템플릿 요약 우수"
    ],
    cons: ["한국어 음성 인식률 및 지원 완성도가 낮음", "무료 플랜은 단일 미팅당 30분 제한"],
    useCases: ["글로벌 영어 화상 미팅 실시간 전사", "해외 바이어 미팅 및 웨비나 기록"],
    review: "영문 미팅 시 봇이 알아서 회의록과 캡처본을 남겨줘 편리하지만, 한국어 위주 회의 환경에서는 활용도가 제한적임",
    updatedAt: "2026-10-07"
  },

  /* ===== 음성·번역 ===== */
  {
    id: "deepl",
    name: "DeepL",
    category: "voice",
    tagline: "자연스러운 문장의 AI 번역기",
    url: "https://www.deepl.com/ko/translator",
    pricing: { type: "freemium", detail: "Individual 월 $10.49" },
    pros: ["문맥을 살린 번역", "문서 파일 번역 특화", "다수 파일 일괄 번역 가능"],
    cons: ["무료 버전은 문서 번역 횟수 제한"],
    useCases: ["업무 메일", "보고서", "논문"],
    review: "많은 양의 외국어를 한 번에 빠르게 읽어야 할 때나 번역해야 할 때 쓰기 좋음",
    author: "최유진",
    updatedAt: "2026-10-07"
  },
  {
    id: "papago",
    name: "Papago",
    category: "voice",
    tagline: "한국어에 특화된 네이버 번역기",
    url: "https://papago.naver.com/",
    pricing: { type: "freemium", detail: "Plus Basic 월 ₩13,000" },
    pros: ["자연스러운 구어체", "접근성 편리", "요금 제약이 낮음"],
    cons: ["긴 전문 문서에는 약함"],
    useCases: ["단어 검색", "일상 대화", "여행"],
    review: "가볍게 쓰기에 가장 편함",
    author: "최유진",
    updatedAt: "2026-10-07"
  },
  {
    id: "elevenlabs",
    name: "ElevenLabs",
    category: "voice",
    tagline: "사람 같은 목소리를 만드는 AI 음성 툴",
    url: "https://elevenlabs.io/app/studio",
    pricing: { type: "freemium", detail: "Creator $11" },
    pros: ["자연스러운 감정 표현", "음성 세부 조정 용이", "목소리 복제 기능"],
    cons: ["가끔 한국어 억양이 어색함"],
    useCases: ["영상 내레이션", "더빙"],
    review: "다른 음성 툴보다 덜 기계적이고, 목소리 복제 기능이 유용함",
    author: "최유진",
    updatedAt: "2026-10-07"
  }
];