// pages/search/index.js
import { getHotKey, getSearch } from '../../api/index.js'
import { createSong, isValidMusic, processSongsUrl } from '../../utils/song.js'
import Signer from '../../utils/signer.js'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotKey: [],
    searchValue: '',
    songs: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  _handleInput({ detail }){
    if (detail.value){
      this._handleSearch(detail.value)
    } else {
      this.setData({
        songs: []
      })
    }
    
  },
  _handleAddSearchKey({ detail }){
    this.setData({
      searchValue: detail.k
    })
  },
  _handleAddSearchResult({ detail }){
    if (detail.type === 'signer'){
      let signer = new Signer({
        name: detail.singername,
        id: detail.singermid
      })
      app.globalData.signer = signer
      wx.navigateTo({
        url: `/pages/signerInfo/index?signerId=${signer.id}`
      })
    } else {
      app._setPlayerList([detail]).then(() => {
        app.globalData.curPlayer = detail
        wx.navigateTo({
          url: '/pages/player/index'
        })
      })
    }
  },
  _handleSearch(value){
    let _this = this
    getSearch(value, 1, true, 20).then(res => {
      if (res.code === 0) {
        _this._genResult(res.data).then((result) => {
          _this.setData({
            songs: result
          })
        })
      }
    })
  },
  _genResult(data) {
    let ret = []
    if (data.zhida && data.zhida.singerid) {
      ret.push({ ...data.zhida, ...{ type: 'signer' } })
    }
    return processSongsUrl(this._normalizeSongs(data.song.list)).then((songs) => {
      ret = ret.concat(songs)
      return ret
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this._getHotKey()
  },
  _getHotKey(){
    let _this = this
    getHotKey().then(res => {
      if(res.code === 0) {
        _this.setData({
          hotKey: res.data.hotkey.slice(0, 10)
        })
      }
      
    })
  }
})