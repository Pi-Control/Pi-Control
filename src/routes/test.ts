import { Router } from "express";
import si from 'systeminformation';
import { Sequelize, Model, DataTypes } from 'sequelize';


const router = Router();


class User extends Model {}

router.get('/', (req, res, next) =>  {

  const sequelize = new Sequelize('sqlite::memory:');
  
  User.init({
    username: DataTypes.STRING,
    birthday: DataTypes.DATE
  }, { sequelize, modelName: 'user' });
  
  sequelize.sync()
    .then(() => User.create({
      username: 'janedoe',
      birthday: new Date(1980, 6, 20)
    }))
    .then(jane => {
      res.status(200).send(jane.toJSON());
      next();
    });
});



export default router;
