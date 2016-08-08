var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var Server = require('karma').Server;
// var nodemon = require('gulp-nodemon');
// var jshint = require('gulp-jshint');
// var tape = require('gulp-tape');
// var tapColorize = require('tap-colorize');
// var mocha = require('gulp-mocha');
// var gutil = require('gulp-util');

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

gulp.task('watch', ['browserSync', 'sass', 'karma'], function() {
  gulp.watch('frontend/assets/css/**/*.scss', ['sass']);
  gulp.watch('frontend/*.html', browserSync.reload);
  gulp.watch('frontend/**/*.js', browserSync.reload);
  gulp.watch(['frontend/**.js', 'test/**.js'], ['karma']);
  // gulp.watch(['frontend/**.js', 'test/**.js'], ['testOne']);
  // gulp.watch(['frontend/**.js', 'test/**.js'], ['tapeTest']);
});

gulp.task('karma', function(done) {
  new Server({
    configFile: __dirname + '/test/karma.conf.js',
    singleRun: true
  }, done).start();
});

// gulp.task('tdd', function(done) {
//   new Server({
//     configFile: '/karma.conf.js'
//   }, done).start();
// });
//
// gulp.task('default', ['tdd']);

// gulp.task('testOne', function (cb) {
//   exec('node frontend/app/app.js', function (err, stdout, stderr) {
//     console.log(stdout);
//     console.log(stderr);
//     cb(err);
//  });
// });

 // gulp.task('start', function () {
 //   nodemon({0
 //     script: 'server.js'
 //   , ext: 'js html'
 //   , env: { 'NODE_ENV': 'development' }
 //   })
 // })
 //
 // gulp.task('lint', function () {
 //  gulp.src('./**/*.js')
 //    .pipe(jshint())
 //  })

// gulp.task('develop', function () {
//   nodemon({ script: 'main.js'
//           , ext: 'html js'
//           , ignore: ['ignored.js']
//           , tasks: ['lint'] })
//     .on('restart', function () {
//       console.log('restarted!')
//     })
// })
//
// gulp.task('tapeTest', function() {
//   return gulp.src('test/index.js')
//     .pipe(tape({
//       reporter: tapColorize()
//     }));
// });

// gulp.task('mochaTest', function() {
//   return gulp.src(['test/index.js'], { read: false })
//     .pipe(mocha({
//       reporter: 'spec',
//       globals: {
//         should: require('should')
//       }
//     }));
// });

// gulp.task('mocha', function() {
//     return gulp.src(['test/index.js'], { read: false })
//         .pipe(mocha({ reporter: 'list' }))
//         .on('error', gutil.log);
// });
