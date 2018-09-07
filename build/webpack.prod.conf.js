'use strict'

const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const Config = require('../config');
const basicWebpackConfig = require('./webpack.base.conf');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeAssetsCssPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');  // gzip压缩
const CopyWebpackPlugin = require('copy-webpack-plugin');

const webpackConfig = merge(basicWebpackConfig, {
    mode: 'production',
    devtool: Config.build.devtool,
    performance: {
        hints: false, // 关闭性能输出吗?
        maxEntrypointSize: 1000000
    },
    plugins: [
        new CleanWebpackPlugin(['dist', 'dist/*', 'dist/*.*'], {
            root: path.resolve(__dirname, '../'), // 清除路径
            verbose: false // 关闭日志
        }),
        new OptimizeAssetsCssPlugin({}),
        new webpack.NoEmitOnErrorsPlugin(),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../src/', 'assets'),
                to: path.resolve(__dirname, '../dist/', 'assets'),
                ignore: ['.*']
            }
        ])
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            minChunks: 2,
            automaticNameDelimiter: '-',
            cacheGroups: {
                commons: {
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        }
    }
});

// 是否开启gzip压缩
if (Config.build.gzipCompression) {
    webpackConfig.plugins.push(
        new CompressionPlugin({
            test: /\.js/,
            asset: '[path].gz[query]',
            threshold: 10240 // 10MB
        })
    )
}

// webpack bundle 分析
if (Config.build.bundleAnalyzer) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
    webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

webpackConfig.output.path = Config.build.assetsRoute;
webpackConfig.output.publicPath = Config.build.publicPath;

module.exports = webpackConfig;
