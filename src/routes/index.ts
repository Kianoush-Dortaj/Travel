import express from 'express';
import permissionRouter from './admin/PermissionRouter';
import roleRouter from './admin/RoleRouter';
import categoryRouter from './admin/CategoryRouter';
import subscribeRouter from './admin/SubscribeRouter';
import discountRouter from './admin/DiscountRouter';
import settingRouter from './admin/SettingRouter';
import userRouter from './admin/UserRouter';
import travelTypeRouter from './admin/TravelTypeRouter';
import travelResidenceRouter from './admin/TravelResidencerouter';
import authRouter from './admin/AuthRouter';

const router = express.Router();

router.use('/permission', permissionRouter)
router.use('/role', roleRouter)
router.use('/category', categoryRouter)
router.use('/subscribe', subscribeRouter)
router.use('/discount', discountRouter)
router.use('/Setting', settingRouter)
router.use('/Manager', userRouter)
router.use('/TravelType', travelTypeRouter)
router.use('/TravelResidence', travelResidenceRouter)
router.use('/Auth', authRouter)

export default router;