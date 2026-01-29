# GitHub 올리기 & Vercel 배포

## 1. GitHub에 저장소 만들기

1. [GitHub](https://github.com/new) 에서 **New repository** 생성
2. Repository name: `cs-members-dashboard` (원하는 이름으로 가능)
3. **Public** 선택, **Create repository** (README 추가 안 함)

## 2. 로컬에서 Git 초기화 후 푸시

프로젝트 루트(`d:\Test\20260129_cs_members_dashboard`)에서 터미널을 열고:

```bash
# Git 초기화 (이미 되어 있으면 생략)
git init

# 모든 파일 스테이징 (.gitignore에 따라 .env, node_modules, dist 제외됨)
git add .

# 첫 커밋
git commit -m "chore: initial commit - members dashboard (frontend + backend mock)"

# 기본 브랜치를 main으로 (필요 시)
git branch -M main

# GitHub 저장소 연결 (본인 계정/저장소 이름으로 수정)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# 푸시
git push -u origin main
```

`YOUR_USERNAME` / `YOUR_REPO_NAME` 을 실제 GitHub 사용자명과 저장소 이름으로 바꾸세요.

## 3. Vercel 배포 (프론트엔드)

Vercel은 **프론트엔드(React)** 를 배포하는 데 적합합니다.

1. [Vercel](https://vercel.com) 로그인 후 **Add New Project**
2. **Import** 로 방금 올린 GitHub 저장소 선택
3. **Root Directory** 를 `frontend` 로 설정
4. **Framework Preset**: Vite
5. **Build Command**: `pnpm run build` (또는 `npm run build`)
6. **Output Directory**: `dist`
7. **Environment Variables** (선택):
   - `VITE_APP_ENV` = `server`
   - API가 다른 URL이면 `VITE_API_URL` = 실제 백엔드 API 주소
8. **Deploy** 클릭

### 참고

- 백엔드(Express)는 Vercel 서버리스 함수로 올리거나, **Railway / Render / Fly.io** 등 별도 서비스에 배포하는 것이 일반적입니다.
- 프론트만 Vercel에 올리고, API는 나중에 다른 호스팅에 올린 뒤 `VITE_API_URL` 로 연결하면 됩니다.
