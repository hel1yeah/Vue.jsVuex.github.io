// vue.config.js
module.exports = {
  // настройки...
  publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
  
  assetsDir: 'dist',

  productionSourceMap: false,

  filenameHashing: true,
}