# apartment-ai-price-app

아파트·근린상가 분양 및 거래가액 분석 앱

## 설치 및 실행

```bash
npm install
npm run dev
```

## 배포

```bash
npm run build
```

Vercel, Netlify, GitHub Pages 등에 배포 가능함.

## 파일 구조

```text
apartment-ai-price-app-final
├─ index.html
├─ package.json
├─ postcss.config.js
├─ tailwind.config.js
├─ vite.config.js
├─ README.md
└─ src
   ├─ App.jsx
   ├─ main.jsx
   ├─ styles.css
   └─ components
      └─ ui
         ├─ badge.jsx
         ├─ button.jsx
         └─ card.jsx
```


## GitHub 업로드

```bash
git init
git add .
git commit -m "Initial deployable apartment price app"
git branch -M main
git remote add origin https://github.com/본인아이디/apartment-ai-price-app-final.git
git push -u origin main
```

## Vercel 배포

1. Vercel 접속
2. Add New Project
3. GitHub Repository 선택
4. Framework Preset: Vite
5. Build Command: npm run build
6. Output Directory: dist
7. Deploy 클릭
