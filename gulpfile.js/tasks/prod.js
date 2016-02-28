/*
 * Production Build tasks
 * ======================
 */

'use strict';

module.exports = function (gulp, $, config, siteConfig) {

  var dirs = config.dirs;
  var files = config.files;

  gulp.task('prod:static', function () {
    return gulp.src('./static/**/*')
      .pipe(gulp.dest(dirs.dist));
  });

  gulp.task('prod:scripts', function () {
    return gulp.src(files.vendors.concat(files.scripts))
      .pipe($.concat('all.js'))
      .pipe(gulp.dest(dirs.dist));
  });

  gulp.task('prod:jade', function () {
    return gulp.src([files.jade])
      .pipe($.jade({
        data: siteConfig
      }))
      .pipe(gulp.dest(dirs.dist));
  });

  gulp.task('prod:generate-200', ['prod:jade'], function () {
    return gulp.src([dirs.dist + '/index.html'])
      .pipe($.rename('200.html'))
      .pipe(gulp.dest(dirs.dist));
  });

  gulp.task('prod:stylus', function () {
    return gulp.src([files.stylus])
      .pipe($.stylus())
      .pipe(gulp.dest(dirs.dist));
  });

  gulp.task('prod:pack-css', ['prod:stylus'], function () {
    return gulp.src(files.components.concat(
      dirs.src + '/styles/agency.css',
      dirs.src + '/styles/socialicious.css',
      dirs.dist + '/main.css'
    ))
      .pipe($.concatCss('all.css'))
      .pipe($.cssmin())
      .pipe(gulp.dest(dirs.dist));
  });

  gulp.task('prod:del-css-middle', ['prod:pack-css'], function () {
    return $.del([dirs.dist + '/main.css']);
  });

  gulp.task('prod:sprites', function () {
    gulp.src('./images/*.png')
      .pipe($.sprite('sprites.png', {
        imagePath: '/img',
        cssPath: './src/styles/',
        preprocessor: 'stylus'
      }))
      .pipe(gulp.dest('./dist/img/'));
  });

  // The main development task.
  gulp.task('prod', [
    'prod:static',
    'prod:scripts',
    'prod:stylus',
    'prod:pack-css',
    'prod:del-css-middle',
    'prod:jade',
    'prod:generate-200'
  ]);

};
