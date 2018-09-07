'use strict'

/**
 * @author SecretCastle
 * @email henrychen9314@gmail.com
 * @create date 2018-09-04 09:11:18
 * @modify date 2018-09-04 09:11:18
 * @desc global config file
*/
const path = require('path');

module.exports = {
    contentPath: path.resolve(__dirname, '../'),
    title: 'maron-cli',
    singlePage: true,
    enableHotReload: true,
    getEntry() {
        return this.singlePage ? './src/views/index.js' : './src/views/**/*.js'
    },
    proxyurl: 'http://mhtest.fogcloud.io',
    dev: {
        assetsRoute: path.resolve(__dirname, '../dist'),
        publicPath: '/',
        port: 8081,
        host: 'localhost',
        devtool: 'cheap-module-eval-source-map'
    },
    build: {
        assetsRoute: path.resolve(__dirname, '../dist'),
        publicPath: '/',
        // 开启gizp压缩
        gzipCompression: false,
        // 开启webpack打包分析插件
        bundleAnalyzer: false,
        devtool: 'cheap-source-map'
    }
}
