const path = require('path');

const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

const nib = require('nib');

const buildConfig = require('./build_config.js');

module.exports = {
    entry: {},
    output: {
        path: '',
        publicPath: '',
        filename: '[name].bundle.js?hash=[chunkhash:10]'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            loaders: {
                                js: {
                                    loader: 'babel-loader',
                                    options: {
                                        presets: [
                                            ['env', {
                                                targets: {
                                                    "browsers": ["last 2 versions"]
                                                }
                                            }]
                                        ],
                                        plugins: ["transform-runtime"]
                                    }
                                },
                                babel: {
                                    loader: 'babel-loader',
                                    options: {
                                        presets: [
                                            ['env', {
                                                targets: {
                                                    "browsers": ["last 2 versions"]
                                                }
                                            }]
                                        ],
                                        plugins: ["transform-runtime"]
                                    }
                                },
                                stylus: ExtractTextPlugin.extract({
                                    fallback: "vue-style-loader",
                                    use: [
                                        {
                                            loader: 'css-loader',
                                            options: {
                                                minimize: true
                                            }
                                        },
                                        'stylus-loader'
                                    ]
                                }),
                                styl: ExtractTextPlugin.extract({
                                    fallback: "vue-style-loader",
                                    use: [
                                        {
                                            loader: 'css-loader',
                                            options: {
                                                minimize: true
                                            }
                                        },
                                        'stylus-loader'
                                    ]
                                }),
                                css: ExtractTextPlugin.extract({
                                    fallback: "vue-style-loader",
                                    use: [
                                        {
                                            loader: 'css-loader',
                                            options: {
                                                minimize: true
                                            }
                                        }
                                    ]
                                })
                            }
                        }
                    }
                ]
            },
            {
                test: /\.styl$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true
                            }
                        },
                        'stylus-loader'
                    ]
                })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true
                            }
                        }
                    ]
                })
            },
            {
                test: /\.html$/,
                use: [
                    'raw-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['env', {
                                    targets: {
                                        "browsers": ["last 2 versions"]
                                    }
                                }]
                            ],
                            plugins: ["transform-runtime"]
                        }
                    }
                ]
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 4000,
                            name: 'img/[name].[ext]?hash=[hash:10]'
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.json', '.vue'],
        modules: [
            path.join(__dirname, "src"),
            "node_modules",
            "web_modules"
        ],
        alias: {vue: 'vue/dist/vue.min.js'}
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                stylus: {
                    use: [nib()],
                    import: ['~nib/lib/nib/index.styl'],
                    "include css": true
                }
            }
        }),
        new AssetsPlugin(),
        new ExtractTextPlugin('[name].bundle.css?hash=[contenthash:10]'),
        new CommonsChunkPlugin({
            name: buildConfig.ASSETS_COMMON_NAME,
            filename: buildConfig.ASSETS_COMMON_NAME + '.bundle.js?hash=[hash:10]'
        }),
        //new webpack.optimize.UglifyJsPlugin({
        //    sourceMap: true,
        //    compress: {
        //        warnings: false
        //    },
        //    output: {
        //        comments: false
        //    }
        //}),
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify('production')
            }
        })
    ]
};
