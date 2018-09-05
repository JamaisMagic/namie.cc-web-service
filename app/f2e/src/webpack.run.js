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
let distRoot = buildConfig.dist_root;
let publicPathPrefix = buildConfig.public_path_prefix;
const ASSETS_COMMON = buildConfig.ASSETS_COMMON_NAME;
const isBuildForNamie = process.argv[2] === 'namie' || process.argv[3] === 'namie';

if (isBuildForNamie) {
    distRoot = buildConfig.dist_root_namie;
    publicPathPrefix = buildConfig.public_path_prefix_namie;
}

module.exports.run = (subjectProjectPath, sourceNames, callback) => {
    let src = path.resolve(subjectProjectPath, 'src');

    let myConfig = webpackConfig;
    myConfig.output.path = distRoot + subjectProjectPath.replace(buildConfig.srcRoot, '');
    myConfig.output.publicPath = publicPathPrefix + subjectProjectPath.replace(buildConfig.srcRoot, '') + '/';

    sourceNames.forEach(function (item) {
        myConfig.entry[item] = path.resolve(src, 'script', item + '.js');
    });

    if (process.argv[2] !== 'watch' && process.argv[2] !== 'dev') {
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

        const webpackAsset = JSON.parse(fs.readFileSync('./webpack-assets.json'));
        sourceNames.forEach(function (item, index) {
            gulp.src(src + '/' + item + '.html')
                .pipe(replace(/<% (commoncss|css|commoncsspath|csspath|commoncsscontent|csscontent|commonjsscript|jsscript|commonjspath|jspath|commonjscontent|jscontent) %>/g, (match) => {
                    let commoncsspath = webpackAsset[ASSETS_COMMON].css || '';
                    let csspath = webpackAsset[item].css || '';
                    let commonjspath = webpackAsset[ASSETS_COMMON].js || '';
                    let jspath = webpackAsset[item].js || '';
                    switch (match) {
                        case '<% commoncss %>':
                            return commoncsspath ? `<link rel="stylesheet" href="${commoncsspath}" />` : '';
                        case '<% css %>':
                            return csspath ? `<link rel="stylesheet" href="${csspath}" />` : '';
                        case '<% commoncsspath %>':
                            return commoncsspath;
                        case '<% csspath %>':
                            return csspath;
                        case '<% commoncsscontent %>':
                            return commoncsspath ? `<link rel="stylesheet" href="${path.relative(src, myConfig.output.path)}/${ASSETS_COMMON}.bundle.css" inline />` : '';
                        case '<% csscontent %>':
                            console.log(`${path.relative(src, myConfig.output.path)}/${ASSETS_COMMON}.bundle.css`);
                            return csspath ? `<link rel="stylesheet" href="${path.relative(src, myConfig.output.path)}/${item}.bundle.css" inline />` : '';

                        case '<% commonjsscript %>':
                            return commonjspath ? `<script src="${webpackAsset[ASSETS_COMMON].js}" type="text/javascript"></script>` : '';
                        case '<% jsscript %>':
                            return jspath ? `<script async src="${webpackAsset[item].js}" type="text/javascript"></script>` : '';
                        case '<% commonjspath %>':
                            return commonjspath;
                        case '<% jspath %>':
                            return jspath;
                        case '<% commonjscontent %>':
                            return commonjspath ? `<script src="${path.relative(src, myConfig.output.path)}/${ASSETS_COMMON}.bundle.js" inline></script>` : '';
                        case '<% jscontent %>':
                            return jspath ? `<script src="${path.relative(src, myConfig.output.path)}/${item}.bundle.js" inline></script>` : '';

                        default:
                            return match;
                    }
                }))

                .pipe(inlinesource())
                .pipe(htmlmin({collapseWhitespace: true}))
                .pipe(gulp.dest(myConfig.output.path))
                .pipe(gulp.dest(() => {
                    if (/\/m\/subject\/index/.test(subjectProjectPath) && !isBuildForNamie) {
                        return distRoot;
                    }
                    return myConfig.output.path;
                }))
                .on('end', function () {
                    if (index === sourceNames.length - 1) {
                        console.log('build ended start callback');
                        callback && callback();
                    }
                });
        });
    });
};
