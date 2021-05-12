// index.js
// 获取应用实例
const app = getApp();
let db = wx.cloud.database();
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },

  gopost(){
    wx.navigateTo({
      url: '../mypost/mypost',
    })
  },
  gopublish(){
    wx.navigateTo({
      url: '../publish/publish',
    })
  },
  getUserProfile(e) {

    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        console.log("yonfg",res.userInfo);
        wx.setStorageSync('user', res.userInfo);
        app.globalData.userInfo = res.userInfo
      }
    })
  },
  onLoad() {
    
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    this.users();
    var user = wx.getStorageSync('user');
    var superRoot = wx.getStorageSync('superRoot');
    this.setData({
      userInfo: user,
      hasUserInfo: true,
      superRoot:superRoot
    })
  },
  


  users(){
    db.collection("user").where({
      _openid: 'openid'
    })
    .get()
    .then(res => {
      console.log("res", res);
      this.setData({
        userlist: res.data
      })
      let userlist = this.data.userlist;
      if (userlist.length == 0) {
        this.setuser()
        console.log("用户信息上传成功");
      } else {
        console.log("已有用户");
      }
    })
    .catch(err => {
      console.log("请求失败", err);
    })
  },
  setuser() {
    var user = wx.getStorageSync('user');
    db.collection("user").add({
        data: {
          username: user.nickName,
          userimg: user.avatarUrl,
          _createTime: new Date().getTime()
        }
      }).then(res => {
        console.log("用户信息上传成功", res);
      })
      .catch(res => {
        console.log("用户信息上传失败", res);
      })

  },
  tuichu(){
    this.setData({
      userInfo: '',
      hasUserInfo: false
    }) 
  },
  goAdmin(){
    wx.redirectTo({
      url: '/pages/admin/admin',
    })
  },
  goCollect(){
    wx.navigateTo({
      url: '/pages/collect/collect',
    })
  },
  goComment(){
    wx.navigateTo({
      url: '/pages/comment/comment',
    })
  },
 call(){
  wx.makePhoneCall({
    phoneNumber: '120' 
  })
 }
})
