import React, {Component} from 'react'
import {Link} from '@/plugins/my-router-dom'

class Home extends Component {
  constructor () {
    super()
    this.state = {
      path: ''
    }
  }
  componentDidMount () {
    console.log('this in home', this)
  }
  handleInput = (e) => {
    this.setState({
      path: e.target.value
    })
  }
  pushOther = (path) => {
    console.log('跳转', path)
    this.props.history.push(path)
  }
  replaceOther = (path) => {
    console.log('替换', path)
    this.props.history.replace(path)
  }
  render () {
    return (
      <div>
        <h1>首页</h1>
        <div>
          <button onClick={() => this.props.history.back()}>返回</button>
        </div>
        <ul className="clearfloat">
          <Link to="/classify?id=111" style={{fontSize: '40px'}}>分类</Link>
          <Link to="car?id=222" style={{fontSize: '40px'}}>购物车</Link>
          <Link to="/mine?id=333" style={{fontSize: '40px'}}>我的</Link>
        </ul>
        <div>
          <input type="text" value={this.state.path} onChange={(e) => this.handleInput(e)}></input>
          <button onClick={() => this.pushOther(this.state.path)}>跳转</button>
          <button onClick={() => this.replaceOther(this.state.path)}>替换</button>
        </div>
      </div>
    )
  }
}

export default Home