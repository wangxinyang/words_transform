<template>
  <view class="event-list">
    <view class="event-item" v-for="(item, index) in event" :key="index" :data-item="item._id" @tap.stop="handleEventDetail">
      <view class="event-top">
        <view class="event-title">{{ item.event_name }}</view>
      </view>
      <view class="event-middle">
        <view class="event-middle_left">
          {{ item.create_time }}
        </view>
        <view class="event-middle_right"> 参与：{{ item.number ? item.number : 0 }} </view>
      </view>
      <view class="event-divider"></view>
      <view class="event-bottom">
        <view v-if="item.is_show">
          <view class="event-btn event-btn_delete" :data-item="item._id" @tap.stop="handleEventDetailDelete">删除</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      event: [],
      username: '',
    }
  },

  onLoad () {
    this.getUserInfoFromStorage()
  },

  onShow () {
    this.getEventInfo()
  },

  methods: {
    getUserInfoFromStorage () {
      var that = this
      // 判断用户是否授权
      uni.getStorage({
        key: 'userInfo',
        success: function (res) {
          that.username = res.data.nickName
          console.log(that.username)
          // 如果用户不存在的时候
          if ('' === that.username) {
            that.getUserInfo()
          } else {
            that.getEventInfo()
          }
        }
      })
    },

    getEventInfo () {
      var that = this
      const db = wx.cloud.database()
      db.collection('s_event').orderBy('create_time', 'desc').get({
        success: function (res) {
          that.event = [...res.data]
          console.log(that.event)
          that.event.map(item => {
            db.collection('s_event_detail').where({
              event_id: item._id
            }).get({
              success: function (res) {
                that.$set(item, 'number', res.data.length)
                if (item.user_name === that.username) {
                  that.$set(item, 'is_show', true)
                } else {
                  that.$set(item, 'is_show', false)
                }
              }
            })
          })
        }
      })
    },

    handleEventDetail (e) {
      let id = e.currentTarget.dataset.item
      uni.navigateTo({
        url: '/pages/chain/chain_detail?id=' + e.currentTarget.dataset.item,
        success: function (res) {
          console.log(res)
        },
        fail: function (err) {
          console.log(err)
        }
      })
    },

    // 删除接龙
    handleEventDetailDelete (e) {
      var _this = this
      uni.showModal({
        title: '确定要删除此接龙吗',
        content: '',
        success: function (res) {
          if (res.confirm) {
            let id = e.currentTarget.dataset.item
            const db = wx.cloud.database()
            db.collection('s_event').where({
              _id: id
            }).remove({
              success: function (res) {
                _this.getEventInfo()
                uni.showToast({
                  title: '删除成功',
                  icon: 'none'
                })
              }
            })
          } else {
            console.log('点击了取消')
          }
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
              _this.getEventInfo()
            }
          })
        },
        fail: err => {
          console.log('授权失败', err)
        }
      })
    },
  }
}
</script>
<style lang="scss">
.event-list {
  height: 100vh;
  background-color: #f6f6f6;
  margin-top: 20rpx;

  .event-item {
    padding: 40rpx;
    margin: 40rpx 20rpx;
    background-color: #fff;
    border-radius: 10rpx;
    margin-top: 10rpx;
    height: 300rpx;

    .event-top {
      margin-bottom: 20rpx;
      font-size: 50rpx;

      .event-title {
        color: #333333;
      }
    }

    .event-middle {
      display: flex;
      justify-content: space-between;

      .event-middle_left,
      .event-middle_right {
        color: #a2a2a2;
      }
    }

    .event-divider {
      border-bottom: 1px solid#f6f6f6;
      margin: 20rpx 0;
    }

    .event-bottom {
      height: 100%;
    }

    .event-btn {
      border: 1px solid #ccc;
      width: 140rpx;
      height: 60rpx;
      font-size: 30rpx;
      line-height: 60rpx;
      text-align: center;
      border-radius: 50rpx;
      color: #747474;
    }

    .event-btn:nth-child(2) {
      margin-right: 20rpx;
    }

    .event-btn_delete,
    .event-btn_share {
      float: right;
    }
  }
}
</style>