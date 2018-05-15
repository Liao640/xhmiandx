var app = getApp();
Page({
  data: {
    isLogin: true,
    userName: '',
    password: '',
    page:1,
    per:10,
    currentTabIndex: 0,
    searchLoading: false, //"上拉加载"的变量，默认false，隐藏  
    searchLoadingComplete: false , //“没有数据”的变量，默认false，隐藏
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
  //上滑刷新
  lower: function (e) {
    console.log(e);
    console.log("加载更多");
    
  },
  click: function (e) {
    // console.log("1")
    var index = e.currentTarget.dataset.index
    this.setData({
      currentTabIndex: index
    })
  },
  // 列表数据
  // 首页
  onImgJump: function (e) {
    wx.navigateTo({
      url: '../article/article'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
      wx.request({
        url: 'https://xhreading.xy-mind.com/api/home/catalogs?page=that.page&per=that.per',
        method: 'GET',
        success: function (res) {
          console.log(res);
          if (res.data.status == 201) {
            
          }
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