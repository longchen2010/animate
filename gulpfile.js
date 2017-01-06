//npm install gulp -g 			先全局安装
//npm install gulp --save-dev 	安装到项目开发依赖
//npm install gulp-stylus --save-dev
//首先引入 gulp 模块
var gulp=require('gulp');
//引入 gulp-stylus 插件
var stylus = require('gulp-stylus');
//引入压缩 css 的文件
var minifycss =require('gulp-minify-css');
//gulp-uglify
var uglify = require('gulp-uglify');
var browserSync =require('browser-sync' ).create();
//var serverStart = browserSync.crate()
var reload = browserSync.reload;

var nodemon = require('gulp-nodemon');
gulp.task('nodemon',function(ab){
	var ft = false;
	return nodemon({
		script:'./server.js'
	} ).on('start',function(){
		if(!ft){
			ab();
			ft = true;
		}
	})
});

gulp.task('browserSync',['nodemon'],function(){
	browserSync.init({
		proxy:{
			target:'http://127.0.0.1:17520'
		},
		port:17520,
		open:false,
		files:['*']
	})
});

//创建一个编译 stylus 的任务
gulp.task('stylus',function(){
	//获取要编译的文件
	//指定一个文件
	//gulp.src('./stylus/index.styl')
	//指定多个文件
	//gulp.src(['./stylus/index.styl','./stylus/css.styl'])
	//指定一个目录下所有（不包括子目录）
	//gulp.src('./stylus/*.styl')
	//指定一个目录及所有子目录下的文件
	return gulp.src('./stylus/**/*.styl')
	//执行 stylus 编译
		.pipe(stylus())
	//输出编译后的文件
		.pipe(gulp.dest('./public/css'))
});



gulp.task('minifycss',['stylus'],function(){
	return gulp.src('./public/css/**/*.css')
		.pipe(minifycss())
		.pipe(gulp.dest('./public/mincss/'))
});


gulp.task('uglify',function(){
	return gulp.src('./public/js/**/*.js')
				.pipe(uglify())
				.pipe(gulp.dest('./public/minjs/'))
});

gulp.task('watcher',['stylus','uglify','browserSync','nodemon'],function(){

	gulp.watch('./stylus/**/*.styl',['stylus']);
	gulp.watch('./public/js/**/*.js',['uglify']);
	gulp.watch(['./public/css/**/*.css','./public/js/**/*.js']).on('change',function()
	{
		reload();
	})
})
