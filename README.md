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
- **pnpm** (`npm install -g pnpm`)

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
- **설정**: Vercel 프로젝트 → **Settings → General → Root Directory** = `frontend`
- **빌드**: `frontend/vercel.json` 기준 (install: pnpm install, build: pnpm run build, output: dist)
- **환경변수** (`import.meta.env` 기반, 하드코딩 URL 금지):

  | 변수 | 설명 | Local | Preview | Production |
  |------|------|-------|---------|------------|
  | `VITE_API_URL` | API 베이스 URL | `/api` (프록시) | 백엔드 URL | 백엔드 실제 URL |
  | `VITE_APP_ENV` | `local` / `server` | `local` | `server` | `server` |

- **`.env.local`**: git에 포함하지 않음 (이미 `.gitignore`에 포함). 로컬만 사용.
- **참고**: `frontend/.env.example` 복사 후 `.env` 또는 `.env.local` 에서 값 설정.

자세한 단계는 **[DEPLOY.md](./DEPLOY.md)** 를 참고하세요.

## SQL 쿼리 교체

`backend/src/queries/` 폴더의 각 `.sql` 파일은 예시 쿼리입니다. 실제 DB 테이블/컬럼명에 맞게 수정한 뒤 사용하세요. 파일 상단 주석에 용도와 파라미터 설명이 있습니다.
