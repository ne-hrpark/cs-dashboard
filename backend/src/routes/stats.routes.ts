import { Router, type IRouter } from 'express';
import {
  getSummary,
  getTrend,
  getAgeGroups,
  getGenderGroups,
  getRegionGroups,
  getSignupSource,
  getStatusGroups,
  getUsers,
  getRealtime,
} from '../controllers/stats.controller';
import { auth } from '../auth/guards/auth.guard';

const router: IRouter = Router();

router.use(auth);

router.get('/stats/summary', getSummary);
router.get('/stats/trend', getTrend);
router.get('/stats/age_groups', getAgeGroups);
router.get('/stats/gender_groups', getGenderGroups);
router.get('/stats/region_groups', getRegionGroups);
router.get('/stats/signup_source', getSignupSource);
router.get('/stats/status_groups', getStatusGroups);
router.get('/stats/realtime', getRealtime);
router.get('/users', getUsers);

export default router;
