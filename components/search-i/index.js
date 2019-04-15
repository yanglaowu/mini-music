// components/search-i/index.js
import { debounce } from '../../utils/utils.js' 
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    value: null
  },
  observers: {
    value: debounce(function (val) {
      this.triggerEvent('input', { value: val})
    }, 500)
  },
  /**
   * 组件的方法列表
   */
  methods: {
    _handleInput({ detail }){
      this.setData({
        value: detail.value
      })
    }
  }
})
