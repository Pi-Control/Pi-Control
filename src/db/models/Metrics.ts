import { Model } from 'sequelize';

class Metrics extends Model {
  type!: string;
  value!: number;
  unit!: string;
  timestamp!: string;
}

export default Metrics;
