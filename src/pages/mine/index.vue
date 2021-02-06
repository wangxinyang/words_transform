<template>
  <view>
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
      <button class="bottom" type="primary" open-type="getUserInfo" @getuserinfo="getuserinfo" withCredentials="true">受权登陆</button>
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

  },

  methods: {
    getuserinfo () {
      let _this = this
      uni.login({
        provider: 'weixin',
        success: function (loginRes) {
          // 获取用户信息				
          uni.getUserInfo({
            provider: 'weixin',
            success: function (infoRes) {
              console.log(infoRes.userInfo)
              _this.userInfo = infoRes.userInfo
              _this.isShow = true
              uni.redirectTo({
                url: '/page/mine/index',
              })
            },
            fail: function (err) {
              uni.showToast({
                title: '用户未授权',
                icon: 'none'
              })
            }
          })
        },
        fail: function (err) {
          uni.showToast({
            title: '用户登录失败',
            icon: 'none'
          })
        }

      })
    }
  }

}
</script>

<style lang="scss">
.user_wrap {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 20rpx;
  width: 90%;
  .avatar_info {
    flex: 1;
    margin-right: 30rpx;
    .avatar {
      width: 200rpx;
      height: 200rpx;
    }
  }

  .name_info {
    flex: 2;
    height: 200rpx;
    background-color: #fff;
    border-radius: 6rpx;
    box-shadow: 2rpx 2rpx 0 2rpx rgba(0, 0, 0, 0.1);
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

.copy_right {
  width: 90%;
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