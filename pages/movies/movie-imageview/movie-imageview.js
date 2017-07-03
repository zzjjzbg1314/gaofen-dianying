var app = getApp()
Page({
  data: {
    imgalist: []
  },

  onLoad: function (options) {
    var that =this;
    var movidId = options.movieid;
    console.log(movidId)
    var url = app.globalData.dianyingBase + "queryImageListByMovieId";
    wx.request({
      url: url,
      method: "POST",
      data: {
        movieId: movidId
      },
      fail: function (res) {
        console.log(res.data.msg)
      },
      success: function (res) {
        console.log(res.data.data)
        that.setData({
          imgalist: res.data.data
        });

        console.log(that.getData);
      }
    })
  },
  /**   
   * 预览图片  
   */
  previewImage: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.imgalist // 需要预览的图片http链接列表  
    })
  },

  
}) 