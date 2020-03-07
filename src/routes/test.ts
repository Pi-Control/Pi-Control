import { Router } from "express";
import si from 'systeminformation';

const router = Router();

router.get('/', (req, res, next) =>  {

  si.versions()
      .then(data => {
        res.status(200).send(data);
        next();
      })
      .catch(error => console.error(error));
});



export default router;
