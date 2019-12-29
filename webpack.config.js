const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

var vars = {
    path: {
        app: 'public/src/app',
        bundle: 'public/src/bundle'
    }
};

var config = {
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        port: 8081,
        historyApiFallback: true
    },
    entry: {
        'polyfills.js': './public/src/polyfills.ts',
        'app.js': './public/src/main.ts',
        'app': './' + vars.path.app + '/scss/index.scss'
    },
    output:{
        path: path.resolve(__dirname, './' + vars.path.bundle),
        publicPath: '/' + vars.path.bundle + '/',
        filename: "[name]"
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module:{
        rules:[
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: { configFileName: path.resolve(__dirname, 'tsconfig.json') }
                    } ,
                    'angular2-template-loader'
                ]
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            }, {
                test: /\.css$/,
                include: path.resolve(__dirname, 'src/app'),
                loader: 'raw-loader'
            }, {
                test: /\.scss$/,
                exclude: /(node_modules)/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    "css-loader",
                    "sass-loader"
                ]
            }, {
                test: /\.pug$/,
                loader: 'pug-loader'
            }, {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            }
        ]
    },
    plugins: [
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core/,
            path.resolve(__dirname, 'public/src'),
            {}
        ),
        new MiniCssExtractPlugin({
            filename: "[name].min.css"
        })
    ]
};

module.exports = (env, argv) => {
    if(argv.mode === 'development') {

    } else if(argv.mode === 'production') {

    } else if(argv.mode === 'none') {

    }

    return config;
};