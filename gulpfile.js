
var gulp          = require('gulp'),
    sass          = require('gulp-sass'),
    concat        = require('gulp-concat'),
    pug           = require('gulp-pug'),
    autoprefixer  = require('gulp-autoprefixer')
    cssnano       = require('gulp-cssnano'),
    imagemin      = require('gulp-imagemin'),
    uglify        = require('gulp-uglify'),
    plumber       = require('gulp-plumber'),
    juice         = require('gulp-juice-concat'),
    browserSync   = require('browser-sync').create();

// Static Server + watching scss/pug/JS/html files
gulp.task('serve', ['sass'], function() {  
      browserSync.init({
          server: "./dist"
      });
       
      gulp.watch('./dev/scss/*.scss', ['sass']);
      gulp.watch("./dist/*.html").on('change', browserSync.reload);  
  });

// compile sass files to css files

gulp.task('sass', function () {
  return gulp.src('./dev/scss/**/*.scss')
    .pipe(concat('styles.scss'))
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({browsers: ['last 2 versions']}))
    .pipe(cssnano())
    .pipe(gulp.dest('./dist/css/'))
    .pipe(browserSync.stream());
});

// combine and concat javascript

gulp.task('scripts', function(){
  return gulp.src('./dev/js/*.js')
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.stream());
});

// convert pug to html

gulp.task('pug', function buildHTML() {
  return gulp.src('./dev/pug/**/*.pug')
    .pipe(pug({pretty:false,}))
    .pipe(juice({}))
    .pipe(gulp.dest('dist/'));
});

// compressed images, this task is executed by completing your webpage completely and uploading the compressed images

gulp.task('imagemin', () =>
  gulp.src('./dev/img/*')
      .pipe(imagemin())
      .pipe(gulp.dest('dist/images'))
  );

// watch all the files

gulp.task('watch', function(){
  gulp.watch('./dev/js/*.js', ['scripts']);
  gulp.watch('./dev/scss/*.scss', ['sass']);
  gulp.watch('./dev/pug/**/*.pug', ['pug']);
});

//gulp by default 

gulp.task('default', ['serve', 'watch']);
