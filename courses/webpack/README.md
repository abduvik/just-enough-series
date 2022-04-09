# Wepack Tutorial

## YouTube Video

[![Just Enough webpack 5 tutorial youtube thumbnail](http://img.youtube.com/vi/07L5aVHpLVw/0.jpg)](http://www.youtube.com/watch?v=07L5aVHpLVw "Just Enough: Webpack 5 tutorial")

## Notes summary

### Core Concepts

- Entry: main file to load and from it we build the files import tree.
- Output: processed file to be the final output.
- Loaders: treats non-js files. Takes a source and return another file and the final output of all loaders should be a JS code.
- Plugins: Instance with `apply` method that can hook into different events in webpack compiler and compilation cycle.

### Webpack configs

Webpack sample configs

```jsx
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = (env) => ({
  mode: env.mode,
  output: {
    filename: "bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new webpack.ProgressPlugin()
  ],
});
```

`devtools: "source-maps"` to export source maps

### Webpack plugins and loaders

The following are some nodes about plugins and loaders:

- `css-loader` to handle css in the ui and changes it to json file and `style-loader` to apply them to the DOM
- add `--hot` to enable Hot Module Replacement in Webpack
- `mini-css-extract-plugin` to extract CSS into an independent file
- `url-loader` transforms files into base64 which would be really helpful for including images inside js and you can have a `limit` prop to limit the size of the imported image an instead of adding base64 it will add the url instead
- `webpack-bundle-analyzer` Analyzers your project and dependencies
- `compression-webpack-plugin` Compresses assets

### Code Splitting to improve web performance

- Dynamic Code splitting consists of static and "Dynamic" part and webpack actually is splitting every file under the static directory
- Magic comments `prefetch` and `preload` to load js files that would be needed in the future

### Plugins System

- Webpack uses tapable to create hooks for plugins to do their custom code
- 7 tapable instances that you can hook to them: compiler. compilation, resolver, module factory, parser, templates
- Loaders are functions that take a source and return a source