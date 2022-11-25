const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const CommonWebpackConfig = {
  mode: "development",
  devtool: "inline-source-map",
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
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
};

module.exports = [
  // Hydrate Output
  {
    ...CommonWebpackConfig,
    entry: path.resolve(__dirname, "hydrate.tsx"),
    output: {
      clean: true,
      path: path.resolve(__dirname, "../dist/ssr"),
    },
    plugins: [
      ...CommonWebpackConfig.plugins,
      new HtmlWebpackPlugin({
        options: {
          tags: {
            bodyTags: `<div id="root"></div>`,
          },
        },
        scriptLoading: "defer",
      }),
    ],
  },
  // SSR Output
  {
    ...CommonWebpackConfig,
    target: "node",
    entry: path.resolve(__dirname, "ssr-app.tsx"),
    output: {
      clean: true,
      publicPath: "/",
      path: path.resolve(__dirname, "../dist/ssr/commonjs"),
      library: {
        type: "commonjs2",
      },
      globalObject: "this",
    },
    externals: {
      react: "react",
    },
  },
];
