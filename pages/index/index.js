var util = require('../../utils/util.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    welcome_list: [1, 2, 3, 4, 6],
    hotmovies_2016: [],
    hotmovies_2017: [],
    hotmovies_douban_top: [],
    hiddenLoading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var dataUrl = app.globalData.dianyingBase + "queryMoviesByType";
    that.queryMoviesByType(dataUrl,["102","103","104"]);
  },
  onReady: function () {

  },
  onShow: function () {
     
  },
  queryMoviesByType: function (dataUrl, typeListStrs) {
    var that = this;
    wx.request({
      url: dataUrl,
      data: {
        typeListStrs: typeListStrs,
        welcomeFlag: "YES"
      },
      method: 'POST',
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
       
        console.log(res.data.data)
        var allMovies = res.data.data;

        /*readyData["hotmovies_2017"] = {
          categoryTitle: "2017豆瓣年度最热",
          movies: allMovies[102]
        }
        that.setData(readyData);

        readyData["hotmovies_2016"] = {
          categoryTitle: "2016豆瓣年度最热",
          movies: allMovies[103]
        }
        that.setData(readyData);

        readyData["hotmovies_douban_top"] = {
          categoryTitle: "豆瓣top50",
          movies: allMovies[104]
        }
        that.setData(readyData);*/
        that.processDoubanData(allMovies[102],102);
        that.processDoubanData(allMovies[103],103);
        that.processDoubanData(allMovies[104],104);
        that.setData({
          hiddenLoading: true
        })
      },
      fail: function (error) {
        console.log(error.msg);
      }
    });

  },
  processDoubanData: function (moviesDouban,typeStr) {
    var _that =this;
    var readyData = {};
    var movies = [];
    for (var idx in moviesDouban) {
      var subject = moviesDouban[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      var temp = {
        id: subject.id,
        title: title,
        db_score: subject.db_score,
        images: subject.images,
        db_stars: subject.db_stars
      }
      movies.push(temp)
    }

    if(typeStr =='102'){
      readyData["hotmovies_2017"] = {
        categoryTitle: "2017豆瓣年度最热",
        movies: movies
      }
    } else if (typeStr == '103'){
      readyData["hotmovies_2016"] = {
        categoryTitle: "2016豆瓣年度最热",
        movies: movies
      }
    } else if (typeStr == '104'){
      readyData["hotmovies_douban_top"] = {
        categoryTitle: "豆瓣top50",
        movies: movies
      }
    }

    _that.setData(readyData);

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