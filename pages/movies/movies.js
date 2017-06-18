var util = require('../../utils/util.js')
var app = getApp();
Page({
  // RESTFul API JSON
  // SOAP XML
  //粒度 不是 力度
  data: {
    allMyMovies: [],
    comingSoon: {},
    remind: '加载中',
    type1: [],
    type2: [],
    type3: [],
    searchResult: {},
    containerShow: true,
    searchPanelShow: false,
  },
  onShareAppMessage: function () {
    return {
      title: '光与影',
      desc: '进入搜索电影吧',
      path: '/pages/movies/movies'
    }
  },
  onLoad: function (event) {
    var that = this;
    wx.request({
      url: 'https://www.top-dytt.cn/dianying/queryall',
      method: 'GET',
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        var readyData = {};
        readyData['allMyMovies'] = {
          categoryTitle: '我的电影',
          movies: res.data.data
        }
        that.setData(readyData);      
        var type1 = [
          {
            'typeId': 1,
            'desc': '爱情'
          },
          {
            'typeId': 2,
            'desc': '励志'
          },
          {
            'typeId': 3,
            'desc': '家庭'
          },
          {
            'typeId': 4,
            'desc': '科幻'
          },
          {
            'typeId': 5,
            'desc': '奇幻'
          },
          {
            'typeId': 6,
            'desc': '动画',
          },
          {
            'typeId': 14,
            'desc': '动作'
          }
        ];
        var type2 = [
          {
            'typeId': 13,
            'desc': '冒险'
          },
          {
            'typeId': 7,
            'desc': '犯罪'
          },
          {
            'typeId': 8,
            'desc': '悬疑'
          },
          {
            'typeId': 9,
            'desc': '战争'
          },
          {
            'typeId': 10,
            'desc': '记录'
          },
          {
            'typeId': 11,
            'desc': '华语'
          },
          {
            'typeId': 12,
            'desc': '印度'
          }
        ];

        var type3 = [
          {
            'typeId': 100,
            'desc': '全部'
          },
          {
            'typeId': 101,
            'desc': '最新'
          },
          {
            'typeId': 102,
            'desc': '热映'
          }
        ]

        var readyType={};
        readyType['type1'] = {
          type1: type1
        }
        that.setData(readyType);

        readyType['type2'] = {
          type2: type2
        }
        that.setData(readyType);

        readyType['type3'] = {
          type3: type3
        }
        that.setData(readyType);

        wx.hideNavigationBarLoading();
      },
      fail: function (error) {
        console.log(error)
      }
    })

  },

  onMoreTap: function (event) {
    var category = event.currentTarget.dataset.category;
    wx.navigateTo({
      url: "more-movie/more-movie?category=" + category
    })
  },

  onMovieTap: function (event) {
    var movieId = event.currentTarget.dataset.id;
    console.log(movieId)
    wx.navigateTo({
      url: "movie-detail/movie-detail?id=" + movieId
    })
  },

  selectMovieTap: function(event){
    var that = this;
    var typeStr = event.currentTarget.dataset.id;
    var typeDesc = event.currentTarget.dataset.desc;
    if(typeStr =='100'){
      wx.setNavigationBarTitle({
        title: '全部电影',
      })
      wx.request({
        url: 'https://www.top-dytt.cn/dianying/queryall',
        method: 'GET',
        header: {
          "Content-Type": "json"
        },
        success: function (res) {
          var readyData = {};
          readyData['allMyMovies'] = {
            categoryTitle: '我的电影',
            movies: res.data.data
          }
          that.setData(readyData);  
        }
      });  

    }else{
      wx.setNavigationBarTitle({
        title: typeDesc + '电影',
      })
      wx.request({
        url: 'https://www.top-dytt.cn/dianying/queryMoviesByType',
        data: {
          typeStr: typeStr
        },
        method: 'POST',
        header: {
          "Content-Type": "application/json"
        },
        success: function (res) {
          var readyData = {};
          readyData['allMyMovies'] = {
            categoryTitle: '我的电影',
            movies: res.data.data
          }
          that.setData(readyData);
        },
        fail: function (error) {
          console.log(error);
        }
      });
    }
    
    
  },

  onCancelImgTap: function (event) {
    this.setData({
      containerShow: true,
      searchPanelShow: false,
      searchResult: {}
    }
    )
  },

  onBindFocus: function (event) {
    this.setData({
      containerShow: false,
      searchPanelShow: true
    })
  },

  onBindBlur: function (event) {
    var text = event.detail.value;
    var searchUrl = app.globalData.doubanBase + "/v2/movie/search?q=" + text;
    this.getMovieListData(searchUrl, "searchResult", "");
  },
})