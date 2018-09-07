'use strict'

const webpack = require('webpack');
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Config = require('../config');
const Utils = require('./utils');

const basicWebpackConfig = {
    context: path.resolve(__dirname, '../'),
    entry: Object.assign(
        Utils.getEntry(), 
        {
            vendor: [
                'react',
                'react-dom',
                'axios',
                'react-redux'
            ]
        }
    ),
    output: {
        path: Config.build.assetsRoute,
        publicPath: '/',
        filename: path.posix.join('assets', 'js/[name].[hash].js'),
        chunkFilename: path.posix.join('assets', 'js/[name].[hash].bundle.js')
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../src')
        },
        extensions: [
            '.js',
            '.jsx',
            '.html',
            '.json',
            '.css',
            '.less',
            '.sass',
            '.png',
            '.jpg',
            '.jpeg'
        ],
        modules: ['./src', './node_modules']
    },
    plugins: [
        new MiniCssExtractPlugin({  //压缩css
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: path.posix.join('assets', 'styles/[name].[hash].css'),
            chunkFilename: path.posix.join('assets', 'styles/[id].[hash].css'),
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 1024,
                    name: path.posix.join('assets', 'images/[name].[hash].[ext]')
                }
            },
            {
                test: /\.css$/,
                loader: [
                    {
                        loader: MiniCssExtractPlugin.loader 
                    }, 
                    'css-loader?minimize'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader?minimize',
                    'postcss-loader',
                    'less-loader',
                ]
            }
        ]
    }
}

const webpackConfig = Utils.addHtmlWebpackPlugin(basicWebpackConfig);
module.exports = webpackConfig;
