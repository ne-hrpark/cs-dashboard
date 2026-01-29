# 회원 통계 대시보드

React + TypeScript 프론트엔드와 Node.js + Express + TypeScript 백엔드로 구성된 회원 통계 대시보드입니다.

## 프로젝트 구조

```
project/
├── frontend/     # React + Vite + TypeScript + Tailwind
└── backend/      # Node.js + Express + TypeScript + MSSQL
```

## 요구 사항

- Node.js 20+
- **pnpm**: `packageManager`(pnpm@9.15.5)로 관리. Node 20+에서 `ERR_PNPM_META_FETCH_FAIL` / URLSearchParams 오류가 나면 **Corepack**으로 맞춰 쓰세요.
  ```bash
  corepack enable
  corepack prepare pnpm@9.15.5 --activate
  pnpm install
  ```

## 설치 및 빌드

프로젝트 루트에서 한 번만 설치:

```bash
pnpm install
```

- backend, frontend 의존성을 모두 설치합니다 (pnpm workspace).

**한 번에 빌드:**

```bash
pnpm run build
```

- 백엔드(`backend/dist`)와 프론트엔드(`frontend/dist`)를 모두 빌드합니다.
- 백엔드만: `pnpm run build:backend`
- 프론트엔드만: `pnpm run build:frontend`

## Mock 데이터 (DB 없이 실행)

`backend/.env`에 **MOCK=true** 로 두면 DB 연결 없이 mock 데이터로 API가 동작합니다.

- 백엔드: `pnpm run dev:backend` → http://localhost:3001
- 프론트엔드: axios로 `/api/*` 호출 → 백엔드가 mock 응답 반환
- Mock 데이터: `backend/src/mock/data.ts` 에서 수정 가능

실제 DB 사용 시 `.env`에서 `MOCK=false` 또는 `MOCK` 줄을 제거하고 DB 설정을 넣으면 됩니다.

## 개발 환경 (local)

1. **백엔드**
   - Mock 사용: `backend/.env`에 `MOCK=true` (기본값)
   - 실제 DB 사용: DB 정보 설정(DB_SERVER, DB_USER, DB_PASSWORD, DB_NAME 등), `MOCK=false` 또는 제거
   - `backend/queries/` 내 SQL 파일을 실제 테이블/컬럼에 맞게 수정
   - 루트에서:
     ```bash
     pnpm run dev:backend
     ```
     또는 `cd backend && pnpm run dev`
   - 서버: http://localhost:3001

2. **프론트엔드**
   - `frontend/.env`에 `VITE_APP_ENV=local` 설정 (기본값)
   - 루트에서:
     ```bash
     pnpm run dev:frontend
     ```
     또는 `cd frontend && pnpm run dev`
   - 브라우저: http://localhost:5173
   - Vite 프록시로 `/api` → `http://localhost:3001/api` 자동 연결
   - **`[vite] http proxy error: /api/...`** 가 나오면 → 백엔드가 꺼져 있음. 터미널 하나 더 열어 `pnpm run dev:backend` 실행 후 새로고침.

**백엔드·프론트엔드 동시 실행 (루트):**

```bash
pnpm run dev
```

## 배포 환경 (server)

- Nginx가 `/api` 요청을 백엔드(예: localhost:3001)로 프록시
- 루트에서 `pnpm run build` 후:
  - 프론트엔드: `frontend/dist/` 정적 서빙
  - 백엔드: `cd backend && pnpm start` (또는 `node dist/index.js`)
- `frontend/.env`에서 `VITE_APP_ENV=server`로 설정 후 빌드

## Backend API

**Swagger 문서**: 백엔드 실행 후 [http://localhost:3001/api-docs](http://localhost:3001/api-docs) 에서 요청/응답 스키마와 Try it out 확인 가능.

| 메서드 | 경로 | 설명 |
|--------|------|------|
| GET | /api/stats/summary | 전체 회원 통계 |
| GET | /api/stats/trend | 시계열 통계 (query: period, startDate, endDate) |
| GET | /api/stats/age_groups | 연령대별 |
| GET | /api/stats/gender_groups | 성별 |
| GET | /api/stats/region_groups | 지역별 |
| GET | /api/stats/signup_source | 가입 경로별 |
| GET | /api/stats/status_groups | 상태별 |
| GET | /api/users | 회원 목록 (page, limit) |
| GET | /api/stats/realtime | 실시간 통계 (폴링용) |

## Vercel 배포 (frontend만)

- **배포 대상**: `frontend` 폴더만. backend는 Vercel에서 빌드/배포하지 않음.
- **설정**: Vercel 프로젝트 → **Settings → General → Root Directory** = `frontend` (권장). 루트의 `vercel.json`은 Root Directory = `.` 일 때만 사용됩니다.
- **빌드**: `frontend/vercel.json` 기준 (install: pnpm install, build: pnpm run build, output: dist)
- **환경변수** (`import.meta.env` 기반, 하드코딩 URL 금지):

  | 변수 | 설명 | Local | Preview | Production |
  |------|------|-------|---------|------------|
  | `VITE_API_URL` | API 베이스 URL | `/api` (프록시) | 백엔드 URL | 백엔드 실제 URL |
  | `VITE_APP_ENV` | `local` / `server` | `local` | `server` | `server` |

- **`.env.local`**: git에 포함하지 않음 (이미 `.gitignore`에 포함). 로컬만 사용.
- **참고**: `frontend/.env.example` 복사 후 `.env` 또는 `.env.local` 에서 값 설정.

자세한 단계는 **[DEPLOY.md](./DEPLOY.md)** 를 참고하세요.

### Vercel Preview vs Production

| 구분 | Preview | Production |
|------|---------|------------|
| **언제 생성되나** | PR 올리기, `main` 외 브랜치 push, `vercel`(CLI) 실행 시 | `main`(또는 설정한 Production 브랜치)에 push, `vercel --prod` 실행 시 |
| **용도** | PR/브랜치별로 “미리 보기” URL로 확인 | 실제 서비스용 최종 URL (예: `your-app.vercel.app`) |
| **URL** | 매 배포마다 고유 URL (예: `xxx-abc123.vercel.app`) | 프로젝트에 연결한 도메인 1개 (고정) |
| **환경변수** | Vercel에서 **Preview**용으로 따로 설정 가능 | Vercel에서 **Production**용으로 따로 설정 가능 |
| **캐시·CDN** | Preview 전용 | Production 전용 (실사용 트래픽) |
| **권장 사용** | PR 리뷰, QA, 스테이징 테스트 | 실제 사용자에게 공개하는 버전 |

- **Preview**: “이 브랜치/이 커밋이 어떻게 보이는지” 확인할 때 사용. Production과 다른 API URL·환경변수를 줄 수 있음.
- **Production**: “실제 서비스 주소”로, 도메인 연결·환경변수·트래픽 모두 실서비스 기준으로 관리.

**404 DEPLOYMENT_NOT_FOUND** 가 나오면: 접속한 URL이 **삭제되었거나 없는 배포**를 가리킬 때 발생합니다. 코드 수정이 아니라 **올바른 URL 사용** 또는 **재배포**로 해결합니다. 상세 원인·해결·개념 정리 → **[docs/VERCEL_DEPLOYMENT_NOT_FOUND.md](docs/VERCEL_DEPLOYMENT_NOT_FOUND.md)**.

## Cursor + Vercel 연동

Cursor 확장 마켓에는 Vercel 공식 확장이 없습니다. 아래 방식으로 연동하면 됩니다.

**1) 터미널에서 배포 (Vercel CLI)**

- **최초 1회**: `cd frontend && pnpm exec vercel link` (또는 루트에서 `pnpm run deploy:preview` 후 링크 프롬프트에서 선택) → Vercel 로그인 후 **Root Directory = `frontend`** 인 프로젝트 선택
- **Preview 배포**: 루트에서 `pnpm run deploy:preview` (내부적으로 `frontend`에서 Vercel 실행)
- **Production 배포**: 루트에서 `pnpm run deploy:prod`
- **주의**: Vercel 프로젝트 Root Directory가 `frontend`이면 CLI도 반드시 **frontend 디렉터리 기준**으로 실행해야 Git 빌드와 동일한 배포가 생성됩니다. 그렇지 않으면 `DEPLOYMENT_NOT_FOUND` 또는 빌드 불일치가 발생할 수 있습니다.

**2) Vercel 웹 대시보드**

- [vercel.com](https://vercel.com) 로그인 → 프로젝트 선택 → Deployments, Logs, Environment Variables 등 관리

**3) Git push와 연동**

- GitHub에 push하면 Vercel이 자동으로 빌드·배포 (저장소 연결된 경우)

### DEPLOYMENT_NOT_FOUND 발생 시

- **의미**: 요청한 배포(URL 또는 Deployment ID)가 존재하지 않을 때 발생 (404).
- **흔한 원인**  
  1. **Root Directory 불일치**: Vercel 프로젝트 Root Directory = `frontend`인데, CLI를 **루트**에서 실행하면 업로드/빌드 컨텍스트가 달라져 배포가 깨지거나 찾을 수 없을 수 있음. → **해결**: `pnpm run deploy:preview` / `deploy:prod` 사용 (내부에서 `frontend`에서 실행).  
  2. **삭제된 Preview URL**: 예전 Preview URL(예: `xxx-abc123.vercel.app`)을 열었는데 해당 배포가 삭제된 경우. → **해결**: Vercel 대시보드 Deployments에서 최신 배포 URL 사용.  
  3. **잘못된 프로젝트 링크**: `.vercel`이 다른/삭제된 프로젝트를 가리킴. → **해결**: `cd frontend && pnpm exec vercel link`로 올바른 프로젝트(Root Directory = `frontend`) 다시 연결.
- **예방**: CLI 배포는 항상 `frontend` 기준으로 실행하고, Preview URL은 북마크 대신 대시보드에서 최신 링크를 사용.

## SQL 쿼리 교체

`backend/src/queries/` 폴더의 각 `.sql` 파일은 예시 쿼리입니다. 실제 DB 테이블/컬럼명에 맞게 수정한 뒤 사용하세요. 파일 상단 주석에 용도와 파라미터 설명이 있습니다.
