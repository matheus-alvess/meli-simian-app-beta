require('dotenv/config');

module.exports = {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  dialectOptions: {
    [process.env.NODE_ENV === 'development' ? undefined : 'ssl']: {
      require: process.env.DB_SSL === 'true',
      rejectUnauthorized: false,
    },
  },
  define: {
    timestamps: true,
    underscored: true,
  },
};
