// 云函数入口文件
// const cloud = require('wx-server-sdk')
const CloudBase = require('@cloudbase/manager-node')

const { storage } = new CloudBase({
  envId: 'cw-test-5gxu0uqj64dbbe86', // 云开发环境ID，可在腾讯云云开发控制台获取
})
// 云函数入口函数
exports.main = async (event, context) => {
  const res1 = await storage.listDirectoryFiles('speech/')
  console.log(res1)
  return res1
}
