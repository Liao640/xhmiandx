// pages/article/article.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    document: [],
    size: null,
    saveData: [],
    page: 1,
    per: 10,
    docData:[]
  },
  // 下载文件
  downLoadFile: function (event) {
    var url = 'https://xhreading.xy-mind.com/api/users/list_c_b'
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
  //打开文件
  openDocuments: function (event) {
    var that = this;
    var id = event.currentTarget.dataset.id
    var url = 'https://xhreading.xy-mind.com'
    var filePath = url + event.currentTarget.dataset.src;
    // // 打开文档
    wx.downloadFile({
      url: filePath,
      success: function (res) {
        var filePath = res.tempFilePath;
        wx.openDocument({
          filePath: filePath,
        })
      }
    })
    wx.request({
      url: "https://xhreading.xy-mind.com/api/users/click_collection",
      method: "POST",
      data: {
        doc_file_id: id,
        c_type: "Browser",
      },
      header: {
        Usertoken: app.globalData.Usertoken
      },
      success: function (res) {
      }
    })
  },
  //下载数据到本地
  downData: function (e) {
    var that = this;
    that.data.size += e.currentTarget.dataset.item.file_size;
    if (that.data.size < 10485760) {
      wx.showModal({
        title: '提示',
        content: '下载已完成 在个人中心查看',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
          } else if (res.cancel) {
          }
        }
      }),
      wx.getStorage({
        key: 'key',
        success: function (res) {
          that.data.saveData = res.data
          that.data.saveData = [...that.data.saveData, e.currentTarget.dataset.item]
          wx.setStorage({
            key: "key",
            data: that.data.saveData
          })
        },
        fail: function () {
          that.data.saveData = [...that.data.saveData, e.currentTarget.dataset.item]
          wx.setStorage({
            key: "key",
            data: that.data.saveData
          })
        },
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '文件超过10M，不能下载哦',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
          } else if (res.cancel) {
          }
        }
      })
    }
  },
  // 按照文件标题搜索
  searchValueInput: function (e) {
    var that = this;
    var value = e.detail.value;
    that.setData({
      searchValue: value,
    });
    wx.request({
      url: "https://xhreading.xy-mind.com/api/home/doc_files",
      method: "GET",
      data: {
        catalog_id: that.data.id,
        name: value
      },
      header: {
        Usertoken: app.globalData.Usertoken
      },
      success: function (res) {
        if (res.data.status == 201) {
          that.setData({
            document: res.data.data
          })
        }
      }
    })
  },
  //收藏数据
  clickCollect: function (e) {
    var that = this
    var index = e.target.dataset.index;
    var id = e.target.dataset.id;
    var list = that.data.document;
    if (list[index]) {
      list[index].is_c = true;
    } else {
      // list[index].file_name = false;
    }
    that.setData({
      document: list
    })
    wx.request({
      url: "https://xhreading.xy-mind.com/api/users/click_collection",
      method: "POST",
      data: {
        doc_file_id: id,
        c_type: "Collection",
      },
      header: {
        Usertoken: app.globalData.Usertoken
      },
      success: function (res) {
        if (res.data.status == 201) {
          wx.showToast({
            title: "收藏成功",
            icon: 'success',
            duration: 500,
            mask: true
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    this.setData({
      id: options.id
    }),
      wx.request({
        url: "https://xhreading.xy-mind.com/api/home/doc_files",
        method: "GET",
        data: {
          catalog_id: that.data.id
        },
        header: {
          Usertoken: app.globalData.Usertoken
        },
        success: function (res) {
          if (res.data.status == 201) {
            that.setData({
              document: res.data.data
          })
        }
      }
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function (per) {
    var that = this;
    this.setData({
      id: that.data.id
    }),
      wx.request({
        url: "https://xhreading.xy-mind.com/api/home/doc_files",
        method: "GET",
        data: {
          catalog_id: that.data.id,
          per: that.data.per += 10,
        },
        header: {
          Usertoken: app.globalData.Usertoken
        },
        success: function (res) {
          if (res.data.status == 201  ) {
            that.data.docData = res.data.data
            if (that.data.document.length && that.data.document.length < res.data.total_count) {
              wx.showToast({
                title: "加载中...",
                icon: 'success',
                mask: true,
                success:function(){
                  that.setData({
                  document: that.data.docData
                })
              }
            })     
          }
        }
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
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
})