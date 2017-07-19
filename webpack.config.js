const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const VERSION = require('./package.json').version

module.exports = {
    entry: {
        panel: './src/panel/index.js',
        '../devtools': './src/devtools.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist', 'panel'),
        filename: '[name].js',
        publicPath: '/',
    },
    devtool: 'cheap-module-source-map',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: 'babel-loader',
                include: /src/,
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoader: 1,
                            modules: true,
                            localIdentName: '[path]___[name]__[local]___[hash:base64:5]',
                        },
                    },
                    {
                        loader: 'sass-loader',
                    },
                ],
                include: /src/,
            },
            {
                test: /\.svg$/,
                use: 'svg-inline-loader',
                include: /src/,
            },
        ],
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'src/*.html', to: '../[name].html' },
            {
                from: 'src/manifest.json',
                to: '../manifest.json',
                transform: (content) => {
                    const manifest = JSON.parse(content)
                    const updatedManifest = Object.assign({}, manifest, { version: VERSION })
                    return JSON.stringify(updatedManifest)
                },
            },
            { from: 'src/panel/index.html', to: 'index.html' },
        ]),
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist', 'panel'),
        publicPath: '/',
    },
}
