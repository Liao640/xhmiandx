Page({
  data: {
    delBtnWidth: 140,
    currentTabIndex: 0,
    userName: '林瑞鹏',
    employeNum: '12345678',
    // 收藏列表
    collectionList: [
      {
        fileName: '中海物业文件-中海地产-电梯维保工程',
        collectionStatus: true
      },{
        fileName: '中海物业-中海华庭-电梯检修项目',
        collectionStatus: true
      }, {
        fileName: '中海物业文件-中海地产-电梯维保工程',
        collectionStatus: true
      }, {
        fileName: '中海物业-中海华庭-电梯检修项目',
        collectionStatus: true
      }, {
        fileName: '中海物业文件-中海地产-电梯维保工程',
        collectionStatus: true
      }, {
        fileName: '中海物业-中海华庭-电梯检修项目',
        collectionStatus: true
      }, {
        fileName: '中海物业文件-中海地产-电梯维保工程',
        collectionStatus: true
      }, {
        fileName: '中海物业-中海华庭-电梯检修项目',
        collectionStatus: true
      }, {
        fileName: '中海物业文件-中海地产-电梯维保工程',
        collectionStatus: true
      }, {
        fileName: '中海物业-中海华庭-电梯检修项目',
        collectionStatus: true
      }, {
        fileName: '中海物业文件-中海地产-电梯维保工程',
        collectionStatus: true
      }, {
        fileName: '中海物业-中海华庭-电梯检修项目',
        collectionStatus: true
      }
    ],
    isLoadMore: 0,
    collectionAllList: [],
    // 下载列表
    list: [
      {
        txtStyle: "",
        fileName: '中海物业文件-中海地产-电梯维保工程'
      },{
        txtStyle: "",
        fileName: '中海物业-中海华庭-电梯检修项目'
      }
    ],
    // 最近浏览
    recentViewList: [
      {
        fileName: '中海物业文件-中海地产-电梯维保工程',
        collectionStatus: true
      },{
        fileName: '中海物业-中海华庭-电梯检修项目',
        collectionStatus: true
      }
    ]
  },
  onLoad: function (options) {
    this.initEleWidth()
    this.getCollectList()
  },
  // tab栏切换
  onTabItemTap: function (e) {
    var index = e.currentTarget.dataset.index
    this.setData({
      currentTabIndex: index
    })
  },
  // 获取收藏文件列表
  getCollectList: function () {
    var that = this
    wx.request({
      url: 'https://xy-mind.com',
      success: function (res) {
        var data = res.data.data
        that.setData({
          // collectionList : data
        })
      }
    })
  },
  // 收藏列表====收藏&取消收藏
  clickCollect: function (e) {
    var that = this
    var index = e.target.dataset.index
    var list = that.data.collectionList
    if (list[index].collectionStatus) {
      list[index].collectionStatus = false
    } else {
      list[index].collectionStatus = true
    }
    that.setData({
      collectionList: list
    })
    wx.showToast({
      title: list[index].collectionStatus ? "取消收藏" : "收藏成功",
      icon: 'success',
      duration: 1000,
      mask: true
    })
  },
  // 最近浏览====收藏&取消收藏
  recentView: function (e) {
    var that = this
    var index = e.target.dataset.index
    var list = that.data.recentViewList
    if (list[index].collectionStatus) {
      list[index].collectionStatus = false
    } else {
      list[index].collectionStatus = true
    }
    that.setData({
      recentViewList: list
    })
    wx.showToast({
      title: list[index].collectionStatus ? "取消收藏" : "收藏成功",
      icon: 'success',
      duration: 1000,
      mask: true
    })
  },
  // 下载文件
  downLoadFile: function (event) {
    var url = 'https://xy-mind.com/tempPdf'
    wx.downloadFile({
      url: url,
      success: function (res) {
        var filePath = res.tempFilePath
        // 打开文档
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            console.log('打开文档成功')
          }
        })
      },
      fail: function (res) {
        throw Error
      },
      complete: function (res) { },
    })
  },

  // 打开文档
  // openFile: function () {
  //   wx.openDocument({
  //     filePath: filePath,
  //     success: function (res) {
  //       console.log('打开文档成功')
  //     }
  //   })
  // },

  // 页面渲染完成
  onReady: function () {

  },
  onShow: function () {
    this.setData({
      currentTabIndex: 0
    })
  },
  // 页面隐藏
  onHide: function () {
  },
  // 页面关闭
  onUnload: function () {
  },
  touchS: function (e) {
    if (e.touches.length == 1) {
      this.setData({
        startX: e.touches[0].clientX
      });
    }
  },
  touchM: function (e) {
    var that = this
    that.initdata(that)
    if (e.touches.length == 1) {
      var moveX = e.touches[0].clientX;
      var disX = this.data.startX - moveX;
      var delBtnWidth = this.data.delBtnWidth;
      var txtStyle = "";
      if (disX == 0 || disX < 0) {
        txtStyle = "left:0px";
      } else if (disX > 0) {
        txtStyle = "left:-" + disX + "px";
        if (disX >= delBtnWidth) {
          txtStyle = "left:-" + delBtnWidth + "px";
        }
      }
      var index = e.target.dataset.index;
      var list = this.data.list;
      list[index].txtStyle = txtStyle; 
      this.setData({
        list: list
      });
    }
  },
  touchE: function (e) {
    if (e.changedTouches.length == 1) {
      var endX = e.changedTouches[0].clientX;
      var disX = this.data.startX - endX;
      var delBtnWidth = this.data.delBtnWidth;
      var txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "px" : "left:0px";
      var index = e.target.dataset.index;
      var list = this.data.list;
      list[index].txtStyle = txtStyle;
      this.setData({
        list: list
      });
    }
  },
  //获取元素自适应后的实际宽度  
  getEleWidth: function (w) {
    var real = 0;
    try {
      var res = wx.getSystemInfoSync().windowWidth;
      var scale = (750 / 2) / (w / 2);
      real = Math.floor(res / scale);
      return real;
    } catch (e) {
      return false;
    }
  },
  // 初始元素宽度
  initEleWidth: function () {
    var delBtnWidth = this.getEleWidth(this.data.delBtnWidth);
    this.setData({
      delBtnWidth: delBtnWidth
    });
  },
  //点击删除按钮事件  
  delItem: function (e) {
    var that = this
    wx.showModal({
      title: '提示',
      content: '是否删除？',
      success: function (res) {
        if (res.confirm) { 
          var index = e.target.dataset.index;
          var list = that.data.list;
          list.splice(index, 1);
          that.setData({
            list: list
          });
        } else {
          that.initdata(that)
        }
      }
    })
  },
  // 初始数据
  initdata: function (that) {
    var list = that.data.list
    for (var i = 0; i < list.length; i++) {
      list[i].txtStyle = ""
    }
    that.setData({ list: list })
  }
})