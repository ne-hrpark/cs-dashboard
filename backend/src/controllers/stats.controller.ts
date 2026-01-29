import { Request, Response, NextFunction } from 'express';
import { statsService } from '../services/stats.service';

export async function getSummary(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await statsService.getTotalStats();
    res.json(data[0] ?? {});
  } catch (err) {
    next(err);
  }
}

export async function getTrend(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const period = (req.query.period as string) || 'daily';
    const startDate = (req.query.startDate as string) || '';
    const endDate = (req.query.endDate as string) || '';
    const data = await statsService.getTrendStats(period, startDate, endDate);
    res.json(data);
  } catch (err) {
    next(err);
  }
}

export async function getAgeGroups(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await statsService.getAgeGroups();
    res.json(data);
  } catch (err) {
    next(err);
  }
}

export async function getGenderGroups(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await statsService.getGenderGroups();
    res.json(data);
  } catch (err) {
    next(err);
  }
}

export async function getRegionGroups(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await statsService.getRegionGroups();
    res.json(data);
  } catch (err) {
    next(err);
  }
}

export async function getSignupSource(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await statsService.getSignupSource();
    res.json(data);
  } catch (err) {
    next(err);
  }
}

export async function getStatusGroups(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await statsService.getStatusGroups();
    res.json(data);
  } catch (err) {
    next(err);
  }
}

export async function getUsers(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const page = Math.max(1, parseInt(String(req.query.page), 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(String(req.query.limit), 10) || 10));
    const offset = (page - 1) * limit;
    const [users, total] = await Promise.all([
      statsService.getUsers(offset, limit),
      statsService.getUsersTotal(),
    ]);
    res.json({ data: users, total, page, limit });
  } catch (err) {
    next(err);
  }
}

export async function getRealtime(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await statsService.getRealtime();
    res.json(data[0] ?? {});
  } catch (err) {
    next(err);
  }
}
