import http from '../utils/http.js';

export function getRecommend () {
  return http.get('https://wx.yanglaowu.cc/getRecommend')
}

export function getDiscList() {
  return http.get('https://wx.yanglaowu.cc/getDiscList')
}

export function getDiscInfo(disstid) {
  return http.get(`https://wx.yanglaowu.cc/getDiscInfo?disstid=${disstid}`)
}

export function getSignerList() {
  return http.get('https://wx.yanglaowu.cc/getSignerList')
}

export function getSignerInfo(signerId) {
  return http.get(`https://wx.yanglaowu.cc/getSignerDetail?singermid=${signerId}`)
}

export function getLyric(mid) {
  return http.get(`https://wx.yanglaowu.cc/getLyric?mid=${mid}`)
}

export function getSongsUrl(songs) {
  return http.post('https://wx.yanglaowu.cc/getSongsUrl', {songs: songs})
}

export function getHotKey() {
  return http.get('https://wx.yanglaowu.cc/getHotKey')
}
export function getSearch(query, page, zhida, perpage) {
  return http.get('https://wx.yanglaowu.cc/search', { query, page, zhida, perpage })
}
