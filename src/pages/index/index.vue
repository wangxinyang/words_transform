<template>
  <view>
    <!-- 介绍信息开始 -->
    <view class="card">
      <view class="card_content">
        <view class="p_wrap">你想知道演讲要花多长时间吗?</view>
        <view class="p_wrap"
          >这个小程序可以在线免费帮你把字数转换成演讲所需的时间。这个工具在准备演讲或报告时很有用。你需要花多少分钟取决于字数和你的说话速度，或阅读速度。</view
        >
        <view>注:此计算器仅提供参考数据。</view>
      </view>
    </view>
    <!-- 介绍信息结束 -->
    <!-- 计算部分开始 -->
    <view class="transform_wrap">
      <view class="title">详情输入</view>
      <view class="content">
        <view class="content_number">
          <view class="number_title">演讲字数</view>
          <input class="input_style" type="number" placeholder="0" maxlength="15" @input="onKeyInput" adjust-position />
        </view>
        <view class="transform_speed">
          <view class="speed_title">每分钟字数(wpm)</view>
          <picker @change="bindPickerChange" :value="index" :range="array">
            <view class="pick_item">{{ array[index] }}</view>
          </picker>
        </view>
      </view>
      <view class="calc_result">
        <text class="minutes">{{ minutes }}</text> 分钟
      </view>
    </view>
    <!-- 计算部分结束 -->
    <view class="over_view">
      <view class="content"> 以下概述提供了语音分钟的指示（基于每分钟240个单字的平均语速）: </view>
    </view>
    <Card :cardArray="cardArray" :speed="240"></Card>
    <CardMinutes :cardArrayMinutes="cardArrayMinutes"></CardMinutes>
  </view>
</template>

<script>
import Card from '@/components/card/index'
import CardMinutes from '@/components/cardMinutes/index'

export default {
  data () {
    return {
      minutes: 0,
      words: 0,
      speed: 240,
      speedArr: [185, 240, 300],
      array: ['慢速185字/分钟', '均速240字/分钟', '快速300字/分钟'],
      index: 1,
      cardArray: [1, 2, 3, 4, 5, 10, 15, 20],
      cardArrayMinutes: [500, 1000, 1250, 1500, 1750, 2000, 2500, 5000]
    }
  },

  onLoad () {
    wx.showShareMenu({
      withShareTicket: true,
      //设置下方的Menus菜单，才能够让发送给朋友与分享到朋友圈两个按钮可以点击
      menus: ["shareAppMessage", "shareTimeline"]
    })
  },

  components: {
    Card,
    CardMinutes
  },

  methods: {
    //发送给朋友
    onShareAppMessage (res) {
      return {
        title: '欢迎使用字时换算',
        type: 0,
        path: '/pages/index/index',
        summary: "",
        imageUrl: "../../static/images/shouye.jpeg"
      }
    },

    //分享到朋友圈
    onShareTimeline (res) {
      return {
        title: '欢迎使用字时换算',
        type: 0,
        query: '',
        summary: "",
        imageUrl: "../../static/images/shouye.jpeg"
      }
    },

    onKeyInput: function (event) {
      this.words = event.target.value
      this.calcMinutes()
    },

    bindPickerChange (e) {
      this.index = e.target.value
      this.speed = this.speedArr[e.target.value]
      this.calcMinutes()
    },

    calcMinutes () {
      console.log(this.words)
      console.log(this.speed)
      console.log(this.words / this.speed)
      this.minutes = (this.words / this.speed).toFixed(1)
    }
  }
}
</script>

<style lang="scss">
.card {
  width: 90%;
  height: 100%;
  background-color: #e1f5fe;
  margin: 15rpx auto 0;
  border-radius: 8rpx;
  box-shadow: 2rpx 2rpx 0 3rpx rgba(0, 0, 0, 0.1);
  .card_content {
    color: #000;
    font-size: 28rpx;
    font-weight: 400;
    padding: 20rpx;
    .p_wrap {
      margin-bottom: 20rpx;
    }
  }
}

.transform_wrap {
  width: 90%;
  margin: 60rpx auto 0;
  padding: 10rpx;
  .title {
    margin-bottom: 20rpx;
    font-size: 40rpx;
    font-weight: 300;
    color: rgba(0, 0, 0, 0.87);
  }

  .content {
    display: flex;
    justify-content: space-around;
    margin-bottom: 20rpx;
    .content_number {
      flex: 1;
      margin: 20rpx;
      .number_title {
        color: #9e9e9e;
        font-weight: 300;
        margin-bottom: 20rpx;
      }

      .input_style {
        border-bottom: 1px solid #3077b8;
      }
    }

    .transform_speed {
      flex: 1;
      margin: 20rpx;
      .speed_title {
        color: #9e9e9e;
        font-weight: 300;
        margin-bottom: 20rpx;
      }
      .pick_item {
        border-bottom: 1px solid #000;
      }
    }
  }
  .calc_result {
    width: 100%;
    margin-top: 120rpx;
    text-align: center;
    .minutes {
      font-size: 50rpx;
      font-weight: 600;
    }
  }
}

.over_view {
  margin: 30rpx auto 30rpx;
  width: 90%;
  height: 130rpx;
  border: 2rpx solid rgba(0, 0, 0, 0.87);
  border-radius: 8rpx;
  box-shadow: 2rpx 2rpx 0 3rpx rgba(0, 0, 0, 0.1);
  .content {
    padding: 30rpx;
  }
}
</style>
