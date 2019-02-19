import gulp from 'gulp';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import babel from 'gulp-babel';
import eslint from 'gulp-eslint';
import {Server} from 'karma';

function babelStream() {
    return babel({
        presets: [
            'es2015',
            'babili'
        ]
    })
}

gulp.task('test-watch', ['lint'], (done) => {
    return new Server({
      configFile: process.cwd() + '/karma.conf.js'
    }, done).start();
  });

gulp.task('test', ['lint'], () => {
  return new Server({
    configFile: process.cwd() + '/karma.conf.js',
    singleRun: true
  }).start();
});

gulp.task('lint', () => {
    return gulp.src([
        'src/**/*.js',
        '!**/*_test.js'
    ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
})

gulp.task('build', ['lint'], () => {
    return gulp.src([
        'src/**/*.js',
        '!dist/bower_components/**/*'
    ])
    .pipe(babelStream())
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist'));
});