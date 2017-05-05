const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const gulp = require('gulp');
const gutil = require('gulp-util');
const replace = require('gulp-replace');
const htmlmin = require('gulp-htmlmin');
const inlinesource = require('gulp-inline-source');
const webpackConfig = require('./webpack.config.js');
const buildConfig = require('./build_config.js');
const distRoot = buildConfig.dist_root;
const ASSETS_COMMON = buildConfig.ASSETS_COMMON_NAME;


module.exports.run =  (src, sourceNames, callback) => {
    let pathArr = [];
    pathArr = src.split(path.sep);
    const projectName = buildConfig.project_path + pathArr[pathArr.length-2];

    var myConfig = Object.create(webpackConfig);
    myConfig.output.path = distRoot + projectName;
    myConfig.output.publicPath = buildConfig.public_path_prefix + projectName + '/';

    sourceNames.forEach(function(item) {
        if (fs.existsSync(src + '/script/' + item + '.js')) {
            myConfig.entry[item] = src + '/script/' + item + '.js';
        }
    });

    if(process.argv[2] != 'watch'){
        myConfig.plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: true,
                compress: {
                    warnings: false
                },
                output: {
                    comments: false
                }
            })
        )
    }
    webpack(myConfig, function (err, stats) {
        if (err) throw new gutil.PluginError('webpack', err);
        gutil.log('[webpack]', stats.toString({
            progress: true,
            colors: true,
            chunks: false
        }));

        var webpackAsset = JSON.parse(fs.readFileSync('./webpack-assets.json'));
        var commonCssExists = !!webpackAsset[ASSETS_COMMON].css;
        var commonJsExists = !!webpackAsset[ASSETS_COMMON].js;
        sourceNames.forEach(function(item, index) {
            var itemCssExists = !!webpackAsset[item].css;
            var itemJsExists = !!webpackAsset[item].js;
            gulp.src(src + '/' + item + '.html')
                .pipe(replace(/<% commoncss %>/g, commonCssExists ? '<link rel="stylesheet" href="' + webpackAsset[ASSETS_COMMON].css + '" />' : ''))
                .pipe(replace(/<% css %>/g, itemCssExists ? '<link rel="stylesheet" href="' + webpackAsset[item].css + '" />' : ''))

                .pipe(replace(/<% commoncsspath %>/g, webpackAsset[ASSETS_COMMON].css || ''))
                .pipe(replace(/<% csspath %>/g, webpackAsset[item].css || ''))

                .pipe(replace(/<% commoncsscontent %>/g, commonCssExists ? '<link rel="stylesheet" href="' + myConfig.output.path + `/${ASSETS_COMMON}.bundle.css` + '" inline />' : ''))
                .pipe(replace(/<% csscontent %>/g, itemJsExists ? '<link rel="stylesheet" href="' + myConfig.output.path + '/' + item + '.bundle.css' + '" inline />' : ''))

                .pipe(replace(/<% commonjsscript %>/g, commonJsExists ? '<script src="' + webpackAsset[ASSETS_COMMON].js + '" type="text/javascript"></script>' : ''))
                .pipe(replace(/<% jsscript %>/g, itemJsExists ? '<script async src="' + webpackAsset[item].js + '" type="text/javascript"></script>' : ''))

                .pipe(replace(/<% commonjspath %>/g, webpackAsset[ASSETS_COMMON].js || ''))
                .pipe(replace(/<% jspath %>/g, webpackAsset[item].js || ''))

                .pipe(replace(/<% commonjscontent %>/g, commonJsExists ? '<script src="' + myConfig.output.path + '/' + `${ASSETS_COMMON}.bundle.js` + '" inline></script>' : ''))
                .pipe(replace(/<% jscontent %>/g, itemJsExists ? '<script src="' + myConfig.output.path + '/' + item + '.bundle.js' + '" inline></script>' : ''))

                .pipe(inlinesource())
                .pipe(htmlmin({collapseWhitespace: true}))
                .pipe(gulp.dest(myConfig.output.path))
                .on('end', function() {
                    if (index == sourceNames.length - 1) {
                        console.log('build ended start callback');
                        callback && callback();
                    }
                });
        });
    });
};
