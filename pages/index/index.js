var app = getApp();
Page({
  data: {
    isLogin: true,
    userName: '',
    password: '',
    page: 1,
    per: 10,
    obj: {},
    srcData:{},
    allData:[],
    objData:[],
    pathData:[],
    childData: [],
    currentTabIndex: 0,
    searchLoading: false, //"上拉加载"的变量，默认false，隐藏  
    searchLoadingComplete: false, //“没有数据”的变量，默认false，隐藏
    setdata: [],
    test: null,
    textData: [],
    directory:[],
    imageData: [{
      img1: '../../imgs/pumpkin.png'
    },
    {
      img1: '../../imgs/leaf.png'
    },
    {
      img1: '../../imgs/back_b.png'
    },
    {
      img1: '../../imgs/YanTao.png'
    }
    ]
  },
  //上滑刷新
  lower: function (e) {
    console.log("加载更多");

  },
  click: function (e) {
    var that = this;
    this.setData({
      test: e.currentTarget.dataset.index
    })
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
        res.data.data.map((item, key) => {
          that.data.childData[key] = item.children;
          that.data.childData[key] = item.children;
        })
        that.data.childData.map((item,key) => {
          that.data.directory = item;
        })
        that.data.directory.map((item,key) => {
          that.data.obj.id = item.id;
          that.data.obj.name = item.name;
          that.data.objData[key] = that.data.obj;
        })
        var imgUrl = ['../../imgs/pumpkin.png', '../../imgs/leaf.png', '../../imgs/back_b.png','../../imgs/YanTao.png']
        // console.log(that.data.objData.length);
          for (var i = 0; i < that.data.objData.length; i++){
            var pashobj = {}
            pashobj.src = imgUrl[i % 4];
            that.data.pathData[i] = pashobj;
          }
          that.setData({
            pathData: pashobj
          })
          console.log(res);
        if (res.data.status == 201) {
          that.setData({//如果在sucess直接写this就变成了wx.request()的this了.必须为getdata函数的this,不然无法重置调用函数
            setdata: res.data.data,
          })
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