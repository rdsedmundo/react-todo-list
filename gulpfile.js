// const babel = require('gulp-babel');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
// const concat = require('gulp-concat');
const gulp = require('gulp');
const livereload = require('gulp-livereload');
const notify = require('gulp-notify');
const source = require('vinyl-source-stream');

const path = {
  js: './src/**/*.jsx',
};

gulp.task('watch', ['build'], () => {
  livereload.listen();

  gulp.watch(path.js, ['build']);
});

gulp.task('build', () => {
  const options = {
    debug: true,
    entries: './src/app.js',
  };

  const modules = browserify(options)
                    .transform('babelify', {
                      presets: ['es2015', 'react'],
                    });

  modules.bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    // .pipe(concat('app.js'))
    .pipe(gulp.dest('./public/'))
    .pipe(livereload())
    .pipe(notify({
      message: '[Gulp] Build task finished',
    }));
});

gulp.task('default', ['watch']);
