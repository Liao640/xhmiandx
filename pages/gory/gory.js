var app = getApp()

Page({
  data: {
    currentTabIndex: 0,
    userName: '',
    employeNum: '12345678',
    // 收藏列表
    collectionList: [],
    // 下载列表
    middleArr: [],
    edit: false,
    select_all: false,
    downList: [],
    // 最近浏览
    recentViewList: [],
    per:10
  },
  // 页面渲染完成
  onReady: function () {},
  // 页面显示
  onShow: function () {
    let that = this
    wx.getStorage({
      key: 'key',
      success: function (res) {
        console.log(res)
        that.setData({
          downList: res.data
        })
      }
    })
  },
  // 页面隐藏
  onHide: function () {},
  // 页面关闭
  onUnload: function () {},
  // 页面加载
  onLoad: function (options) {
    let that = this
    that.setData({
      userName: app.globalData.nickName
    })
    this.getCollectList()
  },
  // tab栏切换
  onTabItemTap: function (e) {
    this.recentView()
    var index = e.currentTarget.dataset.index
    this.setData({
      currentTabIndex: index
    })
  },
  // 收藏列表----------------------------------
  getCollectList: function () {
    var that = this
    wx.request({
      url: 'https://xhreading.xy-mind.com/api/users/list_c_b',
      method: 'GET',
      data: {
        'c_type': 'Collection'
      },
      header: {
        Usertoken: app.globalData.Usertoken
      },
      success: function (res) {
        var data = res.data.data
        that.setData({
          collectionList : data
        })
      }
    })
  },
  // 收藏&取消收藏
  // clickCollect: function (e) {
  //   var that = this
  //   var index = e.target.dataset.index
  //   var list = that.data.collectionList
  //   if (list[index].collectionStatus) {
  //     list[index].collectionStatus = false
  //   } else {
  //     list[index].collectionStatus = true
  //   }
  //   that.setData({
  //     collectionList: list
  //   })
  //   wx.showToast({
  //     title: list[index].collectionStatus ? "取消收藏" : "收藏成功",
  //     icon: 'success',
  //     duration: 1000,
  //     mask: true
  //   })
  // },
  // 下载列表----------------------------------------
  // 打开文档
  openDocuments: function (e) {
    var that = this
    var url = 'https://xhreading.xy-mind.com'
    var filePath = url + e.currentTarget.dataset.url
    wx.downloadFile({
      url: filePath,
      success: function (res) {      
        var filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
        })
      }
    })
  },
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
    if (that.data.edit == false) {
      return
    } else {
      var arr2 = that.data.downList
      var index = e.currentTarget.dataset.id
      arr2[index].checkStatu = !arr2[index].checkStatu
      for (let i = 0; i < arr2.length; i++) {
        if (arr2[i].checkStatu) {
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
    if (that.data.select_all) {
      let arr = that.data.downList
      let arr2 = []
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].checkStatu == true) {
          arr2.push(arr[i])
        } else {
          arr[i].checkStatu = true
          arr2.push(arr[i])
        }
      }
      that.setData({
        downList: arr2
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
    for (let i = 0; i < arr.length; i++) {
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
    if (arr.length) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].checkStatu) {
          wx.showModal({
            title: '提示',
            content: '是否删除？',
            success: function (res) {
              if (res.confirm) {
                for (let i = 0; i < arr.length; i++) {
                  if (!arr[i].checkStatu) {
                    arr2.push(arr[i])
                    wx.setStorage({
                      key: 'key',
                      data: arr2
                    })
                  } else {
                    wx.removeStorage({
                      key: 'key',
                      success: function(res) {
                        data: arr2
                      },
                    })
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
    } else {
      wx.showModal({
        title: '提示',
        content: '请选择文件',
        showCancel: false
      })
    }
  },
  // 最近浏览------------------------------------
  recentView: function (e) {
    var that = this
    wx.request({
      url: 'https://xhreading.xy-mind.com/api/users/list_c_b',
      method: 'GET',
      data: {
        'c_type': 'Browser'
      },
      header: {
        Usertoken: app.globalData.Usertoken
      },
      success: function (res) {
        var data = res.data.data     
        that.setData({
          recentViewList: data
        })
      }
    })
    // var index = e.target.dataset.index
    // var list = that.data.recentViewList
    // if (list[index].collectionStatus) {
    //   list[index].collectionStatus = false
    // } else {
    //   list[index].collectionStatus = true
    // }
    // that.setData({
    //   recentViewList: list
    // })
    // wx.showToast({
    //   title: list[index].collectionStatus ? "取消收藏" : "收藏成功",
    //   icon: 'success',
    //   duration: 1000,
    //   mask: true
    // })
  },
  //上拉加载更多
  onReachBottom: function () {
    var that = this;
      wx.request({
      url: 'https://xhreading.xy-mind.com/api/users/list_c_b',
      method: 'GET',
      data: {
        'c_type': 'Collection',
        'per':that.data.per+=10
      },
      header: {
        Usertoken: app.globalData.Usertoken
      },
        success: function (res) {
          if (res.data.status == 200) {
            var data = res.data.data
            if (that.data.collectionList.length && that.data.collectionList.length < res.data.total_count) {
              wx.showToast({
                title: "加载中...",
                icon: 'success',
                mask: true,
                success: function () {
                  that.setData({
                    collectionList: data
                  })
                }
              })
            }
          }
        }
      })
  },
})
