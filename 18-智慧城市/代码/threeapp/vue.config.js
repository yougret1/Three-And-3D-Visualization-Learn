const path = require('path')

module.exports = {
  chainWebpack: config => {
    config.resolve.alias.set('@', path.resolve(__dirname, 'src'))
    config.module
      .rule('glsl')
      .test(/\.glsl$/)
      .use('webpack-glsl-loader')
      .loader('webpack-glsl-loader')
      .end()
  }
}
