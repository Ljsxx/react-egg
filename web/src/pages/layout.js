import React, { Component } from 'react'
import SideBar from '@/components/layout/side-bar/side-bar'
import Content from '@/router/base-routes'
import '@/assets/css/pages/layout.scss'

class Layout extends Component {
  // constructor (props) {
  //   super(props)
  // }

  componentDidMount () {
    console.log('props', this.props)
  }

  render () {
    return (
      <div className="layout-wrap">
        <SideBar {...this.props} />
        <Content />
      </div>
    )
  }
}

export default Layout
