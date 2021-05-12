var id=''
var like=0
var dislike=0
var aid_comment=''
var date_Month=new Date().getMonth()+1
var date=new Date().getFullYear()+"/"+date_Month+"/"+new Date().getDate()+" "+new Date().getHours()+":"+new Date().getMinutes()
Page({

  data: {
    paper:[],
    isLike:true,
    isDislike:true,
    isFocus: false,
    
  },

  
  onLoad: function (e) {
    var superRoot = wx.getStorageSync('superRoot');
    const userInfo = wx.getStorageSync('user');
    const openid=wx.getStorageSync('openid');
    this.setData({ userInfo,superRoot })
    this.setData({ openid })
    let paper=JSON.parse(e.paper)
    id= paper._id
    // console.log('22222222',id);
    this.getDetail();
    this.setData({
      paper:JSON.parse(e.paper)
    })
  },
//分享
onShareAppMessage() {
  return {
    title: '急救小知识科普！',
    path: 'page/detail/detail?id='+id
  }
  
},
//点赞
like(){
  if(this.data.isLike==true){
    this.setData({
      isLike:false
    })
    wx.showToast({
      title: '点赞成功',
    })
    
    wx.cloud.database().collection('post')
    .where({
      _id:id
    })
    .get()
    .then(res => {
      wx.cloud.database().collection('post')
      .where({
        _id:id
      })
      .update({
        data: {
          like:res.data[0].like+1  //where返回的是数组
        },
      })
      this.setData({
        like:res.data[0].like+1
      })
      

    })
    .catch(res => {
      console.log('点赞失败', res)
    })

  }else if(this.data.isLike==false){
    this.setData({
      isLike:true
    })
    wx.showToast({
      title: '取消点赞',
    })
    wx.cloud.database().collection('post')
    .where({
      _id:id
    })
    .get()
    .then(res => {
      wx.cloud.database().collection('post')
      .where({
        _id:id
      })
      .update({
        data: {
          like:res.data[0].like-1  //where返回的是数组
        },
      })
      this.setData({
        like:res.data[0].like-1
      })
    })
    .catch(res => {
      console.log('取消点赞失败', res)
    })

  }
  
},
//点踩
dislike(){
  
  if(this.data.isDislike==true){
    this.setData({
      isDislike:false
    })
    wx.showToast({
      title: '点踩成功',
    })
    wx.cloud.database().collection('post')
    .where({
      _id:id
    })
    .get()
    .then(res => {
      wx.cloud.database().collection('post')
      .where({
        _id:id
      })
      .update({
        data: {
          dislike:res.data[0].dislike+1  //where返回的是数组
        },
      })
      this.setData({
        dislike:res.data[0].dislike+1
      })

    })
    .catch(res => {
      console.log('点踩失败', res)
    })

  }else if(this.data.isDislike==false){
    this.setData({
      isDislike:true
    })
    wx.showToast({
      title: '取消点踩',
    })
    wx.cloud.database().collection('post')
    .where({
      _id:id
    })
    .get()
    .then(res => {
      wx.cloud.database().collection('post')
      .where({
        _id:id
      })
      .update({
        data: {
          dislike:res.data[0].dislike-1  //where返回的是数组
        },
      })
      this.setData({
        dislike:res.data[0].dislike-1
      })

    })
    .catch(res => {
      console.log('取消点踩失败', res)
    })

  }
  
},
submit(e) {

  aid_comment = e.detail.value
  this.setData({
    isFocus:true
  })
},
  
handleSubmit(){
  if (aid_comment == '') {
    wx.showToast({
      icon: 'none',
      title: '评论为空'
    })
  }else {
    
  wx.cloud.database().collection('aid_comment')
    .add({
      data: {
        tkid: this.data.detail._id,
        comment: aid_comment,
        comment_time: date,
        nickName:this.data.userInfo.nickName,
        avatarUrl:this.data.userInfo.avatarUrl

      }
    })

    .then(res => {
      console.log('评论成功', res)

      wx.switchTab({
        url: '/pages/home/home'

      })
      wx.showToast({
        title: '评论成功',
      })
    })
    .catch(res => {
      console.log('评论失败', res)
    })
  }
},
 //找出所有评论 根据tkid
 init() {
  wx.cloud.database().collection('aid_comment')
    .where({
      tkid: this.data.detail._id
    })
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
getDetail(){
  wx.cloud.database().collection('post')
  .doc(id)
  .get()
  .then(res => {

    this.setData({
      detail:res.data,
      like:res.data.like,
      dislike:res.data.dislike,
      
    })
  this.init();
  this.getCollect();
  })
  .catch(err => {
    console.log('请求失败', err)
  })

},
getCollect(){
  wx.cloud.database().collection('post')
  .doc(id)
  .get()
  .then(res => {
    
    this.setData({
      isCollect:res.data.isCollect
    })
   

  })
  .catch(res => {
    console.log('收藏失败', res)
  })

},
collect(){
  if(this.data.isCollect==false){
    this.setData({
      isCollect:true
    })
    wx.showToast({
      title: '收藏成功',
    })
    
    wx.cloud.database().collection('aid_collect')
    .add({
      data: {
        collect_time:date,
        nickName:this.data.userInfo.nickName,
        avatarUrl:this.data.userInfo.avatarUrl,
        title:this.data.paper.title,
        coid: this.data.detail._id,
        author:this.data.paper.author,
        paper:this.data.paper.paper,
        time:this.data.paper.time
      }
    })
    .then(res => {
      wx.cloud.database().collection('post')
      .doc(id)
      .update({
        data: {
         isCollect:true  //where返回的是数组
        },
      })
      wx.switchTab({
        url: '/pages/home/home',
      })
     
      

    })
    .catch(res => {
      console.log('收藏失败', res)
    })

  }else if(this.data.isLike==true){
    this.setData({
      isCollect:false
    })
    wx.showToast({
      title: '取消收藏',
    })
    wx.cloud.database().collection('aid_collect')
    .where({
      coid: this.data.detail._id
    })
    .remove()
    .then(res => {
      wx.cloud.database().collection('post')
      .doc(id)
      .update({
        data: {
         isCollect:false  //where返回的是数组
        },
      })
     console.log("取消收藏成功",res);
     wx.switchTab({
      url: '/pages/home/home',
    })
    })
    .catch(res => {
      console.log('取消收藏失败', res)
    })

  }
  

},
delete(){
  
  wx.cloud.callFunction({
    name:'remove_aid',
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
        url: '/pages/home/home',
      })
    },1500)
  })
  .catch(res=>{
    console.log('删除失败',res)
  })
},

})