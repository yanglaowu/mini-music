// pages/index/index.js
import { getDiscList, getSignerList } from '../../api/index.js'
import Singer from '../../utils/signer.js'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    signer: [],
    disc: [],
    player: null
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  _getDiscList(){
    let _this = this
    getDiscList().then(res => {
      _this.setData({
        disc: res.list || []
      })
    })
  },
  _getSignerList(){
    let _this = this
    getSignerList().then(res => {
      if(res.code === 0) {
        let list = res.data.list
        let signerList = []
        list.forEach((item, index) => {
          signerList.push(
            new Singer({
              name: item.Fsinger_name,
              id: item.Fsinger_mid
            })
          )
        })
        _this.setData({
          signer: signerList.slice(0, 6)
        })
      }
    })
  },
  _handleSearch(e){
    wx.navigateTo({
      url: '/pages/search/index'
    })
  },
  _handleMoreSigner(){
    wx.navigateTo({
      url: '/pages/signer/index'
    })
  },
  _handleSignerInfo({ currentTarget }){
    app.globalData.signer = currentTarget.dataset.signer
    wx.navigateTo({
      url: `/pages/signerInfo/index?signerId=${currentTarget.dataset.signer.id}`
    })
  },
  _handleDiscInfo({ currentTarget }){
    app.globalData.disc = currentTarget.dataset.disc
    wx.navigateTo({
      url: `/pages/discInfo/index?disstid=${currentTarget.dataset.disc.dissid}`
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this._getDiscList()
    this._getSignerList()
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