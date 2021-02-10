<template>
  <view class="article_wrap">
    <view class="article_item" v-for="item in articles" :key="item.id" @click="naviArticleDetail" :data-item="item.file_id">
      <view class="iconfont icon-huabankaobei-"></view>
      <view class="title">{{ item.title }}</view>
    </view>
  </view>
</template>

<script>
// const Data = require('../../const/data.js')
//云数据库初始化
const db = wx.cloud.database().collection('s_article')
export default {
  data () {
    return {
      articles: [],
    }
  },

  onLoad () {
    this.getArticleList()
  },

  methods: {
    // 获取文章列表
    getArticleList () {
      db.where({
        from: 'manager',
      }).get().then(res => {
        const data = res.data
        // 错误的场合
        if (data.length === 0) {
          uni.showToast({
            title: '没有文章数据',
            icon: 'none'
          })
          return
        }
        return data
      }
      ).then(data => {
        this.articles = [...this.articles, ...data]
      }).catch((err) => {
        console.log(err)
        uni.showToast({
          title: '获取文章错误',
          icon: 'none'
        })
      })
    },

    // 处理选取文章的点击事件
    naviArticleDetail (e) {
      uni.navigateTo({
        url: '/pages/article_detail/index?id=' + e.currentTarget.dataset.item,
        success: function (res) {
          console.log(res)
        },
        fail: function (err) {
          console.log(err)
          uni.showToast({
            title: '跳转文章详情失败',
            icon: 'none'
          })
        }
      })
    }
  }


}
</script>

<style lang="scss">
.article_wrap {
  width: 90%;
  margin: 30rpx auto 0;
  .article_item {
    height: 200rpx;
    background-color: #fff;
    display: flex;
    align-items: center;
    background-color: #f8f8f8;
    border-radius: 10rpx;
    margin-bottom: 20rpx;
    .icon-huabankaobei- {
      font-size: 80rpx;
      margin-right: 60rpx;
      padding-left: 30rpx;
    }
    .title {
      font-size: 28rpx;
      font-weight: 600;
    }
  }
}
</style>