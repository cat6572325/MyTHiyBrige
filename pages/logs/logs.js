//logs.js
var utils = require('../../utils/util.js')
 var api = require('../../utils/Url.js')
Page({
  data: {
    title: '项目',
    description: '描述',
    projects: [{},{},{}],
  },
  onLoad: function (options) {
    utils.getToken((res) => {
      wx.setStorageSync('Info', res)
      this.fetchProjects(res.token, (projects) => {
        this.setData({
          projects: projects
        })
      })
    })
  },
  onReady: function () {
    // 页面渲染完成

  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  fetchProjects: function (token, cb) {
    wx.request({
      url: api.api + 'project?token=' + token,
      data: {},
      method: 'GET',
      success: function (res) {
        typeof cb === "function" && cb(res.data)
        console.log(res.data)
      }
    })
  }
})