import { Router } from "express";

const router = Router();

router.get('/', (req, res, next) =>  {
  res.status(200).send("PI CONTROL!");
  next();
});



export default router;