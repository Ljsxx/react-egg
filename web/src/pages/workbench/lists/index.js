import React, { Component } from 'react'
import MessageBox from '@/plugins/message-box'
import { Button } from 'antd'

var lod
class Layout extends Component {

  msg = (type) => {
    MessageBox[type](type)
  }
  msgLoading = (type) => {
    lod = MessageBox[type](type)
    console.log('lod', lod)
    setTimeout(() => {
      lod.hide()
    }, 7000)
  }
  hide = (type) => {
    MessageBox.hide(type)
  }
  des = () => {
    
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
          <Button onClick={() => this.msgLoading('loading')}>loading1</Button>
        </ul>
        <div>
          <Button onClick={() => this.hide('info')}>hide info</Button>
          <Button onClick={() => this.hide('loading')}>hide loading</Button>
        </div>
        <div>
          <Button onClick={() => this.des()}>destroy</Button>
        </div>
      </div>
    )
  }
}

export default Layout
