const gulp = require('gulp');
const imagemin = require('gulp-imagemin');

// Rutas archivos
let paths = {
	images:{
		// watch : ['dev/assets/**/*.png','dev/assets/**/*.jpg','dev/assets/**/*.gif','dev/assets/**/*.jpeg'], 
		src: 'img/*.+(png|jpg|gif)',
		watch : 'img/*.+(png|jpg|gif)',
		dest  : 'optimized/' //se guardan en optimized/
	}
};

/*
 * `gulp images` - Run lossless compression on all the images.
 */
function imgCompress() {
	return gulp.src(paths.images.src) // e.g. /assets/images
	  .pipe(imagemin({
		progressive: true,
		interlaced: true,
		svgoPlugins: [{removeUnknownsAndDefaults: false}, {cleanupIDs: false}]
	  }))
	  .pipe(gulp.dest(paths.images.dest)); // e.g. /static/dist/
}

gulp.task("imgCompress", imgCompress);

//mirar cambios
gulp.task("watch", () => {
	gulp.watch(paths.images.watch, imgCompress);
});

gulp.task("default",gulp.series("imgCompress","watch"));