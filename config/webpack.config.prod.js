const path = require('path');

module.exports = {

    entry: './src/index.js',

    output: {
        path: path.resolve(__dirname, '../../scripts'),
        filename: 'bundle.js',
    },

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
    }
};