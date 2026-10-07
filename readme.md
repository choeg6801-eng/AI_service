# AI 도구 안내서

분야별 AI 서비스를 소개하는 정적 웹사이트입니다. HTML, CSS, JavaScript만 사용합니다.

## 로컬에서 보기

`index.html`을 더블클릭해서 브라우저로 열면 됩니다. 별도 설치가 필요 없습니다.
(404.html만은 Netlify에 배포한 뒤에 정상적으로 보입니다.)

## 서비스 추가·수정

`js/data.js`의 `SERVICES.js` 배열만 고치면 됩니다.

1. 기존 서비스 객체 하나를 `{`부터 `},`까지 복사해 붙여넣습니다.
2. `id`를 겹치지 않는 영문으로 바꿉니다. (예: `notion-ai`)
3. 나머지 내용을 채우고 `updatedAt`을 오늘 날짜로 바꿉니다.

분야를 추가하려면 `CATEGORIES`에 `{ id, name, color }`를 하나 더 넣으면 탭이 자동으로 생깁니다.

로고 이미지를 쓰려면 `assets/logos/`에 파일을 넣고 서비스에 `logo: "assets/logos/파일명.png"`를 추가하세요.
로고가 없으면 이름의 첫 글자가 대신 표시됩니다.

> 처음 들어 있는 7개 서비스는 예시입니다. 비용 정보는 공식 사이트에서 확인해 고치고,
> `review`(직접 써본 소감)는 본인의 경험으로 채워주세요.

## Netlify 배포

- **드래그 앤 드롭**: app.netlify.com에서 Sites로 들어가 이 폴더를 끌어다 놓습니다.
- **GitHub 연결**: 저장소에 올린 뒤 Netlify에서 저장소를 선택합니다.
  Build command는 비워두고, Publish directory는 비워두거나 `.`으로 둡니다.

## 파일 구조

```
ai-guide/
├── index.html          메인(목록·필터)
├── service.html        상세 (service.html?id=서비스id)
├── about.html          소개
├── 404.html            없는 주소
├── README.md           이 문서
├── css/
│   ├── base.css        색상 변수, 글꼴, 리셋, 다크 모드
│   ├── layout.css      헤더, 그리드, 반응형
│   └── components.css  카드, 뱃지, 탭, 버튼, 상세 화면
├── js/
│   ├── service.js         서비스·분야 데이터 ← 주로 여기만 고치면 됨
│   ├── render.js       공통 함수 (카드 그리기 등)
│   ├── main.js         목록 페이지: 검색·필터·정렬
│   └── service.js      상세 페이지
└── assets/
    ├── logos/          서비스 로고 (선택)
    └── favicon.svg
```