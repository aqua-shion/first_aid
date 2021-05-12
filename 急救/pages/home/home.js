// pages/home/home.js
const app = getApp();
const db = wx.cloud.database();
const _ = db.command

Page({
  

  /**
   * 页面的初始数据
   */
  data: {
    piclist: ['/icon/1.jpg', '/icon/2.jpg', '/icon/3.jpg'],
    itemlist: ['灾难', '生活', '疾病', '中毒', '运动'],
    selected: 0,
    paperlist: []
  },

  change(e) {
    // console.log(e)
    this.setData({
      selected: e.target.dataset.ind
    })
    var that = this
    db.collection('post').where({
      class: this.data.itemlist[e.target.dataset.ind]
    }).get({
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

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    var that = this
    db.collection('post').where({
      class: this.data.itemlist[this.data.selected]
    }).get({
      success: res => {
        // console.log(res)
        that.setData({
          paperlist: res.data
        })
      }
    })

   
  },
 

 
})