import React, { Component } from 'react'
import Axios from '@/axios'
import styles from '@/assets/css/pages/system/user.module.scss'
import MessageBox from '@/plugins/message-box'
class Lists extends Component {
  constructor (props) {
    super(props)
    this.state = {
      sendData: {
        keyword: '',
        pageIndex: 1,
        pageSize: 10
      },
      lists: [],
      // 显示添加
      isAdd: false,
      formData: {
        // 姓名
        name: '',
        // 账号
        account: '',
        // 密码
        password: '',
        // 性别
        gender: 1,
        // 年龄
        age: 0,
        // 手机号
        phone: ''
      }
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

  handleAdd = () => {
    this.setState({
      isAdd: !this.state.isAdd
    })
  }

  formInput = (e, type) => {
    let { formData } = this.state
    formData[type] = e.target.value
    this.setState({
      formData
    })
  }

  handleSubmit = () => {
    if (!this.state.formData.name) {
      MessageBox.warning('请输入姓名')
      return
    }
    if (!this.state.formData.account) {
      MessageBox.warning('请输入账号')
      return
    }
    if (!this.state.formData.password) {
      MessageBox.warning('请输入密码')
      return
    }
    if (!this.state.formData.account) {
      MessageBox.warning('请输入账号')
      return
    }
    console.log('formData', this.state.formData)
    this.goSubmit()
  }

  goSubmit = () => {
    Axios.post('/user/add', this.state.formData).then(res => {
      console.log('res', res)
    }).catch(() => {
      MessageBox.error('网络异常')
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
        <div className="pt-20 pb-20">
          {
            this.state.isAdd ? (
              <form className={`${styles['form']}`}>
                <label>
                  <span>姓名:</span>
                  <input placeholder="请输入姓名" value={this.state.formData.name} onChange={(e) => this.formInput(e, 'name')}></input>
                </label>
                <label>
                  <span>账号:</span>
                  <input placeholder="请输入账号" value={this.state.formData.account} onChange={(e) => this.formInput(e, 'account')}></input>
                </label>
                <label>
                  <span>密码:</span>
                  <input placeholder="请输入密码" value={this.state.formData.password} onChange={(e) => this.formInput(e, 'password')} type="password"></input>
                </label>
                <label>
                  <span>性别:</span>
                  <select className="w-174 h-27" value={this.state.formData.gender} onChange={(e) => this.formInput(e, 'gender')}>
                    <option label="男" value={1}></option>
                    <option label="女" value={2}></option>
                    <option label="其他" value={-1}></option>
                  </select>
                </label>
                <label>
                  <span>年龄:</span>
                  <input placeholder="请输入年龄" value={this.state.formData.age} onChange={(e) => this.formInput(e, 'age')} type="number"></input>
                </label>
                <label>
                  <span>手机号:</span>
                  <input placeholder="请输入手机号" value={this.state.formData.phone} onChange={(e) => this.formInput(e, 'phone')}></input>
                </label>
              </form>
            ) : ''
          }
          {
            this.state.isAdd ? (
              <div className="pl-50">
                <button onClick={() => this.handleAdd()}>取消</button>
                <button onClick={() => this.handleSubmit()}>提交</button>
              </div>
            ) : (
              <div className="pl-50">
                <button onClick={() => this.handleAdd()}>添加用户</button>
              </div>
            )
          }
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
