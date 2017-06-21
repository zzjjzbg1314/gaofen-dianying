function convertToStarsArray(stars) {
  var num = stars.toString().substring(0, 1);
  var array = [];
  for (var i = 1; i <= 5; i++) {
    if (i <= num) {
      array.push(1);
    }
    else {
      array.push(0);
    }
  }
  return array;
}

function http(url, callBack) {
  wx.request({
    url: url,
    method: 'GET',
    header: {
      "Content-Type": "json"
    },
    success: function (res) {
      console.log(res.data.subjects[0].images.medium)
      console.log(res.data.subjects[0])
      callBack(res.data);
    },
    fail: function (error) {
      console.log(error)
    }
  })
}

function convertToCastString(casts) {
  var castsjoin = "";
  for (var idx in casts) {
    castsjoin = castsjoin + casts[idx].name + " / ";
  }
  console.log(castsjoin)
  return castsjoin.substring(0, castsjoin.length - 2);
}

function convertToCastInfos(casts) {
  var castsArray = []
  for (var idx in casts) {
    var cast = {
      img: casts[idx].avatars ? casts[idx].avatars.large : "",
      name: casts[idx].name
    }
    castsArray.push(cast);
  }
  return castsArray;
}

module.exports = {
  convertToStarsArray: convertToStarsArray,
  http: http,
  convertToCastString: convertToCastString,
  convertToCastInfos: convertToCastInfos
}

function getUserDataToken() {
  wx.login({
    success: function (res_login) {
      var code = res_login.code;
      wx.getUserInfo({
        withCredentials: true,
        success: function (res_user) {
          wx.request({
            url: 'https://www.top-dytt.cn/dianying/checkLogin',
            method: "POST",
            data: {
              code: code,
              encryptedData: res_user.encryptedData,
              iv: res_user.iv
            },
            fail: function (res_user) {
            },
            success: function (res_user) {
              var returnData = res_user.data;
              //设置用户缓存
              // wx.setStorageSync("utoken", utoken);
              console.log(returnData)
              wx.setStorageSync("openid", returnData.openid);
              wx.setStorageSync("session_key", returnData.session_key);
            }
          })
        }
      })
    }
  })
}
