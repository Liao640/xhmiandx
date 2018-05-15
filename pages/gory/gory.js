var app = getApp()

Page({
  data: {
    currentTabIndex: 0,
    userName: '',
    employeNum: '12345678',
    // 收藏列表
    collectionList: [],

    // 下载列表
    middleArr:[],
    edit: false,
    select_all: false,
    downList: [],

    // 最近浏览
    recentViewList: []
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
  },
  onLoad: function (options) {
    let that = this
    that.setData({
      userName: app.globalData.nickName
    })
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
  // 收藏列表-------------------------------------------
  lower: function (e) {
    console.log('e', e)
  },

  // 下载列表逻辑功能----------------------------------------
  edit: function () {
    let that = this
    that.setData({
      edit: true
    })
  },
  cancel_edit: function () {
    let that = this
    that.setData({
      edit: false
    })
  },
  // 选择
  select: function (e) {
    var that = this
    let arr = []
    if(that.data.edit == false){
      return
    }else{
      var arr2 = that.data.downList
      var index = e.currentTarget.dataset.id
      arr2[index].checkStatu = !arr2[index].checkStatu
      for(let i=0; i<arr2.length; i++){
        if(arr2[i].checkStatu){
          arr.push(arr2[i])
        }
      }
      that.setData({
        downList: arr2,
        middleArr: arr
      })
    }
  },
  // 全选
  select_all: function () {
    let that = this
    that.setData({
      select_all: !that.data.select_all
    })
    if(that.data.select_all){
      let arr = that.data.downList
      let arr2 = []
      for(let i=0; i<arr.length; i++){
        if(arr[i].checkStatu == true){
          arr2.push(arr[i])
        }else{
          arr[i].checkStatu = true
          arr2.push(arr[i])
        }
      }
      that.setData({
        downList: arr2,
        middleArr: arr2
      })
    }
  },
  // 取消全选
  select_none: function () {
    let that = this
    that.setData({
      select_all: !that.data.select_all
    })
    let arr = that.data.downList
    let arr2 = []
    for(let i=0; i<arr.length; i++){
      arr[i].checkStatu = false
      arr2.push(arr[i])
    }
    that.setData({
      downList: arr2,
      middleArr: []
    })
  },
  // 删除
  del: function () {
    var that = this
    let arr = that.data.downList
    let arr2 = []
    if(arr){
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].checkStatu) {
          wx.showModal({
            title: '提示',
            content: '是否删除？',
            success: function (res) {
              if(res.confirm){
                for (let i = 0; i < arr.length; i++) {
                  if (!arr[i].checkStatu) {
                    arr2.push(arr[i])
                  }
                }
                that.setData({
                  downList: arr2
                })
              }
            }
          })
        }
      }
    }else{
      wx.showToast({
        title: '请选择文件',
        icon: 'loading',
        duration: 1000
      })
    }
  }
})