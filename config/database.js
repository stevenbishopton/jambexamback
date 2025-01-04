import { Sequelize } from 'sequelize';
import config from './config.js';


const env = process.env.NODE_ENV || 'development';
let sequelize;

if (config[env].use_env_variable) {
  sequelize = new Sequelize(process.env[config[env].use_env_variable], {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
} else {
  const { username, password, database, host, port, dialect } = config[env];
  sequelize = new Sequelize(database, username, password, {
    host,
    port,
    dialect,
  });
}

export default sequelize;
