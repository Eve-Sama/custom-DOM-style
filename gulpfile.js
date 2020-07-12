/** If I change the commonJS to ESModule, the terminal shows 'Cannot use import statement outside a module', idk how to fix it */
const { task, src, dest, watch, series, parallel } = require('gulp');
const plugins = require('gulp-load-plugins')();
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');

function copyAllFiles(cb) {
  src(['dev/**/*', '!dev/**/*.ts', '!dev/**/*.less']).pipe(dest('dist'));
  cb();
}

function tsc(cb) {
  src('dev/**/*.ts').pipe(tsProject()).pipe(dest('dist/'));
  cb();
}

// 对scss/less编译压缩，输出css文件
function css(cb) {
  src('dev/**/*.less')
    .pipe(plugins.less({ outputStyle: 'compressed' }))
    .pipe(
      plugins.autoprefixer({
        casecade: false,
        remove: false
      })
    )
    .pipe(dest('dist'));
  cb();
}

function watcher() {
  // It will watse resouce if execute copyAllFiles whenever .ts file change
  // watch('dev/', series([copyAllFiles, tsc]));
  watch('dev/', parallel([tsc, css]));
}

task('start', series([copyAllFiles, tsc, css, watcher]));

// It's unnesscery for me now, I'll use is when the project become very big
// require('./scripts/start');
