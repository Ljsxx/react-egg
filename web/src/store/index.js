import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storageSession from 'redux-persist/lib/storage/session'
import reducer from './reducer'
 
const persistConfig = {
    key: 'root',
    storage: storageSession
}
const persistedReducer = persistReducer(persistConfig, reducer)
 
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOST_ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOST__({}) : compose
 
const enhancer = composeEnhancers(applyMiddleware(thunk))
const store = createStore(persistedReducer, enhancer)
 
export default () => {
    const persistor = persistStore(store)
    return { store, persistor }
}
