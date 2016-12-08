// Include Gulp
var gulp = require('gulp');

// Include plug-ins
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// Concatenate and Minify JS files
gulp.task('scripts', function(){
	return gulp.src('src/js/*.js')
		.pipe(concat('main.js'))
			.pipe(rename({suffix: '.min'}))
			.pipe(uglify())
			.pipe(gulp.dest('build/js'));
});

// Precompress CSS
/*SASS*/
var sass = require('gulp-ruby-sass');
 gulp.task('sass', function() {
    return sass('src/scss/style.scss', {style: 'compressed'})
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('build/css'));
});

/*LESS*/
var less = require('gulp-less');
var path = require('path');
var cssnano = require('gulp-cssnano');

gulp.task('less', function () {
  return gulp.src('src/less/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('src/css'))
    .pipe(cssnano())
    .pipe(gulp.dest('build/css'));
});


/* Minify CSS
gulp.task('cssmin', function () {
  return gulp.src('src/css/*.css')
    .pipe(cssnano())
    .pipe(gulp.dest('build/css'));
});
*/

// Image Optimisation
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
 gulp.task('images', function() {
  return gulp.src('src/img/*')
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('build/img'));
});

// JSHint
const jshint = require('gulp-jshint');
gulp.task('lint', function() {
  return gulp.src('./src/js/*.js')
    .pipe(jshint());
});

// Watch for changes
gulp.task('watch', function() {
   // Watch .js files
  gulp.watch('src/js/*.js', ['scripts']);
   // Watch .scss files
  gulp.watch('src/scss/*.scss', ['sass']);
   // Watch image files
  gulp.watch('src/images/**/*', ['images']);
 });

//LiveReload
var livereload = require('gulp-livereload');

gulp.task('live', function() {
  livereload.listen();
  gulp.watch('less/*.less', ['less']);
});

// Default task
gulp.task('default', ['scripts','images','less','lint']);