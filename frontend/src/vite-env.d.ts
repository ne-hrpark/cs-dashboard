/// <reference types="vite/client" />

/**
 * Vercel: Production / Preview / Development 에서 각각 설정 가능
 * Local: .env.local (git 제외) 또는 .env
 */
interface ImportMetaEnv {
  /** API 베이스 URL. 미설정 시 같은 오리진(빈 문자열) 사용 */
  readonly VITE_API_URL?: string;
  /** local: Vite 프록시 사용, server: 외부 API URL 사용 */
  readonly VITE_APP_ENV?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
