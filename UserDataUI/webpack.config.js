const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// Learning webpack
module.exports = {
    mode: 'development',
    entry: {
        bundle: path.resolve(__dirname, 'src/index.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name][contenthash].js",
        clean: true, // for removing earlier bundle.js
        assetModuleFilename: "[name][ext]",
    },
    devtool: 'source-map', //for creating a source file like .map.js which helps in debugging
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist')
        },
        port: 8080,
        open: true, // to open browser auto
        hot: true, // to enable live reloading
        compress: true, // enable gzip compression
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(svg|eot|woff|woff2|ttf)$/,
                use: ["file-loader"]
            },
            {
                // for making your code backward compatible
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            },
            {
                test: /\.(png|jpg|jpeg)$/i,
                type: 'asset/resource'
            },
            // If media like video or audio
            {
                // test: /\.(mp4|webm|mkv|mp3)$/i,
                // type: "asset/resource",
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            title:'User Data UI',
            filename:'index.html',
            template:'src/index.html'
        }),
    ],
};