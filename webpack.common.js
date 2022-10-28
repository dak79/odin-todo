const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/index.js')
    }, 
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/imgs/[hash][ext][query]'
                }
            },
            {
                test: /\.svg$/i,
                type: 'asset/inline'
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset',
                generator: {
                    filename: 'assets/fonts/[hash][ext][query]'
                }
            },
            {
                test: /.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    },
    optimization: {
        minimizer: [
            new CssMinimizerPlugin()
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'ToDo',
            template: path.resolve(__dirname,'./src/templates/template.html'),
            filename: 'index.html'
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'styles/[name].css'
        }),
        new FaviconsWebpackPlugin({
            logo: './src/assets/icons/logo.svg',
            prefix: '',
            publicPath: 'assets/favicons',
            outputPath: 'assets/favicons'
        })
    ]
}
