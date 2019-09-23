import * as types from './actionTypes'
const defaultState = {
    langId: 1
}
const initState = JSON.parse(JSON.stringify(defaultState))
 
const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case types.INIT_STORE:
            return {...initState}
        case types.CHANGE_LANGUAGE:
            return {
                ...state,
                langId: action.langId
            }
        default:
            return state
    }
}
 
export default reducer