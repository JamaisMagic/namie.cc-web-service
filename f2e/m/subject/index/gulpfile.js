'use strict';
const path = require('path');
const fs = require('fs');
const gulp = require('gulp');
const buildConfig = require('../build_config.js');
const run = require('../webpack.run.js');
const src = path.resolve('.', 'src');
const projectName = buildConfig.project_path + __dirname.split(path.sep).pop();

gulp.task('build', function(callback) {
    var files = fs.readdirSync(src);
    files = files.filter(function(item) {
        return item.match(/\.html$/);
    });
    files = files.map(function(item) {
        return item.replace(/\.html$/, '');
    });
    if (files.length > 0) {
        run.run(src, files, callback);
    } else {
        throw new Error('No resources');
    }
});

gulp.task('default', ['build']);

gulp.task('watch', function() {
    gulp.watch(['src/**'], ['default'], function() {
        gulp.watch(['src/**'], ['default']);
    });
});
