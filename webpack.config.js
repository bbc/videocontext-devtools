const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/panel/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'panel/panel.js',
        publicPath: '/'
    },
    devtool: 'cheap-module-source-map',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: 'babel-loader',
                include: /src/,
            },
        ],
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'src/*.html', to: '[name].html' },
            { from: 'src/*.js', to: '[name].js' },
            { from: 'src/manifest.json', to: 'manifest.json' },
        ]),
        new HTMLWebpackPlugin({
            filename: "panel/index.html",
            template: "src/panel/index.html",
        }),
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist/panel"),
    }
}
