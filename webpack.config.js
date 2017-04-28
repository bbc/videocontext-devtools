const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: './src/panel/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'panel/panel.js',
    },
    devtool: 'cheap-module-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                include: /src/,
            },
        ],
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'src/panel/panel.html', to: 'panel/panel.html' }
        ]),
    ],
}
