var Fly = require('../miniprogram_npm/flyio/index.js');
var fly = new Fly();

fly.interceptors.request.use((request) => {
  request.timeout = 30000;
  wx.showLoading({
    title: "加载中",
    mask: true,
  });
  return request;
})

fly.interceptors.response.use(
  (response) => {
    wx.hideLoading();
    return response.data;//请求成功之后将返回值返回
  },
  (err) => {
    //请求出错，根据返回状态码判断出错原因
    wx.hideLoading();
    if (err.status == 0) {
      return { msg: '网络连接异常'}
    } else if (err.status == 1) {
      return { msg: '网络连接超时'}
    } else if (err.status == 401) {
      return { msg: '用户未登录'}
    } else {
      if (err.response.data.message) {
        return { msg: 'err.response.data.message'}
      } else {
        return { msg: '请求数据失败,请稍后再试'}
      }
    };
  }
)
export default fly