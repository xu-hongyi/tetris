const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
    entry: './src',
    output: {
        path: path.resolve('./dist'),
        filename: "script/[name].[hash:5].js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /.ts$/,
                loader: ['ts-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.ts','.js'],
        alias: {
            "@":path.resolve('./src')
        }
    },
    devServer: {
        open:true,
        port:3000,
        stats:{
            modules:false,
            assets:false,
            timings:false,
            reasons:false
        }
    }
}