const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  configureWebpack: {
    plugins: [
      // 拷贝cloudfunctions到dist的weixin目录下实现云函数
      new CopyWebpackPlugin([
        {
          from: path.join(__dirname, 'cloudfunctions'),
          to: path.join(
            __dirname,
            'dist',
            process.env.NODE_ENV === 'development' ? 'dev' : 'build',
            process.env.UNI_PLATFORM,
            'cloudfunctions'
          ),
        },
      ]),
    ],
  },
}
