const path = require("path");

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
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app.[hash].js",
  },
};
