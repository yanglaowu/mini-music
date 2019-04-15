// components/hot-search/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hotKey: {
      type: Object,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    _handleSelect({ currentTarget }) {
      this.triggerEvent('select', currentTarget.dataset.item)
    }
  }
})
