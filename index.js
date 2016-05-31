var mainBowerFiles = require('main-bower-files'),
  fs = require('fs'),
  uglify = require('gulp-uglify'),
  gulp = require('gulp'),
  rename = require('gulp-rename');

module.exports = function (options) {

  var rxMin = new RegExp('^(.+)(\-|\.)min\.(js|css)$'),
    rxFileParts = new RegExp('^(.+)\.(js|css)$');

  function getDefault(){
    return mainBowerFiles(options);
  }

  function getMinified(uglifyOptions){
    var files = getDefault();

    var minified = files.map(function (orgFilename) {
      if(rxMin.test(orgFilename)){
        return orgFilename;
      }

      var minFilename = orgFilename.replace(rxFileParts, '$1-min.$2');
      if (fs.existsSync(minFilename)) {
        return minFilename;
      }

      minFilename = orgFilename.replace(rxFileParts, '$1.min.$2');
      if (fs.existsSync(minFilename)) {
        return minFilename;
      }else {
        gulp.src(orgFilename)
          .pipe(uglify(uglifyOptions))
          .pipe(rename(function (path) {
            path.extname = ".min" + path.extname;
          }))
          .pipe(gulp.dest(function (file) { 
            return file.base;
          }));

        return minFilename;
      }
    });

    return minified;

  }
  return {
    getDefault: getDefault,
    getMinified: getMinified
  };
};