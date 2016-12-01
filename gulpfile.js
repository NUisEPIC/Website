'use strict';
const gulp = require('gulp');
const util = require('gulp-util');
const $ = require('gulp-load-plugins')();
const bs = require('browser-sync').create();

gulp.task('html:compile', () => {
    gulp.src(['src/layout.html'])
        .pipe($.rename('index.html'))
        .pipe($.fileInclude({
            prefix: '@@',
            basepath: 'src/views/'
        }))
        .pipe(gulp.dest('src/'))
});

gulp.task('html:minify', ['html:compile'], () => {
    let options = {
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        removeComments: true
    };

    gulp.src('src/index.html')
        .pipe($.htmlmin(options))
        .pipe(gulp.dest('public/'));
});

gulp.task('html', ['html:compile', 'html:minify']);

gulp.task('css', () => {
    gulp.src('src/css/*.css')
        .pipe($.cleanCss())
        .pipe(gulp.dest('public/css/'));
});

gulp.task('js', () => {
    gulp.src('src/js/*.js')
        .pipe($.uglify())
        .pipe(gulp.dest('public/js/'));
});

gulp.task('watch', () => {
    gulp.watch(['src/views/**/*.html'], ['html:compile']);
    gulp.watch(['src/index.html'])
        .on('change', () => {
            bs.reload();
        });
});

gulp.task('build', ['html', 'css', 'js'], () => {
    gulp.src(['src/assets/**/*'])
        .pipe(gulp.dest('public/assets'));
});

gulp.task('serve', () => {
    bs.init({
        port: 8000,
        server: {
            baseDir: 'src'
        }
    });
});

gulp.task('develop', ['html:compile', 'serve', 'watch']);
