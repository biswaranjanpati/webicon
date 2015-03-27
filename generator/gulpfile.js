
var gulp = require('gulp');
var jade = require('gulp-jade');
var path = require('path');
var fs = require('fs');
var yargs = require('yargs');
var argv = yargs.argv;

var getDist = function() {
  return argv.dist || '..';
};
var isWatch = function() {
  return typeof argv.watch == 'undefined' || argv.watch
};

gulp.task('build', function() {

  function readDemoFile(demoName, fileName) {
    try {
      return fs.readFileSync(path.join('demos', demoName, fileName));
    }
    catch(e) {
      return ''
    }
  }

  function readDemoFileDecorator(fileName) {
    return function(demoName) {
      return readDemoFile(demoName, fileName);
    }
  }

  return gulp.src(['template/**/*.jade', '!template/**/_*.jade'])
    .pipe(jade({
      locals: {
        jqDemo: readDemoFileDecorator('jq-demo.html'),
        jqExample: readDemoFileDecorator('jq-example.html'),
        ngDemo: readDemoFileDecorator('ng-demo.html'),
        ngExample: readDemoFileDecorator('ng-example.html')
      }
    }))
    .pipe(gulp.dest(getDist()))
    ;

});

gulp.task('default', ['build'], function() {
  if (isWatch()) {
    gulp.watch(['template/**', 'demos/**'], ['build']);
  }
});
