const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: './src/panel/index.js',
    output: {
        path: path.resolve(__dirname, 'dist', 'panel'),
        filename: 'panel.js',
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
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoader: 1,
                            modules: true,
                            localIdentName: '[path]___[name]__[local]___[hash:base64:5]'
                        },
                    },
                    {
                        loader: 'sass-loader'
                    }
                ],
                include: /src/,
            },
            {
                test: /\.svg$/,
                use: 'svg-inline-loader',
                include: /src/,
            }
        ],
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'src/*.html', to: '../[name].html' },
            { from: 'src/*.js', to: '../[name].js' },
            { from: 'src/manifest.json', to: '../manifest.json' },
            { from : 'src/panel/index.html', to: 'index.html' },
        ]),
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist', 'panel'),
        publicPath: '/',
    }
}
