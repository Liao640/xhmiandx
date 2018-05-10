Page({
  data: {
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
    // 下载列表
    downList: [
      {
        txtStyle: "",
        fileName: '中海物业文件-中海地产-电梯维保工程'
      },{
        txtStyle: "",
        fileName: '中海物业-中海华庭-电梯检修项目'
      }
    ],
    iconStatu: false,
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

  showSelIcon () {
    this.setData({
      iconStatu: !this.data.iconStatu
    })
  },
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
  }
})