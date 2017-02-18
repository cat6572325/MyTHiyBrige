var api = require('../..//utils/Url.js')
var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    winWidth: 0,
    winHeight: 0,
    lists: [{ picture: '/images/a.png' }, { picture: '/images/a.png' }],
  },

  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData(
          {
            winWidth: res.windowWidth,
            winHeight: res.windowHeight
          });
      },
    })
    util.getToken((res) => {
      wx.setStorageSync('Info', res)
      this.fetchProjects(res.token, (projects) => {
        this.setData({
          lists: projects.map((v)=>
          {
            return Object.assign(v, { progression2: util.translateStageFormat(v.translateStageFormat) })
          })
        })
        console.log(this.data.lists)
      })
    })
  },
   fetchProjects: function (token, cb) {
    wx.request({
      url: api.api + 'project?token=' + token,
      data: {},
      method: 'GET',
      success: function (res) {
        typeof cb === "function" && cb(res.data)
      }
    })
  }
})