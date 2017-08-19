'use strict';

const gulp = require('gulp'),
 pug = require('gulp-pug'),
 sass = require('gulp-sass'),
 prefixer = require('gulp-autoprefixer'), 
 watch = require('gulp-watch'),
 useref = require('gulp-useref'),
 uglify = require('gulp-uglify'),
 imagemin = require('gulp-imagemin'),
 pngquant = require('imagemin-pngquant'),
 sourcemaps = require('gulp-sourcemaps'),
 del = require('del'), 
 browserSync = require("browser-sync"),
 reload = browserSync.reload;


let path = {
    build: { 
        html: 'build/',
        styles: 'build/css',
        js: 'build/js/',
        img: 'build/img/',
    },
    src: { 
        pug: 'src/*.pug',
        styles: 'src/assets/sass/*.sass',
        js: 'src/assets/js/*.js',
        img: 'src/assets/img/**/*.*', 
    },
    watch: { 
        pug: 'src/*.pug',
        styles: 'src/assets/sass/*.sass',
        js: 'src/assets/js/*.js',
        img: 'src/assets/img/**/*.*',
    },
    clean: './build'
};    




gulp.task('pug', function () {
    gulp.src(path.src.pug) 
        .pipe(pug({
            pretty: true
        }))
        .pipe(useref())        
        .pipe(gulp.dest(path.build.html)) 
    	.pipe(browserSync.reload({stream: true}))
});
gulp.task('sass', function(){
	gulp.src(path.src.styles)
    	.pipe(sass()) 
    	.pipe(prefixer())
    	.pipe(gulp.dest(path.build.styles))
    	.pipe(browserSync.reload({stream: true}))
});
gulp.task('js', function () {
    gulp.src(path.src.js) 
        .pipe(sourcemaps.init()) 
        .pipe(uglify()) 
        .pipe(sourcemaps.write()) 
        .pipe(gulp.dest(path.build.js)) 
        .pipe(browserSync.reload({stream: true})); 
});
gulp.task('image', function () {
    gulp.src(path.src.img) 
        .pipe(imagemin({ 
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img)) 
        .pipe(reload({stream: true}));
});


var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 3000,
    logPrefix: "GO!GO!GO!"
};


 gulp.task('server', function () {
    browserSync(config);
});


gulp.task('build', ['pug', 'js', 'sass', 'image']);


gulp.task('watch', function(){
    watch([path.watch.pug], function(event, cb) {
        gulp.start('pug');
    }),
    watch([path.watch.styles], function(event, cb) {
        gulp.start('sass');
    }),
    watch([path.watch.js], function(event, cb) {
        gulp.start('js');
    });
});

gulp.task('clean', function() {
  return del.sync('build');
})



gulp.task('start', ['clean', 'build', 'server', 'watch']);
