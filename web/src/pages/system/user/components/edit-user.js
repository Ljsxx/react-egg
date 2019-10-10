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
                <span className={`${styles['form-label']}`}>姓名:</span>
                {
                  this.props.editUserDialogType === 'detail' ? (
                    <span>{this.state.formData.name}</span>
                  ) : (
                    <input placeholder="请输入姓名" value={this.state.formData.name || ''} onChange={(e) => this.formInput(e, 'name')}></input>
                  )
                }
              </label>
            </div>
            {
              (this.props.editUserDialogType === 'add' || this.props.editUserDialogType === 'detail') ? (
                <div>
                  <label>
                    <span className={`${styles['form-label']}`}>账号:</span>
                    {
                      this.props.editUserDialogType === 'detail' ? (
                        <span>{this.state.formData.account}</span>
                      ) : (
                        <input placeholder="请输入账号" value={this.state.formData.account || ''} onChange={(e) => this.formInput(e, 'account')}></input>
                      )
                    }
                  </label>
                </div>
              ) : ''
            }
            {
              this.props.editUserDialogType === 'add' ? (
                <div>
                  <label>
                    <span className={`${styles['form-label']}`}>密码:</span>
                    {
                      this.props.editUserDialogType === 'detail' ? (
                        <span>{this.state.formData.password}</span>
                      ) : (
                        <input placeholder="请输入密码" value={this.state.formData.password || ''} onChange={(e) => this.formInput(e, 'password')} type="password"></input>
                      )
                    }
                  </label>
                </div>
              ) : ''
            }
            <div>
              <label>
                <span className={`${styles['form-label']}`}>性别:</span>
                {
                  this.props.editUserDialogType === 'detail' ? (
                    <span>{this.state.formData.gender === 1 ? '男' : (this.state.formData.gender === 2 ? '女' : '其他')}</span>
                  ) : (
                    <select className="w-174 h-27" value={this.state.formData.gender || ''} onChange={(e) => this.formInput(e, 'gender')}>
                      <option label="男" value={1}></option>
                      <option label="女" value={2}></option>
                      <option label="其他" value={-1}></option>
                    </select>
                  )
                }
              </label>
            </div>
            <div>
              <label>
                <span className={`${styles['form-label']}`}>年龄:</span>
                {
                  this.props.editUserDialogType === 'detail' ? (
                    <span>{this.state.formData.age}</span>
                  ) : (
                    <input placeholder="请输入年龄" value={this.state.formData.age || ''} onChange={(e) => this.formInput(e, 'age')} type="number"></input>
                  )
                }
              </label>
            </div>
            <div>
              <label>
                <span className={`${styles['form-label']}`}>手机号:</span>
                {
                  this.props.editUserDialogType === 'detail' ? (
                    <span>{this.state.formData.phone}</span>
                  ) : (
                    <input placeholder="请输入手机号" value={this.state.formData.phone || ''} onChange={(e) => this.formInput(e, 'phone')}></input>
                  )
                }
              </label>
            </div>
          </form>
          <div className={`${styles['dialog-footer']}`}>
            {
              this.props.editUserDialogType === 'detail' ? (
                <button onClick={() => this.handleClose()}>关闭</button>
              ) : (
                <React.Fragment>
                  <button onClick={() => this.handleClose()}>取消</button>
                  <button onClick={() => this.handleConfirm()}>确定</button>
                </React.Fragment>
              )
            }
          </div>
        </div>
      </div>
    )
  }
}

export default EditUser
