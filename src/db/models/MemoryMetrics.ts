import { DataTypes } from 'sequelize';
import database from '../database';

import Metrics from './Metrics';

class MemoryMetrics extends Metrics {
  public type!: string;
  public value!: number;
  public unit!: string;
  public timestamp!: string;
}

MemoryMetrics.init(
  {
    type: {
      type: DataTypes.STRING(100),
    },
    value: {
      type: DataTypes.NUMBER,
    },
    unit: {
      type: DataTypes.STRING(100),
    },
    timestamp: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  },
  {
    sequelize: database,
  },
);

database.sync();

export default MemoryMetrics;
