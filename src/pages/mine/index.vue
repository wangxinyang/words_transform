<template>
  <view class="info_content">
    <view v-if="isShow">
      <view class="user_wrap">
        <view class="avatar_info">
          <image class="avatar" :src="userInfo.avatarUrl"></image>
        </view>
        <view class="name_info">
          <view class="name">{{ userInfo.nickName }} </view>
          <view class="name-pr">给你一个舞台，上演属于你的精彩</view>
        </view>
      </view>
      <view class="chain_wrap">
        <view class="chain_events">
          <view class="chain_events-item" @click="naviNewChain">
            <view class="iconfont icon-baoming"></view>
            <view>通知公告</view>
          </view>
          <view class="chain_events-item" @click="naviChainDetail">
            <view class="iconfont icon-xian"></view>
            <view>活动接龙</view>
          </view>
        </view>
      </view>
      <view class="copy_right">© 2021 All rights reserved</view>
    </view>
    <view v-else>
      <view class="header">
        <image src="/static/images/wx_login.png"></image>
      </view>
      <view class="content">
        <view>申请获取以下权限</view>
        <text>获得你的公开信息(昵称，头像、地区等)</text>
      </view>
      <button class="bottom" type="primary" @tap="getUserInfo" withCredentials="true">授权登陆</button>
    </view>
  </view>
</template>

<script>

export default {
  data () {
    return {
      userInfo: {},
      isShow: false
    }
  },

  onLoad () {
    var that = this
    // 判断用户是否授权
    uni.getStorage({
      key: 'userInfo',
      success: function (res) {
        that.isShow = true
        that.userInfo = res.data
      }
    })
  },

  methods: {
    getUserInfo () {
      let _this = this
      uni.getUserProfile({
        desc: '用于完善用户信息',
        lang: 'zh_CN',
        success: res => {
          console.log(res)
          _this.userInfo = res.userInfo
          _this.isShow = true
          uni.setStorage({
            key: 'userInfo',
            data: res.userInfo,
            success: function () {
              console.log('success')
            }
          })
          // 强制更新
          _this.$forceUpdate()
        },
        fail: err => {
          uni.showToast({
            title: '用户未授权',
            icon: 'none'
          })
        }
      })
    },

    // 发起活动接龙
    naviNewChain () {
      uni.navigateTo({
        url: '/pages/chain/index',
        success: function (res) {
          console.log(res)
        },
        fail: function (err) {
          console.log(err)
        }
      })
    },

    // 查看已有的活动接龙
    naviChainDetail () {
      uni.navigateTo({
        url: '/pages/chain/chain_list',
        success: function (res) {
          console.log(res)
        },
        fail: function (err) {
          console.log(err)
        }
      })
    }
  }

}
</script>

<style lang="scss">
.info_content {
  background-color: #f6f6f6;
  height: 100vh;
}

.user_wrap {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  background-color: #fff;
  box-shadow: 2rpx 2rpx 0 2rpx rgba(0, 0, 0, 0.1);
  .avatar_info {
    flex: 1;
    margin-right: 30rpx;
    .avatar {
      width: 200rpx;
      height: 200rpx;
    }
  }

  .name_info {
    flex: 3;
    height: 200rpx;

    .name {
      font-size: 34rpx;
      font-weight: 400;
      margin-bottom: 20rpx;
    }

    .name-pr {
      font-size: 34rpx;
      font-weight: 600;
    }
  }
}

.chain_wrap {
  margin-top: 30rpx;
  padding: 0 20rpx;
  background-color: #fff;

  .chain_events .iconfont {
    font-size: 100rpx;
  }

  .chain_events {
    display: flex;
    justify-content: space-around;
  }
}

.copy_right {
  width: 90%;
  margin-top: 600rpx;
  text-align: center;
}

.header {
  margin: 90rpx 0 90rpx 50rpx;
  border-bottom: 1px solid #ccc;
  text-align: center;
  width: 650rpx;
  height: 300rpx;
  line-height: 450rpx;
  display: flex;
  justify-content: center;
  image {
    width: 200rpx;
    height: 200rpx;
  }
}

.content {
  margin-left: 50rpx;
  margin-bottom: 90rpx;
  text {
    display: block;
    color: #9d9d9d;
    margin-top: 40rpx;
  }
}

.bottom {
  border-radius: 80rpx;
  margin: 70rpx 50rpx;
  font-size: 35rpx;
}
</style>