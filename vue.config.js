module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        // 这里默认已经将src路径设置为@ 
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}