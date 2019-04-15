// pages/signer/index.js
import { getSignerList } from '../../api/index.js'
import Signer from '../../utils/signer.js'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    signer: [],
    player: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this._getSignerList()
  },
  _getSignerList() {
    let _this = this
    getSignerList().then(res => {
      if (res.code === 0) {
        let list = res.data.list
        let signerList = []
        list.forEach((item, index) => {
          signerList.push(
            new Signer({
              name: item.Fsinger_name,
              id: item.Fsinger_mid
            })
          )
        })
        _this.setData({
          signer: signerList
        })
      }
    })
  },
  _handleSearch(e) {
    wx.navigateTo({
      url: '/pages/search/index'
    })
  },
  _handleSignerInfo({ currentTarget }) {
    app.globalData.signer = currentTarget.dataset.signer
    wx.navigateTo({
      url: `/pages/signerInfo/index?signerId=${currentTarget.dataset.signer.id}`
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