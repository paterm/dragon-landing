const gulp = require('gulp');
const cache = require('gulp-cache');
const clean = require('gulp-clean');
const size = require('gulp-size');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const minifyCSS = require('gulp-minify-css');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');

gulp.task('css', function() {
    return gulp.src([
        './assets/css/fonts.css',
        './assets/css/*.css'
    ]).pipe(concat('style.min.css'))
        .pipe(minifyCSS({
            keepBreaks: true
        }))
        .pipe(gulp.dest('./public/styles'));
});

gulp.task('sass', function () {
    gulp.src('./assets/styles/app.scss')
        .pipe(concat('style.min.css'))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/styles'));
});

gulp.task('scripts', function() {
    gulp.src(['./assets/scripts/*.js'])
        .pipe(concat('script.min.js'))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(size({
            title: 'size of custom js'
        }))
        .pipe(gulp.dest('./public/scripts'));
});

gulp.task('images', function () {
    return gulp.src(['./assets/images/**', '!images/*.db'])
        .pipe(cache(imagemin({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true
        })))
        .pipe(size({
            title: 'size of images'
        }))
        .pipe(gulp.dest('./public/images'));
});

gulp.task('fonts', function() {
    gulp.src('./assets/fonts/**')
        .pipe(gulp.dest('./public/fonts/'));
});

gulp.task('vendor', function() {
    gulp.src('./assets/vendor/**')
        .pipe(gulp.dest('./public/vendor/'));
});

gulp.task('clean', function() {
    return gulp.src(['./public/css', './public/scripts', './public/images'], {read: false})
        .pipe(clean());
});

gulp.task('watch', function() {
    gulp.watch('./assets/scripts/*.js', ['scripts']);
    gulp.watch('./assets/css/*.css', ['css']);
    gulp.watch('./assets/styles/**', ['sass']);
    gulp.watch('./assets/images/**', ['images']);
    gulp.watch('./assets/fonts/**', ['fonts']);
    gulp.watch('./assets/vendor/**', ['vendor']);
});

gulp.task('default', ['clean'], function() {
    gulp.start('fonts', 'vendor', 'css', 'sass', 'scripts', 'images');
});