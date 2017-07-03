import { Movie } from 'class/Movie.js';
var app = getApp();
Page({
  data: {
    movieDetail: {},
    db_score: {},
    visible: false,
    imgalist: []
  },
  onLoad: function (options) {
    var that = this;
    var movieId = options.id;
    wx.request({
      url: 'https://www.top-dytt.cn/dianying/queryMovieDetailInfoByMovieId',
      method: 'POST',
      data: {
        movieId: movieId
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          movieDetail: res.data.data,
          visible: true,
          db_score: res.data.data.tMovie.db_score
        });
        console.log(res.data.data);
      },
      fail: function (error) {
        console.log(error)
      }
    },
    
    );
    
  },

  

  /*发送消息*/
  sendBdyInfoSubmit: function (e) {
    console.log('我要发送百度云消息', e)
    var formId = e.detail.formId;
    console.log(formId)
    var uuid = wx.getStorageSync("uuid")
    console.log(uuid)
    var movieId = 1;
    console.log(Movie);
    //发送消息
    wx.request({
      url: 'https://www.top-dytt.cn/dianying/sendBdyMsg',
      method: "POST",
      data: {
        form_id: formId,
        movieId: movieId,
        uuid: uuid
      },
      fail: function (res_send) {
        console.log(res_send.data.msg)
      },
      success: function (res_send) {
        console.log(res_send.data.msg)
      }
    })

  },
  onMoreTap: function (event) {
    var movieid = event.currentTarget.dataset.movieid;
    console.log(movieid)
    wx.navigateTo({
      url: "/pages/movies/movie-imageview/movie-imageview?movieid=" + movieid
    })
  },


  /**   
 * 预览图片  
 */
  previewImage: function (e) {
    var current = e.target.dataset.src;
    var _this =this;
    var movidId = _this.data.movieDetail.tMovie.id;
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
        _this.setData({
          imgalist: res.data.data
        });
      }
    })

    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: _this.data.imgalist // 需要预览的图片http链接列表  
    })
  },

})
