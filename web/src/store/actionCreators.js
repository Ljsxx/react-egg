import * as types from './actionTypes'
 
// 清空
export const initStore = () => {
  return dispath => {
      dispath({
          type: types.INIT_STORE
      })
  }
}
 
export const changeLanguage = (value) => {
    return dispath => {
        dispath({
            type: types.CHANGE_LANGUAGE,
            value: value
        })
    }
}

export const setMenuIndex = (value) => {
  return dispath => {
      dispath({
          type: types.SET_MENUINDEX,
          value: value
      })
  }
}
