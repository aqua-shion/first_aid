// pages/comment/comment.js
Page({

  
  data: {

  },

  
  onLoad: function (options) {
this.getComment();
const superRoot=wx.getStorageSync('superRoot')
this.setData({superRoot})
  },

 getComment(){
   
 
  wx.cloud.database().collection('aid_comment')
    
    .get()
    .then(res => {
      
      this.setData({
        commentLength: res.data.length,
        talking_comment:res.data

      })
     
    })
    .catch(err => {
      console.log('请求失败', err)
    })
},
delete(e){
  var id = e.currentTarget.dataset.id
  console.log(id);
  id = id.replace(/\s*/g,"");
  wx.cloud.callFunction({
    name:'remove_comment',
    data:{
      id:id
    }
  })
  .then(res=>{
    console.log('删除成功',res)
    wx.showToast({
      title: '删除成功',
    })
    setTimeout(res=>{
      wx.switchTab({
        url: '/pages/index/index',
      })
    },1500)
  })
  .catch(res=>{
    console.log('删除失败',res)
  })

}
 
})