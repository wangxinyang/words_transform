<template>
  <view class="card_minutes_wrap">
    <view class="desc" v-for="(item, index) in cardArrayMinutes" :key="index">
      {{ item }} 个单字的演讲需要多长时间？ <span class="underline"> {{ (item / 240).toFixed(1) }}</span> 分钟
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      minutes: 0
    }
  },

  props: {
    cardArrayMinutes: Array
  }
}
</script>

<style lang="scss">
.card_minutes_wrap {
  margin-top: 30rpx;
  .desc {
    width: 90%;
    margin: 0 auto;
    padding: 20rpx;
    border-top: 1px solid #e0e0e0;
    border-left: 1px solid #e0e0e0;
    border-right: 1px solid #e0e0e0;
    text-align: center;
    color: rgba(0, 0, 0, 0.87);
    font-size: 30rpx;
  }

  .desc:last-child {
    border-bottom: 1px solid #e0e0e0;
  }

  .underline {
    background-color: #ffe0b2;
  }
}
</style>