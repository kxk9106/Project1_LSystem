
var gulp=require('gulp'),
    uglify=require('gulp-uglify'),
    rename=require('gulp-rename'),
    babel=require('gulp-babel'),
    notify=require('gulp-notify')

gulp.task('js',function(){
	gulp.src('./js/**.js')
		.pipe(babel({presets:['es2015']}))
		.pipe(uglify())
		.pipe(rename(function(path){
		   path.basename += '.min'
		 })
		)
		.pipe(gulp.dest('./dist'))
		.pipe(
		  notify({
		    message: 'Build has been completed',
		    onLast:true
		   })
		)
})

gulp.task('watch',function(){
   gulp.watch( './js/**.js',function(){
   	gulp.run('js')
   })
})
