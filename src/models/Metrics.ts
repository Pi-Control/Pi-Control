import { Model } from 'sequelize';

class Metrics extends Model {
  public value!: number;

  public unit!: string;

  public timestamp!: string;
}

export default Metrics;
