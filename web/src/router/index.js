import React from 'react'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Login from '../pages/login'
import Layout from '../pages/layout'

function Routes () {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login}></Route>
        <Route component={Layout}></Route>
        <Redirect from="/*" to="/login" ></Redirect>
      </Switch>
    </Router>
  )
}

export default Routes
