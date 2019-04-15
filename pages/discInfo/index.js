// pages/discInfo/index.js
import { createSong, isValidMusic, processSongsUrl } from '../../utils/song.js'
import { getDiscInfo } from '../../api/index.js'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sysInfo: null,
    disc: null,
    songs: [],
    player: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      sysInfo: app.globalData.sysInfo,
      disc: app.globalData.disc
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this._getDiscInfo()
  },
  _getDiscInfo(){
    let _this = this
    getDiscInfo(this.options.disstid).then(res => {
      if(res.code === 0){
        processSongsUrl(_this._normalizeSongs(res.cdlist[0].songlist)).then((songs) => {
          _this.setData({
            songs: songs
          })
        })
      }
      
    })
  },
  _normalizeSongs(list) {
    let ret = []
    list.forEach((musicData) => {
      if (isValidMusic(musicData)) {
        ret.push(createSong(musicData))
      }
    })
    return ret
  },
  _handleBack() {
    wx.navigateBack({
      delta: 1,
    })
  },
  _handlePlay({ currentTarget }) {
    app._setPlayerList([currentTarget.dataset.song]).then(() => {
      app.globalData.curPlayer = currentTarget.dataset.song
      wx.navigateTo({
        url: '/pages/player/index'
      })
    })
  },
  _handlePlayAll() {
    app._setPlayerList(this.data.songs).then(() => {
      app.globalData.curPlayer = this.data.songs[0]
      wx.navigateTo({
        url: '/pages/player/index'
      })
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      player: app.globalData.curPlayer
    })
  }
})