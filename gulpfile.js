var gulp = require('gulp'), uglify= require('gulp-uglify'),
    concat = require('gulp-concat'), sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass-china'), rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    ngAnnotate = require('gulp-ng-annotate'), ngHtml2js = require('gulp-ng-html2js'),
    gulpSequence = require('gulp-sequence'), runSequence = require('run-sequence'),
    htmlmin = require('gulp-htmlmin');
    
// 设置为 true 则会生成 sourcemaps (JS/CSS)
var debug = false;

gulp.task('html', function(done){
    var rs = gulp.src(['Content/Phone/templates/*.html','Content/Phone/templates/Modal/*.html'])
        .pipe(htmlmin({
            removeComments: true
            // collapseWhitespace: true
        }))
        .pipe(ngHtml2js({ moduleName: 'template-bundle' }))
        .pipe(concat('template.bundle.js'))
        .pipe(uglify({ compress: true }))
        .pipe(gulp.dest('Content/Phone/js'))
        console.log('Output - Html compress ok!');
    return rs;
})
gulp.task('css', function(done){
    var rs = gulp.src(['Content/Phone/css/ionic.scss'])
        .pipe(sourcemaps.init({ loadMaps:true, largeFile: true }))
        .pipe(sass({ outputStyle:'compressed' }))
        .pipe(rename({ suffix:'.min' }))
        // Sourcemaps
        if(debug){
            rs.pipe(sourcemaps.write('.'))
            //, { addComment:false, includeContent: false, sourceRoot:'./ionic.scss' }
        }
    rs.pipe(gulp.dest('Content/Phone/css'));
    console.log('Output - CSS compress ok!');
    return rs;
})
gulp.task('js', function(done){
    var rs = gulp.src([
        'Content/Phone/js/template.bundle.js', 'Content/Phone/js/libs/angular-cookies.min.js',
        'Content/Phone/js/libs/ionic-datepicker.bundle.min.js', 'Content/Phone/js/libs/ion-gallery.js',
        'Content/Phone/js/app.js', 'Content/Phone/js/services.js', 'Content/Phone/js/services_common.js',
        'Content/Phone/js/controllers.js'
    ])
    .pipe(sourcemaps.init()) 
    .pipe(ngAnnotate()) // .pipe(ngmin({dynamic: false}))
    .pipe(uglify({ compress: false })) // mangle: false, 不混淆
    .pipe(concat('main.bundle.js'))
    // Sourcemaps
    if(debug){
        rs.pipe(sourcemaps.write({includeContent: false}));
    }
    rs.pipe(gulp.dest('Content/Phone/js'))
    console.log('Output - Js compress ok!');
    return rs;
})

// -- 执行输出 Bundle --
gulp.task('default', gulpSequence('html', 'css', 'js')); 

// -- 执行监听 Watch Bundle --
gulp.task('watch', function() {
    gulp.watch([
        'Content/Phone/templates/*.html', 'Content/Phone/css/*.scss', 'Content/Phone/js/libs/angular-cookies.min.js',
        'Content/Phone/js/libs/ionic-datepicker.bundle.min.js', 'Content/Phone/js/libs/ion-gallery.js',
        'Content/Phone/js/app.js', 'Content/Phone/js/services.js', 'Content/Phone/js/services_common.js',
        'Content/Phone/js/controllers.js'
    ], function(cb){
        var str = JSON.stringify(cb),
            str_html_exp = /.html"}/g, isChange_html = str_html_exp.test(str),
            str_css_exp = /.css"}/g, isChange_css = str_css_exp.test(str),
            str_js_exp = /.js"}/g, isChange_js = str_js_exp.test(str)
        ;
        if(isChange_html){ runSequence('html', 'js'); }
        if(isChange_css){ runSequence('css'); }
        if(isChange_js){ runSequence('js'); }
    });
});