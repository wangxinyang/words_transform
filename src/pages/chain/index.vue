<template>
  <view>
    <view class="event-wrapper">
      <view class="event-title"><textarea class="uni-input-title" :value="eventTitle" show-confirm-bar="false" @input="handleTitleVal" /></view>
      <view class="event-divider"></view>
      <view class="event-content">
        <textarea :value="eventContent" show-confirm-bar="false" @input="handleContentVal" />
      </view>
    </view>
    <view class="btn-view">
      <view class="btn" @tap="handleEventInfo">立即发布</view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      eventTitle: '活动报名统计',
      eventContent: '本周四晚班课:崔老师的逻辑思维课,现发起接龙进行人员统计,请各位如实填写【此为演示模板，可自定义修改】',
      username: '',
      user_avatar: ''
    }
  },

  onLoad () {
    var that = this
    // 判断用户是否授权
    uni.getStorage({
      key: 'userInfo',
      success: function (res) {
        that.username = res.data.nickName
        that.user_avatar = res.data.avatarUrl
      }
    })
  },

  methods: {
    handleTitleVal (e) {
      this.eventTitle = e.target.value
    },

    handleContentVal (e) {
      this.eventContent = e.target.value
    },

    handleEventInfo () {
      let _this = this
      // 如果用户不存在的时候
      if ('' === _this.username) {
        _this.getUserInfo()
      } else {
        _this.insertEvent()
      }
    },

    insertEvent () {
      let _this = this
      const db = wx.cloud.database()
      db.collection('s_event').add({
        data: {
          event_name: _this.eventTitle,
          event_content: _this.eventContent,
          user_name: _this.username,
          user_avatar: _this.user_avatar,
          create_time: _this.datastime('yous'),
          update_time: _this.datastime('yous'),
        },
        success: res => {
          // 在返回结果中会包含新创建的记录的 _id
          wx.showToast({
            title: '新增接龙成功',
          })
          console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
          uni.switchTab({
            url: '/pages/mine/index',
          })
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '新增接龙失败'
          })
          console.error('[数据库] [新增记录] 失败：', err)
        }
      })
    },

    getUserInfo () {
      let _this = this
      uni.getUserProfile({
        desc: '用于完善用户信息',
        lang: 'zh_CN',
        success: res => {
          _this.username = res.userInfo.nickName
          uni.setStorage({
            key: 'userInfo',
            data: res.userInfo,
            success: function () {
              console.log('success')
              _this.insertEvent()
            }
          })
        },
        fail: err => {
          console.log('授权失败')
        }
      })
    },


    datastime (type) {
      let myDate = new Date()  //获取当前时间
      let yinian = myDate.getFullYear() //年
      let yer = parseInt(myDate.getMonth()) + 1//月份
      if (yer <= 9) { yer = "0" + yer }
      let riqi = myDate.getDate()//日
      if (riqi <= 9) { riqi = "0" + riqi }
      let time = myDate.getHours()//获取当前小时数(0-23)
      if (time <= 9) { time = "0" + time }
      let fen = myDate.getMinutes()     //获取当前分钟数(0-59)
      if (fen <= 9) { fen = "0" + fen }
      let miao = myDate.getSeconds()     //获取秒钟数
      if (miao <= 9) { miao = "0" + miao }
      if (type == 'nyr') { return yinian + "年" + yer + "月" + riqi + "日" } // 2021年1月14日
      if (type == 'yous') {
        return yinian + "-" + yer + "-" + riqi + " " + time + ":" + fen + ":" + miao //2021-01-14 16:47:36
      }
      if (type == 'int') { return parseInt(yinian + "" + yer + "" + riqi + time + "" + fen) }//202101141647
      return yinian + "年" + yer + "月" + riqi + "日" + " " + time + ":" + fen + ":" + miao //2021年1月14日 16:47:36
    },
  }
}
</script>
<style lang="scss">
.event-wrapper {
  padding: 40rpx;
  background-color: #fff;

  .uni-input-title {
    height: 80rpx;
    width: 80%;
    border: 1rpx solid f6f6f6;
    font-size: 50rpx;
    color: #666666;
  }

  .event-divider {
    border-bottom: 2rpx solid #f6f6f6;
    margin: 20rpx 0;
  }

  .event-content {
    font-size: 40rpx;
    color: #666666;
  }
}

.btn-view {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #3b8af0;

  .btn {
    width: 100%;
    height: 100rpx;
    line-height: 100rpx;
    color: #ffffff;
    font-size: 40rpx;
    text-align: center;
  }
}
</style>