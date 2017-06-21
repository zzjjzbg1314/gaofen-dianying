// pages/movies/more-movie/more-movie.js
var app = getApp()
var util = require('../../../utils/util.js')
Page({
  data: {
    movies: {},
    navigateTitle: "",
    requestUrl: "",
    totalCount: 0,
    isEmpty: true,
    hiddenLoading:false,
    disabledRemind:false
  },
  onLoad: function (options) {
    var that = this
    var category = options.category;
    this.data.navigateTitle = category;
    var typeStr= "";
    switch (category){
      case "豆瓣top50":
        typeStr = "104";
        break;
      case "2017豆瓣年度最热":
        typeStr = "103";
        break;
      case "2016豆瓣年度最热":
        typeStr = "102";
        break;
    }
    wx.setNavigationBarTitle({
      title: category
    })
    var dataUrl = app.globalData.dianyingBase + "queryMoviesByType";
    wx.request({
      url: dataUrl,
      data: {
        typeStr: typeStr
      },
      method: 'POST',
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        var pre_movies=res.data.data;
        that.processDoubanData(pre_movies)
      },
      fail: function (error) {
        console.log(error);
      }
    });

  },
  processDoubanData: function (moviesDouban) {
    var movies = [];
    //没有更多啦
    if (moviesDouban.length <= 0) {
      var _this = this;
      if (!_this.data.disabledRemind) {
        _this.setData({
          disabledRemind: true
        });
        setTimeout(function () {
          _this.setData({
            disabledRemind: false
          });
        }, 2000);
      }
    }
    for (var idx in moviesDouban) {
      var subject = moviesDouban[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      // [1,1,1,1,1] [1,1,1,0,0]
      var temp = {
        id:subject.id,
        title: title,
        db_score: subject.db_score,
        images: subject.images,
        db_stars: subject.db_stars
      }
      movies.push(temp)
    }
    var totalMovies = {}

    //如果要绑定新加载的数据，那么需要同旧有的数据合并在一起
    if (!this.data.isEmpty) {
      totalMovies = this.data.movies.concat(movies);
    }
    else {
      totalMovies = movies;
      this.data.isEmpty = false;
    }
    this.setData({
      movies: totalMovies
    });
    this.data.totalCount += 20;
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh()
    this.setData({
      hiddenLoading: true
    })
  },

  onReady: function (event) {
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle
    })
  },

  onMovieTap: function (event) {
    var movieId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: '/pages/movies/movie-detail/movie-detail?id=' + movieId
    })
  },

})