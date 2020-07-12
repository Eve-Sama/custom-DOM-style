/** If I change the commonJS to ESModule, the terminal shows 'Cannot use import statement outside a module', idk how to fix it */
const { task, src, dest, watch, series, parallel } = require('gulp');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');

function copyAllFiles(cb) {
  src(['dev/**/*', '!dev/**/*.ts']).pipe(dest('dist'));
  cb();
}

function tsc(cb) {
  src('dev/**/*.ts').pipe(tsProject()).pipe(dest('dist/'));
  cb();
}

function watcher() {
  watch('dev/', tsc);
}

// 真的需要每次 code 都 copyAllFiles 吗? 感觉这里可以有更好的办法, 比如当文件数量 change 的时候再拷贝
task('default', series([copyAllFiles, tsc, watcher]));
// task('default', series([fnTsc, watcher, copy]));
// task('default', parallel(['watch-files-change']));

/**
 * 思路:
 * 1. 将所有文件全部拷贝到 dist
 * 2. 将 ts 编译为 js 后, 删除ts
 * 3. 将 sass 编译为 css 后, 删除sass
 */
