const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { TreePlugin } = require("./utils/TreePlugin");

module.exports = {
  entry: "./src/index.ts",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{ loader: "css-loader" }],
      },
      {
        test: /\.ts$/,
        use: [{ loader: "ts-loader" }],
      },
      {
        test: /\.tree$/,
        use: [{ loader: path.resolve('./utils/tree-loader') }],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app.[hash].js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new TreePlugin()
  ]
};
