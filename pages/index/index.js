var util = require('../../utils/util.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    welcome_list:[1,2,3,4,6],
    hotmovies_2016:[],
    hotmovies_2017: [],
    hotmovies_douban_top:[],
    hiddenLoading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this;
    var dataUrl = app.globalData.dianyingBase + "queryMoviesByType";
    that.queryMoviesByType(dataUrl, "103", "hotmovies_2017", "2017豆瓣年度最热")

    that.queryMoviesByType(dataUrl, "102", "hotmovies_2016", "2016豆瓣年度最热")

    that.queryMoviesByType(dataUrl, "104", "hotmovies_douban_top", "豆瓣top50")

    this.setData({
      hiddenLoading: true
    })
  },
  queryMoviesByType: function (dataUrl, typeStr, categoryDatas, categoryTitle){
    var that=this;
    wx.request({
      url: dataUrl,
      data: {
        typeStr: typeStr,
        welcomeFlag: "YES"
      },
      method: 'POST',
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        var readyData = {};
        readyData[categoryDatas] = {
          categoryTitle: categoryTitle,
          movies: res.data.data
        }
        that.setData(readyData);
      },
      fail: function (error) {
        console.log(error.msg);
      }
    });
  },


  onMovieTap: function (event) {
    var movieId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: '/pages/movies/movie-detail/movie-detail?id=' + movieId
    })
  },

  onMoreTap: function (event) {
    var category = event.currentTarget.dataset.category;
    wx.navigateTo({
      url: "index-more-movie/index-more-movie?category=" + category
    })
  },
})