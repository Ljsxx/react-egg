import React, { Component } from 'react'
import MessageBox from '@/plugins/message-box'
import { Button, Message, Modal } from 'antd'

var lod
class Layout extends Component {

  msg = (type) => {
    MessageBox[type](type)
  }
  antdMsg = (type) => {
    Message[type](type)
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
  modalOpen = (type) => {
    Modal[type]({
      title: '提示',
      content: type
    })
  }

  render () {
    return (
      <div>
        <ul>
          <Button type="primary" onClick={() => this.antdMsg('info')}>antd-info</Button>
          <Button type="dashed" onClick={() => this.msg('info')}>info</Button>
          <Button type="success" onClick={() => this.msg('success')}>success</Button>
          <Button type="danger" onClick={() => this.msg('error')}>error</Button>
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
        <div>
          <Button onClick={() => this.modalOpen('info')}>info</Button>
          <Button onClick={() => this.modalOpen('success')}>success</Button>
          <Button onClick={() => this.modalOpen('error')}>error</Button>
          <Button onClick={() => this.modalOpen('warning')}>warning</Button>
          <Button onClick={() => this.modalOpen('confirm')}>confirm</Button>
        </div>
      </div>
    )
  }
}

export default Layout
