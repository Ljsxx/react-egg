import React from 'react'
import { Switch, Route } from 'react-router-dom'
import getPath from './get-path'
// 工作台
import Workbench from '@/pages/workbench/lists'
// 项目
import Project from '@/pages/project/lists'
// 系统
import Per from '@/pages/system/per'
import User from '@/pages/system/user'
// 消息
import News from '@/pages/news/lists'

function Routes () {
  return (
    <Switch>
      <Route exact path={getPath('工作台')} component={Workbench}></Route>
      <Route exact path={getPath('项目')} component={Project}></Route>
      <Route exact path={getPath('系统-权限')} component={Per}></Route>
      <Route exact path={getPath('系统-用户')} component={User}></Route>
      <Route exact path={getPath('消息')} component={News}></Route>
    </Switch>
  )
}

export default Routes
