const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader/dist/index");
module.exports = {
  entry: {
    main: "./src/index.ts",
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        phaser: {
          test: /[\\/]node_modules[\\/]phaser[\\/]/,
          name: "phaser",
          chunks: "all",
        },
      },
    },
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name]-[contenthash].bundle.js",
    assetModuleFilename: "asset-packs/[name]-[hash][ext][query]",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
      },
      {
        test: /\.json/,
        type: "asset/resource",
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      { test: /\.(png|jpe?g|gif|svg|webp)$/, type: "asset/resource" },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".vue"],
    alias: {
      "~": path.resolve(__dirname, "src"),
    },
  },
  devServer: {
    historyApiFallback: true,
    allowedHosts: "all",
    static: {
      directory: path.resolve(__dirname, "./dist"),
    },
    open: true,
    hot: true,
    port: 8080,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8089",
        pathRewrite: { "^/api": "" },
        changeOrigin: true, // target是域名的话，需要这个参数，
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src/index.html"),
      minify: false,
    }),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: "static",
          globOptions: {
            // asset pack files are imported in code as modules
            ignore: ["**/publicroot", "**/*-pack.json"],
          },
        },
      ],
    }),
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin(),
  ],
};
