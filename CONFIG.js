var sqlEntry = {
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS
};

module.exports.sqlEntry = sqlEntry;
