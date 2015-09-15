var gulp = require('gulp');
var del = require('del');

const paths = {
	distFile: 'dist'
};

gulp.task('clean', () => {
	del(paths.distFile);
});

gulp.task('default', ['clean'], () => {
//	gulp.start();
});
