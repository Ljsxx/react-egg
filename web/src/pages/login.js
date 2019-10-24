import React, { Component } from 'react'
import styles from '../assets/css/pages/login.module.scss'
import CanvasNest from '../plugins/canvas-nest/index'
import Axios from '@/axios'
import MessageBox from '@/plugins/message-box'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      account: '',
      password: '',
      wrapWidth: '100%',
      wrapHeight: '100%'
    }
  }

  componentDidMount () {
    let w = document.documentElement.clientWidth
    let h = document.documentElement.clientHeight
    this.setState({
      wrapWidth: w + 'px',
      wrapHeight: h + 'px'
    }, () => {
      new CanvasNest(document.getElementById('loginWrap'), {
        color: '0,255,0',
        pointColor: '0,255,0'
      })
    })
  }

  // 提交
  handleSubmit = () => {
    if (!this.state.account) {
      MessageBox.warning('请输入账号')
      return
    }
    if (!this.state.password) {
      MessageBox.warning('请输入密码')
      return
    }
    this.goSubmit()
  }
  goSubmit = () => {
    Axios.post('/login', {
      account: this.state.account,
      password: this.state.password
    }).then(res => {
      if (res.data && res.data.code === 200) {
        MessageBox.success('登录成功')
        this.props.history.push('/user')
      } else {
        MessageBox.error(res.data.msg)
      }
    }).catch(() => {
      MessageBox.error('网络异常')
    })
  }

  handleInput = (e, type) => {
    this.setState({
      [type]: e.target.value
    })
  }

  render () {
    return (
      <div className={`${styles['wrap']}`} id="loginWrap" style={{width: this.state.wrapWidth, height: this.state.wrapHeight}}>
        <div className={`${styles['box']}`}>
          <p className={`${styles['box-title']} no-select`}>项目管理系统</p>
          <div className={`${styles['box-main']}`}>
            <form>
              <div className={`${styles['box-main__item']} mb-10`}>
                <input
                  placeholder="请输入账号"
                  onChange={(e) => this.handleInput(e, 'account')}
                  value={this.state.account} />
              </div>
              <div className={`${styles['box-main__item']} mb-20`}>
                <input
                  placeholder="请输入密码"
                  type="password"
                  onChange={(e) => this.handleInput(e, 'password')}
                  value={this.state.password} />
              </div>
              <div className={`${styles['box-main__btn']} no-select`} onClick={() => this.handleSubmit()}>提 交</div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
