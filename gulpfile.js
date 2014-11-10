var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	compass = require('gulp-compass'),
	minifyCSS = require('gulp-minify-css'),
	imagemin = require('gulp-imagemin'),
	plumber = require('gulp-plumber'),
	concat = require('gulp-concat'),
	glob = require("glob"),
	uncss = require('gulp-uncss'),
	livereload = require('gulp-livereload'),
	checkCSS = require( 'gulp-check-unused-css' ),
	critical = require('critical');

gulp.task('styles', function() {
	gulp.src('assets/devel/sass/style.scss')
	    .pipe(plumber({
	      errorHandler: function (error) {
	        console.log(error.message);
	        this.emit('end');
	    }}))
	    .pipe(compass({
	      css: 'assets/build/css',
	      sass: 'assets/devel/sass'
	    }))
	    .on('error', function(err) {
	      // Would like to catch the error here
	    })
	    .pipe(minifyCSS())
	    .pipe(gulp.dest('assets/build/css'))
		.pipe(livereload());
});

gulp.task('image', function() {
	gulp.src('assets/devel/images/**/*')
		.pipe(imagemin())
		.pipe(gulp.dest('assets/build/img'));
});

gulp.task('unusecss', function() {
    // gulp.src('assets/bulid/css/style.css')
    //     .pipe(uncss({
    //         html: glob.sync('assets/devel/html/*.html')
    //     }))
    //     .pipe(gulp.dest('assets/devel/uncss'));
    // gulp
	   //  .src([ 'assets/bulidcss/css/style.css', 'assets/devel/html/*.html' ])
	   //  .pipe( checkCSS() );

	critical.generateInline({
	    base: 'assets/devel/html',
	    src: 'home.html',
	    width: 320,
	    height: 480,
	    htmlTarget: 'home.html',
	    styleTarget: 'assets/build/css/style.css',
	    minify: true
	});
});

gulp.task('watch', function(){

	var server = livereload();

	gulp.watch('assets/devel/sass/**/*.scss', ['styles']);
});

gulp.task('default', ['styles', 'image', 'watch']);
