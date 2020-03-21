import { Model, DataTypes } from 'sequelize';
import database from '../database';

class User extends Model {
  public id!: number;

  public name!: string;

  public password!: string;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(32),
      allowNull: false,
    },
    password: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    sequelize: database,
  }
);

database.sync();

export default User;
