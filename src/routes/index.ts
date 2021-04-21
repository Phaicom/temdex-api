import { Router } from 'express';
import temtemRouter from './temtem';

const router = Router();

router.use('/temtem', temtemRouter);

export default router;
