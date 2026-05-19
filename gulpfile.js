const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const terser = require('gulp-terser');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const del = require('del');

const paths = {
  scss: {
    src: 'stylesheets/scss/**/*.scss',
    entry: 'stylesheets/scss/main.scss',
    dest: 'stylesheets/css/',
  },
  js: {
    src: 'js/main.js',
    dest: 'js/',
  },
  img: {
    src: 'img/**/*.{jpg,jpeg,png,gif,svg}',
    dest: 'img/',
  },
};

function clean() {
  return del(['stylesheets/css/*.css', 'stylesheets/css/*.map', 'js/*.min.js', 'js/*.min.js.map']);
}

function styles() {
  return src(paths.scss.entry)
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'expanded', silenceDeprecations: ['legacy-js-api'] }).on('error', sass.logError))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest(paths.scss.dest));
}

function scripts() {
  return src(paths.js.src, { allowEmpty: true })
    .pipe(sourcemaps.init())
    .pipe(terser())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest(paths.js.dest));
}

function images() {
  return src(paths.img.src, { allowEmpty: true })
    .pipe(imagemin({ verbose: true }))
    .pipe(dest(paths.img.dest));
}

function dev() {
  watch(paths.scss.src, styles);
  watch(paths.js.src, scripts);
}

const build = series(clean, parallel(styles, scripts, images));

exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.clean = clean;
exports.build = build;
exports.default = series(build, dev);
