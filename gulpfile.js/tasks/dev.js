/*
 * Development tasks
 * =================
 */

'use strict';

module.exports = function (gulp, $, config, siteConfig) {

  var dirs = config.dirs;
  var files = config.files;

  gulp.task('dev:scripts', function () {
    var a = files.vendors.concat(files.scripts);
    return gulp.src(a)
      .pipe($.concat('all.js'))
      .pipe(gulp.dest(dirs.build));
  });

  // Starts the live web development server for testing.
  gulp.task('dev:connect', ['dev:jade', 'dev:stylus'], function () {
    $.connect.server({
      root: [dirs.dist],
      port: 9000,
      livereload: true
    });
  });

  // Monitors files for changes, trigger rebuilds as needed.
  gulp.task('dev:watch', function () {
    gulp.watch('src/**/*.jade', ['dev:jade']);
    gulp.watch(files.jade, ['dev:jade']);
    gulp.watch(files.stylus, ['dev:stylus']);
    gulp.watch(files.scripts, ['dev:scripts']);
  });

  gulp.task('dev:jade', function () {
    return gulp.src([files.jade])
      .pipe($.jade({
        pretty: true,
        data: siteConfig
      }))
      .pipe(gulp.dest(dirs.build));
  });

  gulp.task('dev:stylus', function () {
    return gulp.src([files.stylus])
      .pipe($.stylus())
      .pipe(gulp.dest(dirs.build));
  });

  gulp.task('dev:vendors', ['dev:stylus'], function () {
    var a = files.components.concat(dirs.build + '/styles/main.css', dirs.src + '/styles/agency.css');
    return gulp.src(a)
      .pipe($.concatCss('all.css'))
      .pipe(gulp.dest(dirs.build));
  });

  gulp.task('dev:del', ['dev:vendors'], function () {
    return $.del([dirs.build + '/styles']);
  });

  gulp.task('sprites', ['bkg'], function () {
    gulp.src('./images/*.png')
      .pipe($.sprite('sprites.png', {
        imagePath: '/img',
        cssPath: './src/styles/',
        preprocessor: 'stylus'
      }))
      .pipe(gulp.dest('./build/img/'));
  });

  gulp.task('bkg', function () {
    gulp.src('./images/header-bg.png')
      .pipe(gulp.dest('./build/img/'));
  });

  gulp.task('dev:del-sprites-middle', ['dev:stylus'], function () {
    return $.del([dirs.src + '/styles/sprites.stylus']);
  });

  // The main development task.
  gulp.task('dev', [
    'dev:jade',
    'dev:stylus',
    'dev:connect',
    'dev:watch',
    'dev:scripts',
    'dev:del',
    'dev:del-sprites-middle'
  ]);

  // Aliasing `dev` as default task.
  gulp.task('default', ['dev']);

};
