const path = require('path');
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;


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
            plugins: [
                new PrerenderSPAPlugin({
                    // Required - The path to the webpack-outputted app to prerender.
                    staticDir: path.join(__dirname, '..', '..'),
                    indexPath: path.join(__dirname, './dist', 'index.html'),
                    // Required - Routes to render.
                    routes: ['/'],
                    outputDir: path.join(__dirname, 'dist'),
                    renderer: new Renderer({
                        // Optional - Wait to render until the specified event is dispatched on the document.
                        // eg, with `document.dispatchEvent(new Event('custom-render-trigger'))`
                        // renderAfterDocumentEvent: 'prerender-event',
                        //
                        // Optional - Wait to render until the specified element is detected using `document.querySelector`
                        renderAfterElementExists: '#app',
                        headless: true
                    })
                })
            ]
        };
    }
};
