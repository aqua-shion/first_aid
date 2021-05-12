// pages/publish/publish.js

const app = getApp();
const db = wx.cloud.database();
const _ = db.command
var time = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    content: '',
    class: 0,
    classlist: ['灾难', '生活', '疾病', '中毒', '运动'],
   
  },

  change(e) {
    this.setData({
      class: e.detail.value
    })
  },
 
  t_title(e) {
    this.setData({
      title: e.detail.value
    })
  },

  t_content(e) {
    this.setData({
      content: e.detail.value
    })
  },

  fabu() {
    var that = this
    db.collection('post').add({
      data: {
        'title': that.data.title,
        'paper': that.data.content,
        'class': that.data.classlist[that.data.class],
        'author': that.data.userinfo.nickName,
        'time': time.formatTime(new Date(), 'Y/M/D h:m:s'),
        like:0,
        dislike:0,
        isCollect:false
      },
      success: res => {
        wx.showToast({
          title: '发布成功',
        })
        setTimeout(() => {
          wx.switchTab({
            url: '../index/index',
          })
        }, 1200);
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const userinfo = wx.getStorageSync('user');
   
    this.setData({ userinfo })
   
   
    // console.log(time.formatTime(new Date(), 'Y/M/D h:m:s'));
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