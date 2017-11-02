const path = require('path');

module.exports = {

    entry: './src/index.js',

    plugins: [],

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2017', 'stage-2', 'react']
                    }
                }
            }
        ]
    },

    devServer: {
        contentBase: path.join(__dirname, '../public'),
        historyApiFallback: {
            index: 'index.html'
        },
        publicPath: '/',
        compress: true,
        port: 9000
    }

};