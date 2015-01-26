// ====================================================
// Variables
// ====================================================

// Gulp
var gulp 				= require("gulp");

// Error reporting 
var beep 				= require('beepbeep');
var gutil 			= require('gulp-util');
var plumber 		= require('gulp-plumber');

// Javascript Minification
// Error Reporting
var uglify 			= require("gulp-uglify");

// Sass
var sass 				= require("gulp-sass");
var sourcemaps 	= require('gulp-sourcemaps');
var autoprefix	= require("gulp-autoprefixer");

// Browser Sync 
var browserSync = require("browser-sync");

// Error Reporting function
var onError = function (err) {
	beep([0, 0, 0]);
	gutil.log(gutil.colors.green(err));
};


// Browser Sync Config
var config = {
	files: ["dist/**/*.php"],
	proxy: "http://underbelly.dev/dist"
};



// ====================================================
// Gulp Tasks
// ====================================================

// Browser Sync
gulp.task('browser-sync', function() {
    browserSync(config);
});

// Javascript
gulp.task('compress:js', function() {
	 return gulp.src("src/js/script.js")
	 	.pipe(plumber({ errorHandler: onError }))
		.pipe(uglify({mangle: false}))
		.pipe(gulp.dest('dist/js/'))
 });


// Compile SASS
gulp.task("sass", function () {

	return gulp.src('src/sass/**/*.scss')
		.pipe(sass({
			errLogToConsole: true
		}))
		//.pipe(plumber({errorHandler: onError}))
		.pipe(autoprefix({browsers: ['last 2 versions']}))
		.pipe(gulp.dest("dist/css/"))
		.pipe(browserSync.reload({stream: true}));
});

// Default Task
gulp.task('default', ['sass', 'browser-sync', 'compress:js'], function(){
	gulp.watch( "src/sass/**/*.scss", ['sass']);
	gulp.watch("src/js/**/*.js", ['compress:js', browserSync.reload]);
})