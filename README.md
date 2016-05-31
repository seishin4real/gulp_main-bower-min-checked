main-bower-min-checked
===============

Made to be used with Gulp. Get bower main files as default (defined in 'main') or minified file names array.
If no minified version is found for some files, they will be created.

It uses [main-bower-files](https://www.npmjs.com/package/main-bower-files) to list bower dependencies, [gulp-rename](https://www.npmjs.com/package/gulp-rename) and [gulp-uglify](https://www.npmjs.com/package/gulp-uglify) to create missing minified files.

## Installation

```
  npm install --save-dev main-bower-min-checked
```

## Example

```js
var bower_files = require('main-bower-min-checked');
var inject = require('gulp-inject');

var main_bower_files_options = {
  includeDev: false,
  paths: {
    bowerDirectory: './lib',
    bowerJson: 'bower.json'
  }
};

var uglify_options = {
  preserveComments: 'all'
};
```

```js
gulp.src('./index.html')
  .pipe(
    inject(
      gulp.src(
        bower_files(main_bower_files_options).getDefault(), 
        {read: false}
      )
    )
  )
  .pipe(gulp.dest('./'));
```

```js
gulp.src('./index.html')
  .pipe(
    inject(
      gulp.src(
        bower_files(main_bower_files_options).getMinified(uglify_options), 
        {read: false}
      )
    )
  )
  .pipe(gulp.dest('./'));
```