// components/player/index.js
var app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    player: {
      type: Object,
      value: {}
    },
    playerList: {
      type: Array,
      value: []
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    statusBarHeight: app.globalData.sysInfo.statusBarHeight,
    playing: false,
    currentTim: 0,
    currentTimStr: '0:00',
    durationStr: '0:00'
  },
  observers: {
    'currentTim': function(val) {
      let str = this._formatSeconds(val)
      let allStr = this._formatSeconds(this.data.player.duration)
      this.setData({
        currentTimStr: str,
        durationStr: allStr
      })
    }
  },
  ready() {
    var _this = this
    app._handlePlay((player) => {
      _this._handleOnPlayer(player);
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    _handleBack(e){
      this.triggerEvent('back', e);
    },
    _handlePlaying(e){
      var _this = this
      app._handlePlay((player) => {
        _this._handleOnPlayer(player);
        _this.setData({
          playing: true
        })
      })
    },
    _handlePause(e){
      var _this = this
      app._handlePause(() => {
        _this.setData({
          playing: false
        })
      })
    },
    _handlePrev(e) {
      var _this = this
      let index = app._findIndex(this.data.player)
      if (this.data.playerList.length === 1 || index === 0) {
        wx.showToast({
          title: '已是第一首',
          icon: 'none'
        })
        return
      }
      app.globalData.curPlayer = this.data.playerList[index - 1];
      app._handlePlay((player) => {
        _this._handleOnPlayer(player);
      })
    },
    _handleNext(e){
      var _this = this
      let index = app._findIndex(this.data.player)
      if (this.data.playerList.length === 1 || index === this.data.playerList.length) {
        wx.showToast({
          title: '已是最后一首',
          icon: 'none'
        })
        return
      }
      app.globalData.curPlayer = this.data.playerList[index + 1];
      app._handlePlay((player) => {
        _this._handleOnPlayer(player);
      })
    },
    _handleOnPlayer(player) {
      var _this = this
      app.innerAudioCtx.duration
      app.innerAudioCtx.onTimeUpdate(() => {
        _this.setData({
          player: player,
          playing: true,
          currentTim: parseInt(app.innerAudioCtx.currentTime)
        })
      })
    },
    _formatSeconds(seconds) {
      var min = Math.floor(seconds / 60),
        second = seconds % 60,
        hour, newMin, time;

      if (second < 10) { second = '0' + second; }

      return time = min + ':' + second
    }
  }
})
