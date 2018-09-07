'use strict'

/**
 * @author SecretCastle
 * @email henrychen9314@gmail.com
 * @create date 2018-09-01 11:42:58
 * @modify date 2018-09-01 11:42:58
 * @desc [description]
*/

const path = require('path');
const Config = require('../config');
const glob = require('glob');
const htmlWebpackPlugin = require('html-webpack-plugin');


// 获取entry
module.exports.getEntry = () => {
    return Config.singlePage
        ? getSpaEntry()
        : getEntry()
}

// spa entry
const getSpaEntry = () => {
    return Config.enableHotReload 
        ? [
            'babel-polyfill',
            Config.getEntry(),
            'webpack-hot-middleware/client?reload=true'
        ]
        : [
            'babel-polyfill',
            Config.getEntry(),
        ]

}

// 
const getEntry = () => {
    const map = {};
    const entryFiles = glob.sync(Config.getEntry(), { matchBase: true });
    for (let i = 0; i < entryFiles.length; i++) {
        const filename = entryFiles[i].substring(
          entryFiles[i].indexOf('views/') + 6,
          entryFiles[i].lastIndexOf('/')
        )
        map[filename] = Config.enableHotReload
          ? [
                'babel-polyfill',
                entryFiles[i],
                'webpack-hot-middleware/client?reload=true'
            ]
          : 
            [
                'babel-polyfill',
                entryFiles[i]
            ]
    }
    
    return map
}

// 增加webpack html plugin插件
module.exports.addHtmlWebpackPlugin = (webpackConfig) => {
    const htmlPlugins = Config.singlePage
        ? createSpaHtmlPlugin()
        : createMultiHtmlPlugin();
    for(let index = 0; index < htmlPlugins.length; index++) {
        webpackConfig.plugins.push(htmlPlugins[index]);
    }
    return webpackConfig;
}


const createSpaHtmlPlugin = () => {
    return [
        new htmlWebpackPlugin({
            title: Config.title,
            template: path.resolve(__dirname, '../src/views/index.html'),
            minify: true
        })
    ]       
}

const createMultiHtmlPlugin = () => {
    const plugins = [];
    const entryFiles = glob.sync('./src/views/**/*.html', { matchBase: true });
    for(let i = 0; i < entryFiles.length; i++) {
        const filename = entryFiles[i].substring(
            entryFiles[i].indexOf('views/') + 6,
            entryFiles[i].lastIndexOf('/')
        )
        const filePath = entryFiles[i].substring(
            entryFiles[i].indexOf('views/') + 6,
            entryFiles[i].lastIndexOf('.')
        )
        plugins.push(
            new htmlWebpackPlugin({
                title: Config.title,
                template: path.resolve(__dirname,  `../src/views/${filePath}.html`),
                filename: path.posix.join('', `${filename}.html`),
                chunks: ['vendor', filename],
                inject: true,
                minify: true
            })
        )
    }
    return plugins;
}
