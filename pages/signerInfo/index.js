// pages/signerInfo/index.js
import { getSignerInfo } from '../../api/index.js'
import { createSong, isValidMusic, processSongsUrl } from '../../utils/song.js'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sysInfo: null,
    signer: null,
    song: [],
    player: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      sysInfo: app.globalData.sysInfo,
      signer: app.globalData.signer
    })
  },
  _handleBack(){
    wx.navigateBack({
      delta: 1,
    })
  },
  // 播放指定歌曲
  _handlePlay({ currentTarget }){
    app._setPlayerList([currentTarget.dataset.song]).then(() => {
      app.globalData.curPlayer = currentTarget.dataset.song
      wx.navigateTo({
        url: '/pages/player/index'
      })
    })
  },
  // 播放全部
  _handlePlayAll(){
    app._setPlayerList(this.data.song).then(() => {
      app.globalData.curPlayer = this.data.song[0]
      wx.navigateTo({
        url: '/pages/player/index'
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this._getSignerInfo()
  },
  // 获取歌手详情
  _getSignerInfo(){
    let _this = this
    getSignerInfo(this.data.signer.id).then(res => {
      if(res.code === 0) {
        processSongsUrl(this._normalizeSongs(res.data.list)).then((songs) => {
          _this.setData({
            song: songs || []
          })
        })
      }
    })
  },
  _normalizeSongs(list) {
    let ret = []
    list.forEach((item) => {
      let { musicData } = item
      if (isValidMusic(musicData)) {
        ret.push(createSong(musicData))
      }
    })
    return ret
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