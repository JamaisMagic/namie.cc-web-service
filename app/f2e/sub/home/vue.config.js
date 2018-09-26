const path = require('path');


module.exports = {
    lintOnSave: false,
    baseUrl: process.env.NODE_ENV === 'production'
        ? '/sub/home/dist/'
        : '/',
    devServer: {
        proxy: {
            '/api': {
                target: 'http://qa.www.namie.cc',
                ws: false,
                changeOrigin: true
            }
        }
    },
    configureWebpack: config => {
        return {
        };
    }
};
