import * as types from './actionTypes'
 
// 清空
export const initStore = () => {
  return dispath => {
      dispath({
          type: types.INIT_STORE
      })
  }
}
 
export const changeLanguage = (langId) => {
    return dispath => {
        dispath({
            type: types.CHANGE_LANGUAGE,
            langId
        })
    }
}
