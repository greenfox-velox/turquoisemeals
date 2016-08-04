var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var Server = require('karma').Server;

gulp.task('sass', function() {
  return gulp.src('frontend/assets/css/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('frontend/assets/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('browserSync', function() {
  browserSync.init({
    proxy: 'http://localhost:3000',
    port: 7000
  });
});

gulp.task('watch', ['browserSync', 'sass'], function() {
  gulp.watch('frontend/assets/css/**/*.scss', ['sass']);
  gulp.watch('frontend/*.html', browserSync.reload);
  gulp.watch('frontend/**/*.js', browserSync.reload);
});
