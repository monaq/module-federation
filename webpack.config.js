const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;

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
    plugins: [
        new ModuleFederationPlugin({
            name: 'moduleFederation',
            filename: 'remoteEntry.js',
            exposes: {
                './a': './src/a.js',
                './b': './src/b.js'
            },
        })
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        port: 3000,
        hot: true,
        headers: {
            "Access-Control-Allow-Origin": "*",
        }
    }
};