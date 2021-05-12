// pages/search/search.js
const db = wx.cloud.database();
const _ = db.command

Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemlist: ['灾难', '生活', '疾病', '中毒', '运动'],
    selected: 0,
    paperlist: [],
    ser: ''
  },

  in (e) {
    this.setData({
      ser: e.detail.value
    })
  },



  change(e) {
    // console.log(e)
    this.setData({
      selected: e.target.dataset.ind
    })
    var that = this
    db.collection('post').where(
      _.or([{
          title: db.RegExp({
            regexp: that.data.ser,
            options: 'i',
          })
        },
        {
          paper: db.RegExp({
            regexp: that.data.ser,
            options: 'i',
          })
        }
      ]).and([{
        class: this.data.itemlist[e.target.dataset.ind],
      }])
    ).get({
      success: res => {
        // console.log(res)
        that.setData({
          paperlist: res.data
        })
      }
    })
  },
  godetail(e){
    console.log(e)
    wx.navigateTo({
      url: '../detail/detail?paper='+JSON.stringify(this.data.paperlist[e.currentTarget.dataset.ind]),
    })
  },
  sear() {
    var that = this
    db.collection('post').where(
      _.or([{
          title: db.RegExp({
            regexp: that.data.ser,
            options: 'i',
          })
        },
        {
          paper: db.RegExp({
            regexp: that.data.ser,
            options: 'i',
          })
        }
      ]).and([{
        class: that.data.itemlist[that.data.selected],
      }])
    ).get({
      success: res => {
        // console.log(res)
        that.setData({
          paperlist: res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    db.collection('post').where({
      class: this.data.itemlist[0],
    }).get({
      success: res => {
        // console.log(res)
        that.setData({
          paperlist: res.data
        })
      }
    })
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