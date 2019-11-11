import React from 'react'
import { HashRouter as Router, Route, Redirect, Switch } from '../plugins/my-router-dom'
// import { BrowserRouter as Router, Route, Redirect, Switch } from '../plugins/my-router-dom'
import Login from '../pages/login'
import User from '../pages/system/user/index'
import Home from '../pages/test/home'
import Classify from '../pages/test/classify'
import Car from '../pages/test/car'
import Mine from '../pages/test/mine'

function Routes () {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/user" component={User}></Route>
        <Route exact path="/home" component={Home}></Route>
        <Route exact path="/classify" component={Classify}></Route>
        <Route exact path="/car" component={Car}></Route>
        <Route exact path="/mine" component={Mine}></Route>
        <Redirect to="/home"></Redirect>
      </Switch>
    </Router>
  )
}

export default Routes
