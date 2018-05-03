Page({
  data: {
    delBtnWidth: 160,//删除按钮宽度单位（rpx）
    currentTabIndex: 0,
    userName: '林瑞鹏',
    employeNum: '12345678',
    // 收藏列表
    collectionList: [
      {
        fileName: '中海物业文件-中海地产-电梯维保工程',
        collectionStatus: true
      },
      {
        fileName: '中海物业-中海华庭-电梯检修项目',
        collectionStatus: true
      }
    ],
    // 下载列表
    list: [
      {
        txtStyle: "",
        fileName: '中海物业文件-中海地产-电梯维保工程'
      },
      {
        txtStyle: "",
        fileName: '中海物业-中海华庭-电梯检修项目'
      }
    ],
    // 最近浏览
    recentlyList: [
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
  // 获取文件列表
  getCollectList: function () {
    var that = this
    wx.request({
      url: 'https://xy-mind.com',
      success: function (res) {
        var data = res.data.data
        console.log(data)
        that.setData({
          // fileList : data
        })
      }
    })
  },
  // 收藏&取消收藏
  clickCollect: function (e) {
    console.log(e)
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
      title: this.data.collectionStatus ? "取消收藏" : "收藏成功",
      icon: 'success',
      duration: 1000,
      mask: true
    })
  },



  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  touchS: function (e) {
    if (e.touches.length == 1) {
      this.setData({
        //设置触摸起始点水平方向位置
        startX: e.touches[0].clientX
      });
    }
  },
  touchM: function (e) {
    var that = this
    that.initdata(that)
    if (e.touches.length == 1) {
      //手指移动时水平方向位置
      var moveX = e.touches[0].clientX;
      //手指起始点位置与移动期间的差值
      var disX = this.data.startX - moveX;
      var delBtnWidth = this.data.delBtnWidth;
      var txtStyle = "";
      //如果移动距离小于等于0，文本层位置不变
      if (disX == 0 || disX < 0) {
        txtStyle = "left:0px";
      //移动距离大于0，文本层left值等于手指移动距离
      } else if (disX > 0) {
        txtStyle = "left:-" + disX + "px";
        if (disX >= delBtnWidth) {
          //控制手指移动距离最大值为删除按钮的宽度  
          txtStyle = "left:-" + delBtnWidth + "px";
        }
      }
      //获取手指触摸的是哪一项  
      var index = e.target.dataset.index;
      var list = this.data.list;
      list[index].txtStyle = txtStyle;
      //更新列表的状态  
      this.setData({
        list: list
      });
    }
  },
  touchE: function (e) {
    if (e.changedTouches.length == 1) {
      // 手指移动结束后水平位置  
      var endX = e.changedTouches[0].clientX;
      // 触摸开始与结束，手指移动的距离  
      var disX = this.data.startX - endX;
      var delBtnWidth = this.data.delBtnWidth;
      // 如果距离小于删除按钮的1/2，不显示删除按钮  
      var txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "px" : "left:0px";
      // 获取手指触摸的是哪一项  
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
      //以宽度750px设计稿做宽度的自适应
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