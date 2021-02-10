<template>
  <view>
    <view class="desc" v-for="(item, index) in cardArray" :key="index">
      {{ item }} 分钟演讲中包含 <span class="underline">{{ item * speed }} </span> 个单字
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      newSpeed: 0
    }
  },

  props: {
    speed: Number,
    cardArray: Array
  }
}
</script>

<style lang="scss">
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
</style>