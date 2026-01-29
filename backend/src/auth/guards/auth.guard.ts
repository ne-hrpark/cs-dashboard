import { Request, Response, NextFunction } from 'express';

/**
 * 인증 가드 (선택 사용)
 * API 키, JWT 등으로 교체 가능합니다.
 * 현재는 통과만 시킵니다.
 */
export function auth(
  _req: Request,
  _res: Response,
  next: NextFunction
): void {
  // 예: const apiKey = req.headers['x-api-key'];
  // if (!apiKey || apiKey !== process.env.API_KEY) return res.status(401).json({ error: 'Unauthorized' });
  next();
}
