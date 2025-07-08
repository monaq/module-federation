const path = require('path');

module.exports = {
    entry: './main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        library: {
            type: 'module'
        }
    },
    experiments: {
        outputModule: true
    },
    devServer: {
        static: {
            directory: path.join(__dirname, './'),
        },
        port: 3000,
        hot: true,
        headers: {
            "Access-Control-Allow-Origin": "*",
        }
    }
};