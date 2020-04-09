import { Sequelize } from 'sequelize';
import debug from 'debug';

export const logger = debug('sql-sequelize');

const sequelize = new Sequelize('sqlite::memory:', {
  logging: logger,
});

export default sequelize;
