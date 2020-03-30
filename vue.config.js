const path = require("path")
const webpack = require('webpack')

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {

  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
  },
  publicPath: './',
  assetsDir: "static",
  configureWebpack: {
    devtool: 'source-map',
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": "jquery"
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      })
    ],
  },
  devServer: {
    proxy: {
      '/server': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/server': ''
        }
      }
    }
  }
}