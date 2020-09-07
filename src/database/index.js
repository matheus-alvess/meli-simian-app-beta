import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Metrics from '../models/Metrics';

const models = [Metrics];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map((model) => model.init(this.connection));
  }
}

export default new Database();
