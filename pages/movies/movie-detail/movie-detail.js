import { Movie } from 'class/Movie.js';
var app = getApp();
Page({
  data: {
    movieDetail: {},
    db_score:{},
    visible: false
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
          visible: true  ,
          db_score: res.data.data.tMovie.db_score     
          }); 
        console.log(res.data.data.tMovie.name);
      },
      fail: function (error) {
        console.log(error)
      }
    }
    );
  },

  /*查看图片*/
  viewMoviePostImg: function (e) {
    var src = e.currentTarget.dataset.src;
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: [src] // 需要预览的图片http链接列表
    })
  },

  /*发送消息*/
  sendBdyInfoSubmit: function(e){
    console.log('我要发送百度云消息',e)
    var formId =e.detail.formId;
    console.log(formId)
    var uuid =wx.getStorageSync("uuid")
    console.log(uuid)
    var movieId=1;
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

  }
})
