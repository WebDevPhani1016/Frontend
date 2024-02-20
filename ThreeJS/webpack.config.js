const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: "development",
    entry: {
        bundle: path.resolve(__dirname, "src/index.js"),
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name][contenthash].js",
        clean: true, //for removing earlier bundle.js files from dist
        assetModuleFilename: "[name][ext]",
    },
    devtool: "source-map", //for creating a source file like .map.js which helps in debugging
    devServer: {
        static: {
            directory: path.resolve(__dirname, "dist"),
        },
        port: 8086,
        open: true, //to open the browser automatically
        hot: true, //for hot reloading or live reoloading of pages
        compress: true, //enable gzip compression
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(svg|eot|woff|woff2|ttf)$/,
                use: ["file-loader"],
            },
            {
                //for making your code backward compatible
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
                type: "asset/resource",
                // loader: "file-loader",
                // options: {
                //   outputPath: "media/images",
                //   name: "[name].[ext]",
                // },
            },
            {
                test: /\.(mp4|webm|mkv|mp3)$/i,
                type: "asset/resource",
                // loader: "file-loader",
                // options: {
                //   outputPath: "media/videos",
                //   name: "[name].[ext]",
                // },
            },
        ],
    },
    plugins: [
        new HTMLWebpackPlugin({
            title: "ThreeJs App",
            filename: "index.html",
            template: "src/index.html",
        }),
    ],
}