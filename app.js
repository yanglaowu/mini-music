//app.js
App({
  onLaunch: function () {
    let _this = this
    wx.getSystemInfo({
      success: function(res) {
        let info = res
        info.statusBarHeight = res.statusBarHeight + 10
        _this.globalData.sysInfo = res
      }
    })
  },
  innerAudioCtx: wx.createInnerAudioContext(),
  onShow: function (options) {
  },
  onHide: function (options) {
  },
  _findIndex(song){
    return this.globalData.playList.findIndex((item) => {
      return item.id === song.id
    })
  },
  _setPlayerList(songs) {
    return new Promise((resolve, reject) => {
      songs.forEach((item) => {
        if (this._findIndex(item) > -1) {
          // 歌曲存在
        } else {
          // 歌曲不存在 添加到 playList
          this.globalData.playList.push(item)
        }
      })
      resolve()
    })
  },
  _handlePlay(cb) {
    var m = this.globalData.curPlayer
    this.innerAudioCtx.src = m.url
    this.innerAudioCtx.play();
    setTimeout(() => {
      cb && cb(this.globalData.curPlayer);
    }, 500)
  },
  _handlePause(cb) {
    this.innerAudioCtx.pause();
    cb && cb(this.globalData.curPlayer);
  },
  globalData: {
    sysInfo: null,
    signer: null,
    disc: null,
    playList: [],
    curPlayer: null
  }
})