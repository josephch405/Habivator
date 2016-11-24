var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, '');
var APP_DIR = path.resolve(__dirname, '');

var config = {
    entry: {popup:APP_DIR + '/popup/main.jsx'},
    output: {
        path: BUILD_DIR,
        filename: '/js/[name].bundle.js'
    },
    module: {
        loaders: [{
            test: /\.jsx?/,
            include: APP_DIR,
            loader: 'babel'
        }, {
            test: /\.less$/,
            loader: "style-loader!css-loader!less-loader"
        }]
    },
    plugins: [
        new webpack.OldWatchingPlugin()
    ],
    resolve: {
        extensions: ['', '.js', '.jsx', '.css'],
        modulesDirectories: [
            'node_modules'
        ]
    }
};



module.exports = config;
