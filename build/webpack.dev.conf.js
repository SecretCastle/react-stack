'use strict'

const webpack = require('webpack');
const merge = require('webpack-merge');
const basicWebpackConfig = require('./webpack.base.conf');
const Config = require('../config');

const devWebpackConfig = merge(basicWebpackConfig, {
    mode: 'development',
    devServer: {
        hot: true
    },
    // https://webpack.docschina.org/configuration/devtool/
    devtool: Config.dev.devtool,
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
});

devWebpackConfig.output.path = Config.dev.assetsRoute;
devWebpackConfig.output.publicPath = Config.dev.publicPath;

module.exports = devWebpackConfig
