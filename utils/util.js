var Api = require('../utils/Url.js')

var getCode = function(callback) {
  wx.login({
    success: function(res){
      if(res.code) {
        console.log('code:', res.code)
        typeof callback === "function" && callback(res.code)
      }
      else {
        console.log('获取用户登录态失败！' + res.errMsg)
      }
    }
  }) 
}

// 获取token和openID
function getToken (callback) {
  getCode((code) => {
    wx.getUserInfo({
      success: function(res){
        wx.request({
          url: Api.api+'session',
          data: {
            code: code,
            newteo: '75c7f6343b26609d58160ae8e13c3c5a0e2847fd',
            iv: res.iv,
            encryptedData: res.encryptedData
          },
          method: 'GET',
          success: function(res){
            typeof callback == "function" && callback(res.data)
          },
          fail: function() {
            console.log('wx.request 在 fethchInfo 中发生错误')
          }
        })
      },
      fail: function(res) {
        if(res.errMsg) {
          console.log('用户拒绝授权', res)
          typeof callback == "function" && callback({errMsg : "deny"})
        }
      }
    })
  })
}
var translateStageFormat = function(stageString) {
  switch(stageString) {
    case "pending" :
      return "待处理";
      break;
    case "start" :
      return "确认需求中";
      break;
    case "going" :
      return "开发中";
      break;
    case "check" :
      return "验收中";
      break;
    case "finish":
      return "已完成";
      break;
    default: 
      return "未知状态";
  }
}

module.exports = {
    getCode: getCode,
    getToken: getToken,
    translateStageFormat: translateStageFormat,

}