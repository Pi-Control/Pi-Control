import { DataTypes } from 'sequelize';
import database from '../database';

import Metrics from './Metrics';

class CpuMetrics extends Metrics {}

CpuMetrics.init(
  {
    value: {
      type: DataTypes.NUMBER,
    },
    unit: {
      type: DataTypes.STRING(32),
    },
    timestamp: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: database,
  }
);

database.sync();

export default CpuMetrics;
