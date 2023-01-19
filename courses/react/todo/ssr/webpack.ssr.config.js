const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const CommonWebpackConfig = {
  mode: "development",
  devtool: "inline-source-map",
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: "defaults",
                },
              ],
              "@babel/preset-react",
            ],
          },
        },
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.md$/,
        type: "asset/resource",
      },
    ],
  },
};

module.exports = [
  {
    ...CommonWebpackConfig,
    target: "node",
    entry: path.resolve(__dirname, "./SsrApp.tsx"),
    output: {
      clean: true,
      publicPath: "/",
      path: path.resolve(__dirname, "../dist/ssr"),
      library: {
        type: "commonjs2",
      },
      globalObject: "this",
    },
    externals: {
      react: "react",
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].css",
      }),
    ],
  },
  {
    ...CommonWebpackConfig,
    entry: path.resolve(__dirname, "./Hydrate.tsx"),
    output: {
      clean: true,
      path: path.resolve(__dirname, "../dist/hydrate"),
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].css",
      }),
      new HtmlWebpackPlugin({
        scriptLoading: "defer",
      }),
    ],
  },
];
