Page({
  data: {
    currentTabIndex: 0,
    fileList: [
      {
        fileName: '中海物业文件-中海地产-电梯维保工程',
        collectionStatus: true
      },
      {
        fileName: '中海物业-中海华庭-电梯检修项目',
        collectionStatus: true
      }
    ]
  },
  // tab栏切换
  onTabItemTap: function (e) {
    var index = e.currentTarget.dataset.index
    this.setData({
      currentTabIndex:index
    })
  },
  // 收藏&取消收藏
  clickCollect: function () {
    if (this.data.collectionStatus) {
      this.setData({
        collectionStatus: false
      })
    } else {
      this.setData({
        collectionStatus: true
      })
    }
    wx.showToast({
      title: this.data.collectionStatus ? "取消收藏" :"收藏成功",
      icon: 'success',
      duration: 1000,
      mask: true
    })
  },
  downLoadFile: function(event) {
    wx.request({
      url: 'https://xy-mind.com',
      success:function(res) {
        wx.showToast({
          title: '789',
          duration: 10000
        })
        console.log(res)
      }
    })
    
    var url = 'https://xy-mind.com/tempPdf'
    wx.downloadFile({
      url: url,
      success: function (res) {
        wx.showToast({
          title: '123213',
        })
        var filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            console.log('打开文档成功')
          }
        })
      },
      fail: function (res) {
        console.log(res)
        console.log('下载失败')
      },
      complete: function (res) { },
    })
  },




  // 生命周期函数--监听页面加载
  onLoad: function (options) {
  },
  // 生命周期函数--监听页面初次渲染完成
  onReady: function () {
    
  },

  // 生命周期函数--监听页面显示
  onShow: function () {
    this.setData({
      currentTabIndex: 0
    })
  },

  // 生命周期函数--监听页面隐藏
  onHide: function () {

  },

  // 生命周期函数--监听页面卸载
  onUnload: function () {
  
  },

  // 页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function () {
  
  },

  // 页面上拉触底事件的处理函数
  onReachBottom: function () {
  
  },
})