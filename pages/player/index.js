// pages/player/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    playerList: [],
    curPlayer: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      playerList: app.globalData.playList,
      curPlayer: app.globalData.curPlayer
    })
  },
  _handleBack(){
    wx.navigateBack({
      delta: 1,
    })
  }
})