<template>
  <view>
    <view class="video_wrap">
      <view class="video_items" v-for="item in videos" :key="item.id">
        <video class="video_item" :src="item.file_id" :title="item.title" play-btn-position="center" enable-play-gesture></video>
      </view>
    </view>
  </view>
</template>

<script>
// 云数据库初始化
const DB = wx.cloud.database().collection('s_video')
export default {

  data () {
    return {
      videos: []
    }
  },

  onLoad () {
    // 开始loading
    uni.showLoading({
      title: '加载中'
    })
    this.getVideos()
  },

  methods: {
    getVideos () {
      DB.where({ 'from': 'manager' }).get().then(res => {
        console.log(res.data)
        // 取消loading
        uni.hideLoading()
        this.videos = [...this.videos, ...res.data]
      }).catch(err => {
        console.error(err)
        uni.showToast({
          title: '没有视频数据',
          icon: 'none'
        })
      })
    }
  }

}
</script>

<style lang="scss">
.video_wrap {
  margin: 0 auto;
  .video_items {
    margin: 20rpx 0;
    .video_item {
      width: 100%;
    }
  }
}
</style>