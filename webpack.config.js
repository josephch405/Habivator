var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'build');
var APP_DIR = path.resolve(__dirname, 'src');

var config = {
    entry: {popup:APP_DIR + '/main.jsx', options:APP_DIR + '/options.jsx'},
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
        },{ test   : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
            loader : 'file-loader' 
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
