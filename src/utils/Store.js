class Store {
  constructor(store) {
    // 检测是否支持localstorage
    if (!store) {
      console.log('不支持localStorage')
      return
    }
    this._store = store
  }

  /**
   * @function 设置值
   * @param {string} _k 必须参数，属性
   * @param {any} _v 非必须参数，属性值
   */
  setItem(_k, _v) {
    if (!this._store) return
    let kType = this.getType(_k)
    if (kType === 'string') {
      this._store.setItem(_k, this.filterValue(_v))
    } else {
      console.log('key只能为字符串！')
    }
  }

  /**
   * @function 获取值
   * @param {string} _k 必须参数，属性
   */
  getItem(_k) {
    if (!this._store) return
    let res
    let kType = this.getType(_k)
    if (kType === 'string') {
      res = this._store.getItem(_k)
    } else {
      console.log('key只能为字符串！')
    }
    return res
  }

  /**
   * @function 移除值
   * @param {string} _k 必须参数，属性
   */
  removeItem(_k) {
    if (!this._store) return
    let kType = this.getType(_k)
    if (kType === 'string') {
      res = this._store.removeItem(_k)
    } else {
      console.log('key只能为字符串！')
    }
  }

  /**
   * @function 移除所有
   */
  clear() {
    if (!this._store) return
    this._store.clear()
  }

  /**
   * @function 判断类型
   * @param {any} para 必须参数，判断的值
   */
  getType(para) {
    let type = typeof para
    if (type === 'number' && isNaN(para)) return 'NaN'
    if (type !== 'object') return type
    return Object.prototype.toString
      .call(para)
      .replace(/[\[\]]/g, '') // eslint-disable-line
      .split(' ')[1]
      .toLowerCase()
  }

  /**
   * @function 过滤值
   * @param {any} val 必须参数，过滤的值
   */
  filterValue(val) {
    let vType = this.getType(val)
    let nullVal = ['null', 'undefined', 'NaN']
    let stringVal = ['boolen', 'number', 'string']
    if (nullVal.indexOf(vType) >= 0) return ''
    if (stringVal.indexOf(vType) >= 0) return val
    return JSON.stringify(val)
  }
}

class LocalStorage extends Store {
  constructor(store) { // eslint-disable-line
    super(store)
  }

}

class SessionStorage extends Store {
  constructor(store) { // eslint-disable-line
    super(store)
  }
}

const LStorage = new LocalStorage(window.localStorage || localStorage)
const SSession = new SessionStorage(window.sessionStorage || sessionStorage)

export {
  LStorage,
  SSession
}