const path = require('path');
const fs = require('fs');
const gulp = require('gulp');
const run = require('../../../webpack.run.js');
const src = path.resolve(__dirname, 'src');

gulp.task('build', function(callback) {
    const files = fs.readdirSync(src)
        .filter(function(item) {
            return item.match(/\.html$/);
        })
        .map(function(item) {
            return item.replace(/\.html$/, '');
        });

    if (files.length > 0) {
        run.run(__dirname, files, callback);
    } else {
        throw new Error('No resources');
    }
});

gulp.task('default', ['build']);
gulp.task('dev', ['build']);
gulp.task('namie', ['build']);

gulp.task('watch', function() {
    gulp.watch(['src/**'], ['default'], function() {
        gulp.watch(['src/**'], ['default']);
    });
});
