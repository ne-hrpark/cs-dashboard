/**
 * Vercel / Local 환경변수 접근
 * import.meta.env 기반, 하드코딩 URL 없음
 */

function getEnv(key: keyof ImportMetaEnv): string {
  const value = import.meta.env[key];
  return value != null && typeof value === 'string' ? value : '';
}

/** API 베이스 URL. 빈 문자열이면 같은 오리진(상대 경로) */
export const VITE_API_URL = getEnv('VITE_API_URL');

/** local | server */
export const VITE_APP_ENV = getEnv('VITE_APP_ENV');
