<template>
  <view class="event-detail-wrapper">
    <view class="event-detail-content">
      <view class="event-item event-author">
        <view class="avatar_info">
          <image class="avatar" :src="eventInfo.user_avatar"></image>
        </view>
        <view class="name_info">
          <view class="name">发布人：{{ eventInfo.user_name }} </view>
        </view>
      </view>
      <view class="event-item event-number">
        <span>{{ number }}</span>
        <span>参与人数</span>
      </view>
      <view class="event-item event-detail">
        <view class="event-title">
          {{ eventInfo.event_name ? eventInfo.event_name : '' }}
        </view>
        <view class="event-content">
          {{ eventInfo.event_content ? eventInfo.event_content : '' }}
        </view>
      </view>
      <span class="entry-title"> 参与人员： </span>
      <view class="event-item event-entry">
        <view class="entry-item" v-for="item in entryInfo" :key="item._id">
          <view class="entry_avatar_info">
            <image class="avatar" :src="item.avatar_url"></image>
            <span>{{ item.user_name }}</span>
          </view>
          <view class="entry_time">
            <view class="time">{{ item.create_time }} </view>
          </view>
        </view>
      </view>
    </view>
    <view class="btn-view">
      <view class="btn" @tap="handleEventEntry">我要接龙</view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      eventInfo: {},
      userInfo: {},
      number: 0,
      entryInfo: [],
      id: '',
      isRepeat: false
    }
  },

  onLoad (option) {
    var that = this
    uni.getStorage({
      key: 'userInfo',
      success: function (res) {
        that.userInfo = res.data
        that.id = option.id
        that.getEventEntryInfo()
        that.getEventDetailById()
      }
    })
  },

  methods: {
    //发送给朋友
    onShareAppMessage (res) {
      return {
        title: '欢迎使用字时换算接龙',
        type: 0,
        path: '/pages/chain/chain_detail?id=' + this.id,
        summary: "",
        imageUrl: "../../static/images/shouye.jpeg"
      }
    },

    //分享到朋友圈
    onShareTimeline (res) {
      return {
        title: '欢迎使用字时换算接龙',
        type: 0,
        query: '',
        summary: "",
        imageUrl: "../../static/images/shouye.jpeg"
      }
    },

    getEventDetailById () {
      var that = this
      const db = wx.cloud.database()
      db.collection('s_event').where({ _id: that.id }).get({
        success: function (res) {
          that.eventInfo = res.data[0]
          console.log(that.eventInfo)
        }
      })
    },

    getEventEntryInfo () {
      var that = this
      const db = wx.cloud.database()
      db.collection('s_event_detail').where({ event_id: that.id }).get({
        success: function (res) {
          that.entryInfo = [...res.data]
          that.number = res.data.length
        }
      })
    },

    handleEventEntry () {
      let _this = this
      if (!_this.isRepeat) {
        const db = wx.cloud.database()
        db.collection('s_event_detail').where({
          event_id: _this.id,
          user_name: _this.userInfo.nickName
        }).get({
          success: function (res) {
            console.log(res)
            if (res.data.length >= 1) {
              wx.showToast({
                icon: 'none',
                title: '已经参与过了，不能重复参与'
              })
              _this.isRepeat = true
            } else {
              db.collection('s_event_detail').add({
                data: {
                  event_id: _this.id,
                  user_name: _this.userInfo.nickName,
                  avatar_url: _this.userInfo.avatarUrl,
                  create_time: _this.datastime('yous'),
                  update_time: _this.datastime('yous'),
                },
                success: res => {
                  // 在返回结果中会包含新创建的记录的 _id
                  wx.showToast({
                    title: '接龙成功',
                  })
                  console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
                  _this.getEventEntryInfo()
                },
                fail: err => {
                  wx.showToast({
                    icon: 'none',
                    title: '接龙失败'
                  })
                  console.error('[数据库] [新增记录] 失败：', err)
                }
              })
            }
          }
        })
      } else {
        wx.showToast({
          icon: 'none',
          title: '已经参与过了，不能重复参与'
        })
      }
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
.event-detail-wrapper {
  height: 100vh;
  margin-top: 20rpx;
  background-color: #f6f6f6;

  .event-detail-content {
    margin-bottom: 300rpx;
  }

  .event-item {
    height: 230rpx;
    background-color: #fff;
    margin: 30rpx 20rpx;
    box-shadow: 2rpx 2rpx 0 2rpx rgba(0, 0, 0, 0.1);
  }

  .event-author {
    display: flex;
    justify-content: space-around;
    .avatar_info {
      flex: 1;
      margin-right: 30rpx;
      padding: 20rpx;
      .avatar {
        width: 200rpx;
        height: 200rpx;
        border-radius: 50%;
      }
    }

    .name_info {
      flex: 3;
      height: 200rpx;

      .name {
        font-size: 34rpx;
        font-weight: 400;
        margin-bottom: 20rpx;
        line-height: 200rpx;
        color: #3f3f3f;
      }
    }
  }

  .event-number {
    text-align: center;
    font-size: 40rpx;
    color: #787878;

    span {
      display: block;
      margin-top: 20rpx;
    }

    span:nth-child(1) {
      font-size: 60rpx;
      font-weight: bold;
      color: #000000;
    }
  }

  .event-detail {
    padding: 30rpx;
    height: auto;

    .event-title {
      font-size: 60rpx;
    }

    .event-content {
      font-size: 30rpx;
      color: #666666;
    }
  }

  .entry-title {
    margin-left: 20rpx;
  }

  .event-entry {
    height: auto;
  }

  .entry-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30rpx;

    .entry_avatar_info {
      .avatar {
        width: 50rpx;
        height: 50rpx;
        border-radius: 50%;
      }
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
}
</style>