import { Router } from 'express';
import User from '../models/User';

const router = Router();

router.get('/', (req, res, next) => {
  User.create({
    name: 'Pi User',
    password: '1234',
  })
    .then(() => User.findAll())
    .then(data => {
      res.status(200).send(data);
      next();
    });
});

export default router;
