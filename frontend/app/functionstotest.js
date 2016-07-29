formatDate = function(date) {
  return (date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate() + ' ' + date.getHours() + '-' + date.getMinutes());
}

calculateCalories = function(visibleMeals) {
  var output = visibleMeals.reduce(function (pv, cv) {
    if (!cv.deleted) {
      pv += cv.calories;
    }
    return pv;
  }, 0);
  return output;
}

module.exports = {};
module.exports.calculateCalories = calculateCalories;
module.exports.formatDate = formatDate;
