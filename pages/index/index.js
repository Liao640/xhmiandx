Page({
  data: {
    isLogin: true,
    userName: '',
    password: '',
    currentTabIndex: 0,
    setdata: [
      {
        cation: '国家规范',
      },
      {
        cation: '地区规范',
      },
      {
        cation: '施工验收',
      },
      {
        cation: '行业标准',
      },
      {
        cation: '注册考试',
      }
    ]
  },
  click: function (e) {
    var index = e.currentTarget.dataset.index
    this.setData({
      currentTabIndex: index
    })
  },
  // 获取用户名
  userNameInput: function(e) {
    this.setData({
      userName: e.detail.value
    })
  },
  // 获取用户密码
  passwordInput: function(e) {
    this.setData({
      password: e.detail.value
    })
  },
  // 首页
  onImgJump: function(e){
    wx.navigateTo({
      url: '../article/article'
    })
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

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      currentTabIndex: 0
    })
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