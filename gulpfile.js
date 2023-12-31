'use strict'

const gulp = require('gulp')
const pug = require('gulp-pug')
const sass = require('gulp-sass')
const minifyCss = require('gulp-minify-css')
const autoprefixer = require('gulp-autoprefixer')
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')
const rename = require('gulp-rename')
const imagemin = require('gulp-imagemin')
const mozjpeg = require('imagemin-mozjpeg')
const pngquant = require('imagemin-pngquant')
const gulpWebp = require('gulp-webp')
const error_handler = { errorHandler: notify.onError("Error: <%= error.message %>") }

const webpackStream = require('webpack-stream')
const webpack = require('webpack')
const webpackConfig = require('./webpack.config')

function html() {
  return gulp.src('./app/src/pug/**/**/*.pug')
    .pipe(plumber(error_handler))
    .pipe(pug())
    .pipe(gulp.dest('./app/dist/'))
}

function scss() {
  return gulp.src('./app/src/scss/style.scss', { sourcemaps: true })
    .pipe(plumber(error_handler))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(['last 2 versions', 'ie >= 10', 'Android >= 4', 'iOS >= 8']))
    .pipe(gulp.dest('app/dist/', { sourcemaps: 'map' }))
    .pipe(minifyCss())
    .pipe(rename({
      suffix: '.min',
    }))
    .pipe(gulp.dest('./app/dist/'));
}

function js() {
  return gulp.src('./app/src/js/*.js')
    .pipe(plumber())
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest('./app/dist/js/'));
}

function imageMin() {
  return gulp
    .src('./app/src/img/**/*.{jpg,jpeg,png,gif,svg}', {
      since: gulp.lastRun(imageMin)
    })
    .pipe(imagemin(
      [
        pngquant({ quality: [.2, .7], speed: 1 }),
        mozjpeg({ quality: 70 }),
        imagemin.svgo(),
        imagemin.gifsicle()
      ], {
      verbose: true
    }
    ))
    .pipe(gulp.dest('./app/dist/img'));
}

const imageGlobs = [
  './app/src/img/*.{png,jpg,gif}',
  './app/src/img/**/*.{png,jpg,gif}',
  './app/src/img/**/**/*.{png,jpg,gif}'
]

function convertWebp() {
  return gulp
    .src(imageGlobs, {
      allowEmpty: true,
      since: gulp.lastRun(convertWebp)
    })
    .pipe(rename((path) => {
      path.basename += path.extname
    }))
    .pipe(gulpWebp())
    .pipe(gulp.dest('./app/dist/img'))
}

function watcher() {
  gulp.watch('./app/src/pug/**/*.pug', gulp.parallel(html)).on('change', function () { });
  gulp.watch('./app/src/scss/**/*.scss', gulp.parallel(scss)).on('change', function () { });
  gulp.watch('./app/src/js/*.js', gulp.parallel(js)).on('change', function () { });
  gulp.watch('./app/src/img/**/*.{jpg,jpeg,png,gif,svg}', gulp.series(imageMin, convertWebp)).on('change', function () { });
}

exports.convertImage = gulp.series(imageMin, convertWebp)
exports.build = gulp.series(gulp.parallel(html), gulp.parallel(scss), gulp.series(imageMin, convertWebp))
exports.default = watcher
