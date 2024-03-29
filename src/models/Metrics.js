import Sequelize, { Model } from 'sequelize';

class Metrics extends Model {
  static init(sequelize) {
    super.init(
      {
        is_simian: Sequelize.BOOLEAN,
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Metrics;
