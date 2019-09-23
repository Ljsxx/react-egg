// 兼容ie
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
// redux
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import redux from './store'
// router
import Routers from './router'
// axios
import './axios/axios-set'
// 中文
import {ConfigProvider} from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
 
 
const {store, persistor} = redux()

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ConfigProvider locale={zh_CN}>
        <Routers />
      </ConfigProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)
