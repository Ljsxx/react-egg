import React, { Component } from 'react'
import { MessageBox } from '@/plugins/message-box/index'
import { Button } from 'antd'

class Layout extends Component {

  msg = (type) => {
    MessageBox[type](type)
  }

  render () {
    return (
      <div>
        <ul>
          <Button onClick={() => this.msg('info')}>info</Button>
          <Button onClick={() => this.msg('success')}>success</Button>
          <Button onClick={() => this.msg('error')}>error</Button>
          <Button onClick={() => this.msg('warning')}>warning</Button>
          <Button onClick={() => this.msg('loading')}>loading</Button>
        </ul>
      </div>
    )
  }
}

export default Layout
