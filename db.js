var Meals = (function (connection) {

  function errorHandler(err) {
    if(err) {
      console.log(err.toString());
      return;
    }
  }

  function publicAddMeal (meal, cb) {
    connection.query('INSERT INTO meals SET ?', meal, function(err,row){
      errorHandler(err);
      if (row !== undefined && row.affectedRows) {
        cb({"status": "ok", "meal": {"id": row.insertId, "name": meal.name, "calories": meal.calories, "date": meal.date}});
      } else {
        cb(row);
      }
    });
  }

  function publicGetMeal (cb) {
    connection.query('SELECT * FROM meals;',function(err,rows){
      errorHandler(err);
      cb({"meals":rows});
    });
  }

  function publicDelMeal (id, cb) {
    connection.query('UPDATE meals SET deleted = true WHERE id = ?', id, function(err,row){
      errorHandler(err);
      if (row.affectedRows) {
        cb({"status": "ok", "meal": {"id": id}});
      } else {
        cb({"status": "not exists"});
      }
    });
  }

  function publicFilterMeals (date, cb) {
    connection.query('SELECT * FROM meals WHERE meals.date LIKE ?;', date + '%', function(err,rows){
      errorHandler(err);
      cb(rows);
    });
  }

  return {
    addMeal: publicAddMeal,
    getMeal: publicGetMeal,
    delMeal: publicDelMeal,
    filterMeals: publicFilterMeals
  };
});

module.exports = Meals;
