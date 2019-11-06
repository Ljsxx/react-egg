import React, { Component } from 'react'
import Axios from '@/axios'

class Lists extends Component {

  componentDidMount () {
    this.getLists()
  }
  
  getLists = () => {
    Axios.get('/permission').then(res => {
      if (res.data && res.data.code === 200) {
        console.log('res', res)
      }
    })
  }

  render () {
    return (
      <div>权限-列表</div>
    )
  }
}

export default Lists
