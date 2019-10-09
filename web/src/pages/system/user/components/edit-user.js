import React, { Component } from 'react'
import styles from '@/assets/css/pages/system/user.module.scss'
import MessageBox from '@/plugins/message-box'

class EditUser extends Component {
  constructor (props) {
    super(props)
    this.state = {
      formData: {}
    }
  }

  componentDidMount () {
    console.log('props', this.props)
    this.setState((state, props) => ({
      formData: props.formData
    }))
  }

  // 输入
  formInput = (e, type) => {
    let { formData } = this.state
    formData[type] = e.target.value
    this.setState({
      formData
    })
  }
  // 取消
  handleClose = () => {
    this.props.editUserDialogClose()
  }
  // 确定
  handleConfirm = () => {
    if (!this.state.formData.name) {
      MessageBox.warning('请输入姓名')
      return
    }
    if (!this.state.formData.account && this.props.editUserDialogType === 'add') {
      MessageBox.warning('请输入账号')
      return
    }
    if (!this.state.formData.password && this.props.editUserDialogType === 'add') {
      MessageBox.warning('请输入密码')
      return
    }
    this.props.editUserDialogConfirm(this.state.formData)
  }

  render () {
    return (
      <div className={`${styles['dialog']}`}>
        <div className={`${styles['dialog-box']}`}>
          <form className={`${styles['form']}`}>
            <div>
              <label>
                <span>姓名:</span>
                <input placeholder="请输入姓名" value={this.state.formData.name || ''} onChange={(e) => this.formInput(e, 'name')}></input>
              </label>
            </div>
            {
              this.props.editUserDialogType === 'edit' ? '' : (
                <React.Fragment>
                  <div>
                    <label>
                      <span>账号:</span>
                      <input placeholder="请输入账号" value={this.state.formData.account || ''} onChange={(e) => this.formInput(e, 'account')}></input>
                    </label>
                  </div>
                  <div>
                    <label>
                      <span>密码:</span>
                      <input placeholder="请输入密码" value={this.state.formData.password || ''} onChange={(e) => this.formInput(e, 'password')} type="password"></input>
                    </label>
                  </div>
                </React.Fragment>
              )
            }
            <div>
              <label>
                <span>性别:</span>
                <select className="w-174 h-27" value={this.state.formData.gender || ''} onChange={(e) => this.formInput(e, 'gender')}>
                  <option label="男" value={1}></option>
                  <option label="女" value={2}></option>
                  <option label="其他" value={-1}></option>
                </select>
              </label>
            </div>
            <div>
              <label>
                <span>年龄:</span>
                <input placeholder="请输入年龄" value={this.state.formData.age || ''} onChange={(e) => this.formInput(e, 'age')} type="number"></input>
              </label>
            </div>
            <div>
              <label>
                <span>手机号:</span>
                <input placeholder="请输入手机号" value={this.state.formData.phone || ''} onChange={(e) => this.formInput(e, 'phone')}></input>
              </label>
            </div>
          </form>
          <div className={`${styles['dialog-footer']}`}>
            <button onClick={() => this.handleClose()}>取消</button>
            <button onClick={() => this.handleConfirm()}>确定</button>
          </div>
        </div>
      </div>
    )
  }
}

export default EditUser
