import { Router } from 'express';
import CpuMetrics from '../models/CpuMetrics';

const router = Router();

router.get('/', (req, res, next) => {
  CpuMetrics.findAll().then(data => {
    res.status(200).send(data);
    next();
  });
});

export default router;
