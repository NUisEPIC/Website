var gulp = require('gulp')
  , $    = require('gulp-load-plugins')()
  , bs   = require('browser-sync').create()

gulp.task('jade', function () {
  gulp.src('src/jade/index.jade')
    .pipe($.jade())
    .pipe(gulp.dest('.tmp'))
    .pipe(bs.reload())
})

gulp.task('stylus', function () {
  gulp.src('src/stylus/main.styl')
    .pipe($.stylus())
    .pipe(gulp.dest('.tmp'))
    .pipe(bs.reload({ stream: true }))
})

gulp.task('js', function () {
  gulp.src('src/js/**/*')
    .pipe(gulp.dest('.tmp/js'))
})

gulp.task('watch', function () {
  // gulp.watch('src/jade/**/*.jade', ['jade'])
  // gulp.watch('src/stylus/**/*.styl', ['stylus'])
  // gulp.watch('src/js/**/*.js', ['js'])
  gulp.watch('src/index.html').on('change', function () {
    bs.reload()
  })
  gulp.watch('src/main.css').on('change', function () {
    bs.reload()
  })
})

gulp.task('serve', function () {
  bs.init({
    port: 8000,
    server: {
      baseDir: './src'
    }
  })
})

gulp.task('develop', ['serve', 'watch'])

