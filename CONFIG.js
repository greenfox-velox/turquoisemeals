var sqlEntry = {
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS
};
// var sqlEntry = {
//   database: 'caloriecounter',
//   host: '127.0.0.1',
//   user: 'root',
//   password: 'velox'
// };

module.exports.sqlEntry = sqlEntry;
