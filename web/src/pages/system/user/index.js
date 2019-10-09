import React, { Component } from 'react'
import Axios from '@/axios'
// import styles from '@/assets/css/pages/system/user.module.scss'
import MessageBox from '@/plugins/message-box'
import { Row, Col } from 'antd'
import EditUser from './components/edit-user'
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
      },
      // 弹框
      editUserDialogType: 'add',
      editUserDialogVisible: false
    }
  }

  componentDidMount () {
    this.getLists()
    setTimeout(() => {
      let { formData } = this.state
      formData['name'] = 'trey'
      this.setState({
        formData
      })
    }, 1000);
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

  editUserDialogOpen = (type, info) => {
    let obj = Object.assign({}, {
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
    }, info)
    this.setState({
      editUserDialogType: type,
      formData: obj,
      editUserDialogVisible: true
    })
  }
  editUserDialogClose = () => {
    this.setState({
      editUserDialogVisible: false
    })
  }
  editUserDialogConfirm = (info) => {
    console.log('info', info)
    this.editUserDialogClose()
    if (this.state.editUserDialogType === 'add') {
      this.handleAdd()
      return
    }
    this.handleEdit()
  }

  formInput = (e, type) => {
    let { formData } = this.state
    formData[type] = e.target.value
    this.setState({
      formData
    })
  }

  handleAdd = () => {
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
    this.goAdd()
  }

  goAdd = () => {
    Axios.post('/user/add', this.state.formData).then(res => {
      if (res.data && res.data.code === 200) {
        MessageBox.success('添加成功')
        this.getLists()
      }
    }).catch(() => {
      MessageBox.error('网络异常')
    })
  }
  // 编辑
  handleEdit = () => {
    Axios.post('/user/edit', this.state.formData).then(res => {
      if (res.data && res.data.code === 200) {
        MessageBox.success('修改成功')
        this.getLists()
      }
    }).catch(() => {
      MessageBox.error('网络异常')
    })
  }
  // 删除
  handleDel = (item) => {
    Axios.post('/user/del', {
      ids: [item.id]
    }).then(res => {
      if (res.data && res.data.code === 200) {
        MessageBox.success('删除成功')
        this.getLists()
      }
    }).catch(() => {
      MessageBox.error('网络异常')
    })
  }

  render () {
    return (
      <div className="p-10">
        <h1>用户-列表</h1>
        <div>
          <input placeholder="请输入姓名" value={this.state.sendData.keyword} onChange={(e) => this.handleInput(e, 'keyword')}></input>
          <input placeholder="请输入页码" value={this.state.sendData.pageIndex} onChange={(e) => this.handleInput(e, 'pageIndex')} type="number"></input>
          <input placeholder="请输入页数" value={this.state.sendData.pageSize} onChange={(e) => this.handleInput(e, 'pageSize')} type="number"></input>
          <button onClick={() => this.getLists()}>搜索</button>
          <button onClick={() => this.editUserDialogOpen('add', {})}>添加用户</button>
        </div>
        <div>
          <ul>
            <Row>
              <Col span={2}>#</Col>
              <Col span={2}>Id</Col>
              <Col span={3}>账号</Col>
              <Col span={3}>姓名</Col>
              <Col span={3}>手机号</Col>
              <Col span={3}>性别</Col>
              <Col span={3}>年龄</Col>
              <Col span={5}>操作</Col>
            </Row>
            {
              this.state.lists.map((item, index) => (
                <li key={item.id}>
                  <Row>
                    <Col span={2}>{index}</Col>
                    <Col span={2}>{item.id}</Col>
                    <Col span={3}>{item.account}</Col>
                    <Col span={3}>{item.name}</Col>
                    <Col span={3}>{item.phone}</Col>
                    <Col span={3}>{item.gender === 1 ? '男' : (item.gender === 2 ? '女' : '其他')}</Col>
                    <Col span={3}>{item.age}</Col>
                    <Col span={5}>
                      <button onClick={() => this.editUserDialogOpen('edit', item)}>编辑</button>
                      <button onClick={() => this.handleDel(item)}>删除</button>
                    </Col>
                  </Row>
                </li>
              ))
            }
          </ul>
        </div>
        {/* 新增、编辑弹框 */}
        {
          this.state.editUserDialogVisible ? 
            <EditUser
              formData={this.state.formData}
              editUserDialogType={this.state.editUserDialogType}
              editUserDialogClose={this.editUserDialogClose}
              editUserDialogConfirm={this.editUserDialogConfirm} /> : ''
        }
      </div>
    )
  }
}

export default Lists
