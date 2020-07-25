/** If I change the commonJS to ESModule, the terminal shows 'Cannot use import statement outside a module', idk how to fix it */
const { task, src, dest, watch, series, parallel } = require('gulp');
const plugins = require('gulp-load-plugins')();
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');

// copy all useful files
function copy(cb) {
  src(['dev/**/*', '!dev/**/*.ts', '!dev/**/*.less']).pipe(plugins.newer('dist')).pipe(dest('dist'));
  cb();
}

// compile .less
function css(cb) {
  src('dev/**/*.less')
    .pipe(plugins.newer('dist'))
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

// compile .ts
function js(cb) {
  src('dev/**/*.ts').pipe(plugins.newer('dist')).pipe(tsProject()).pipe(dest('dist'));
  // .pipe(plugins.concat('content-script.ts'))
  cb();
  console.log('\033[42;30m DONE \033[40;32m Compiled successfully, enjoy coding~\033[0m');
}

function watcher(cb) {
  watch('dev/', parallel([css, js]));
  cb();
}

task('start', series([copy, css, js, watcher]));
task('copy', parallel([copy]));

// It's unnesscery for me now, I'll use is when the project become very big
// require('./scripts/start');
