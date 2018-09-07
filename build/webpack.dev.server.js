'use strict'

const express = require('express');
const webpack = require('webpack');
const app = express();
const router = express.Router();
const path = require('path');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackBaseConfig = require('./webpack.dev.conf');
const merge = require('webpack-merge');
const Config = require('../config');
const proxy = require('./proxy');
const compression = require('compression');

// 配置项
const proxyUrl = Config.proxyurl;
const PORT = Config.dev.port;
const HOST = Config.dev.host;
const compiler = webpack(
    merge(webpackBaseConfig, {
        mode: 'development'
    })
);

// wepback-dev-server
const devMiddleware = webpackDevMiddleware(compiler, {
    quiet: false,
    stats: {
        colors: true,
        chunks: false
    }
});

app.use(compression());
app.use(devMiddleware);
app.use(webpackHotMiddleware(compiler));

// proxy
app.use(router);
app.use('/', proxy(proxyUrl));

// favicon
router.get('/favicon.ico', (req, res, next) => {
    res.end();
})

// 默认路径
router.get('/', (req, res, next) => {
    sendFile(path.resolve(__dirname, '../src/views/index.html'), res, next, false);
});

const sendFile = (viewname, response, next, isJSON) => {
    console.log('sendFile', viewname);
    compiler.outputFileSystem.readFile(viewname, (err, result) => {
        if (err) {
            response.status(404).send('404');
            return;
        }
        response.set('content-type', isJSON ? 'application/json': 'text/html');
        response.send(result);
        response.end();
    });
}

module.exports = app.listen(PORT, (err) => {
    if (err) {
        return;
    }
    console.log(`server start at http://${HOST}:${PORT}`);
});
