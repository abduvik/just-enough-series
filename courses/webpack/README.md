# Wepack

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

```js
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = (env) => ({
  mode: env.mode,
  entry: "src/index.js",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{ loader: "css-loader" }],
      },
    ],
  },
  output: {
    filename: "dist/bundle.js",
  },
  plugins: [new HtmlWebpackPlugin(), new webpack.ProgressPlugin()],
});
```

### DevTools

The config `devtools` can be used to define the output of source maps to be used with DevTools

`devtools: "source-maps"` to export source maps

### Webpack plugins and loaders

The following are some Webpack plugins and loaders:

- `css-loader`: to handle css in the ui and changes it to json file and `style-loader` to apply them to the DOM
- `mini-css-extract-plugin`: to extract CSS into an independent file
- `url-loader`: transforms files into base64 which would be really helpful for including images inside js and you can have a `limit` prop to limit the size of the imported image an instead of adding base64 it will add the url instead (Webpack 4)
- `webpack-bundle-analyzer`: Analyzers your project and dependencies
- `compression-webpack-plugin`: Compresses assets

### Asset Modules

It's a type of Webpack loaders included within it. There are 4 types of them:

- `asset/resource`: Adds the file to the dist directory and returns a link
- `asset/inline`: Returns a base64 encoding of the file
- `asset/source`: Import files as strings
- `asset`: Automatically switching between `asset/resource` and `asset/inline` depending on the file size

In Webpack 4, these were achieved by loaders

- `asset/resource` -> `file-loader`
- `asset/inline` -> `url-loader`
- `asset/source` -> `raw-loader`

Asset Module works with both `import` and `new URL()`

[![Webpack 5 Asset Modules youtube thumbnail](http://img.youtube.com/vi/ozVpfLNr0lY/0.jpg)](http://www.youtube.com/watch?v=ozVpfLNr0lY "Webpack 5 Asset Modules")

### Code Splitting to improve web performance

- Dynamic Code splitting consists of static and "Dynamic" part and webpack actually is splitting every file under the static directory
- Magic comments `prefetch` and `preload` to load js files that would be needed in the future

### Plugins System

- Webpack uses tapable to create hooks for plugins to do their custom code
- 7 tapable instances that you can hook to them: compiler. compilation, resolver, module factory, parser, templates
- Loaders are functions that take a source and return a source
