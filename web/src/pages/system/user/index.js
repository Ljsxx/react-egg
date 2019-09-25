import React, { Component } from 'react'
import Axios from '@/axios'

class Lists extends Component {
  constructor (props) {
    super(props)
    this.state = {
      sendData: {
        keyword: '',
        pageIndex: 1,
        pageSize: 10
      },
      lists: []
    }
  }

  componentDidMount () {
    this.getLists()
  }

  handleInput = (e, type) => {
    let { sendData } = this.state
    sendData[type] = e.target.value
    this.setState({
      sendData
    })
  }
  getLists = () => {
    Axios.get('/user', {
      params: this.state.sendData
    }).then(res => {
      console.log('res', res)
      if (res && res.data) {
        this.setState({
          lists: res.data
        })
      }
    }).catch(() => {
      console.log('网络异常')
    })
  }
  render () {
    return (
      <div>
        <h1>用户-列表</h1>
        <div>
          <input placeholder="请输入姓名" value={this.state.sendData.keyword} onChange={(e) => this.handleInput(e, 'keyword')}></input>
          <input placeholder="请输入页码" value={this.state.sendData.pageIndex} onChange={(e) => this.handleInput(e, 'pageIndex')} type="number"></input>
          <input placeholder="请输入页数" value={this.state.sendData.pageSize} onChange={(e) => this.handleInput(e, 'pageSize')} type="number"></input>
          <button onClick={() => this.getLists()}>搜索</button>
        </div>
        <div>
          <ul>
            {
              this.state.lists.map(item => (
                <li key={item.id}>{item.id} -- {item.name} -- {item.account}</li>
              ))
            }
          </ul>
        </div>
      </div>
    )
  }
}

export default Lists
