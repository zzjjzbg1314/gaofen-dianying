App({
  globalData: {
    g_isPlayingMusic: false,
    g_currentMusicPostId: null,
    doubanBase: "https://api.douban.com",
    dianyingBase:"https://www.top-dytt.cn/dianying/"
  },
  onLaunch: function () {
    this.getUserDataToken();
  },
  getUserDataToken: function () {
    wx.login({
      success: function (res_login) {
        var code = res_login.code;
        wx.request({
          url: 'https://www.top-dytt.cn/dianying/checkLogin',
          method: "POST",
          data: {
            code: code
          },
          fail: function (res_check_login) {
            console.log(res_check_login)
          },
          success: function (res_check_login) {
            var uuid = res_check_login.data.data.uuid;
            //设置用户缓存
            wx.setStorageSync("uuid", uuid);
            wx.getUserInfo({
              withCredentials:true,
              success: function (res_user_info) {
                //获取用户敏感数据密文和偏移向量
                var encryptedData = res_user_info.encryptedData;
               var  iv = res_user_info.iv;
                wx.request({
                  url: 'https://www.top-dytt.cn/dianying/decodeUserInfo',
                  method: "POST",
                  data: {
                    encryptedData: encryptedData,
                    iv: iv,
                    uuid:uuid
                  },
                  fail: function (res_decodeUserInfo) {
                    console.log(res_decodeUserInfo)
                  },
                  success: function (res_decodeUserInfo){
                    //console.log(res_decodeUserInfo)
                  }
                })
              }
            })
          }
        })
      }
    })    
      }

});