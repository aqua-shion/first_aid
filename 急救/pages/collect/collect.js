// pages/collect/collect.js
Page({

  
  data: {
isCollect:true
  },

  
  onLoad: function (options) {
this.getCollect();
  },

 
  getCollect(){
    wx.cloud.database().collection('aid_collect')
    .get()
    .then(res => {
     
        this.setData({
        collect:res.data
        })

     
    })
    .catch(err => {
      console.log('请求失败', err)
    })

  },
  //取消收藏
  collect(){

  }
})