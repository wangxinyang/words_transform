<template>
  <view class="article_wrap">
    <text>
      {{ content }}
    </text>
  </view>
</template>

<script>
export default {

  data () {
    return {
      fileId: '',
      content: ''
    }
  },

  onLoad (option) {
    this.fileId = option.id
    // 开始loading
    uni.showLoading({
      title: '加载中'
    })
    this.handleArticleContent()
  },

  methods: {
    // 处理选取文章的点击事件
    handleArticleContent () {
      let _this = this
      wx.cloud.downloadFile({
        fileID: this.fileId
      }).then(res => {
        // get temp file path
        console.log(res.tempFilePath)
        const tempFilePath = res.tempFilePath
        return tempFilePath
      }).then(tempFilePath => {
        wx.getFileSystemManager().readFile({
          filePath: tempFilePath,
          encoding: 'utf-8',
          success (res) {
            if (res.data) {
              // 取消loading
              uni.hideLoading()
              let obj = res.data
              _this.content = obj
            }
          },
          fail (err) {
            console.log('读取失败', err)
            uni.showToast({
              title: '读取文章失败',
              icon: 'none'
            })
          }
        })
      }).catch(error => {
        console.log(error)
        uni.showToast({
          title: '获取文章错误',
          icon: 'none'
        })
      })
    }
  }
}
</script>

<style lang="scss">
.article_wrap {
  text-indent: 50rpx;
  padding: 30rpx;
  line-height: -40rpx;
  font-size: 36rpx;
}
</style>