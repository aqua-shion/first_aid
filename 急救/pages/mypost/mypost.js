// pages/mypost/mypost.js
const app = getApp();
const db = wx.cloud.database();
const _ = db.command
var time = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    paperlist: [],
    userinfo: ''

  },

  godetail(e) {
    // console.log(e)
    wx.navigateTo({
      url: '../detail/detail?paper=' + JSON.stringify(this.data.paperlist[e.currentTarget.dataset.index]),
    })
  },

  delete(e) {
    var ind = e.currentTarget.dataset.ind
    var that = this
    wx.showModal({
      title: '提示',
      content: '请确认是否删除?',
      success: res => {
        if (res.confirm) {
          db.collection('post').where({
            _id: ind
          }).remove({
            success: res => {
              wx.showToast({
                  title: '删除成功',
                }),
                that.getdata()
            }
          })
        }
      }
    })
  },

  getdata() {
    var that = this
    db.collection('post').where({
      author: that.data.userinfo.nickName
    }).get({
      success: res => {
        that.setData({
          paperlist: res.data
        })
        wx.hideLoading()
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userinfo: app.globalData.userInfo,
      hasUserInfo: true
    })
    wx.showLoading()
    var that = this
    setTimeout(() => {
      that.getdata()
    }, 300);


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})