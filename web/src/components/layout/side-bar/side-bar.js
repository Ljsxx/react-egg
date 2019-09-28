import React, { Component } from 'react'
import styles from '@/assets/css/components/layout/side-bar.module.scss'
import getPath from '@/router/get-path'
import { CSSTransition } from 'react-transition-group'
import {connect} from 'react-redux'
import { setMenuIndex } from '@/store/actionCreators'
// import SideBarChild from './side-bar-child'
const logo = require('@/assets/img/logo.png')

class SideBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      lists: [
        {
          name: '工作台',
          icon: 'icondiannao-copy',
          path: getPath('工作台')
        },
        {
          name: '项目',
          icon: 'iconziyuanguanli',
          path: getPath('项目')
        },
        {
          name: '系统',
          icon: 'iconshezhi',
          path: getPath('系统'),
          children: [
            {
              name: '权限',
              icon: 'iconshezhi',
              path: getPath('系统-权限')
            },
            {
              name: '用户',
              icon: 'iconshezhi',
              path: getPath('系统-用户')
            }
          ]
        },
        {
          name: '消息',
          icon: 'icontongzhi-copy',
          path: getPath('消息')
        }
      ],
      // 当前
      // menuIndex: 0,
      showChildIndex: -1
    }
  }

  handleMouseEnter = (index) => {
    this.setState({
      showChildIndex: index
    })
  }
  handleMouseLeave = () => {
    this.setState({
      showChildIndex: -1
    })
  }
  // 侧边栏点击
  handleClick = (item, index) => {
    if (item && item.children && item.children.length) {
      // 如果有子级
      return
    }
    this.props.setMenuIndex(index)
    this.props.history.push(getPath(item.name))
  }
  handleChildClick = (index, item, subItem) => {
    if (item && subItem && item.name && subItem.name) {
      this.props.setMenuIndex(index)
      this.props.history.push(getPath(item.name + '-' + subItem.name))
    }
  }

  render () {
    let pathNow = (this.props && this.props.location && this.props.location.pathname) || '/'
    console.log('ppp', pathNow)
    return (
      <div className={`${styles['side-wrap']}`}>
        <div className={`${styles['side-logo']}`}>
          <img src={logo} alt=""></img>
        </div>
        <ul className={`${styles['side-lists']}`}>
          {
            this.state.lists.map((item, index) => (
              <li
                className={`${styles['side-item']} ${this.props.menuIndex === index ? styles['side-item__active'] : ''}`}
                key={item.name}
                onMouseEnter={() => this.handleMouseEnter(index)}
                onMouseLeave={() => this.handleMouseLeave()}
                onClick={() => this.handleClick(item, index)}>
                <div className={`${styles['side-item__icon']}`} title={item.name}>
                  <i className={`iconfont ${item.icon}`}></i>
                </div>
                <p className={`${styles['side-item__name']}`}>{item.name}</p>
                {
                  item.children && item.children.length ? (
                    <CSSTransition
                      className={`${styles['animation']}`}
                      timeout={300}
                      unmountOnExit
                      in={this.state.showChildIndex === index}
                      key={index}>
                        <div>
                          <div className={`${styles['side-child']}`}>
                            <p className={`${styles['side-child__pname']}`}>{item.name}</p>
                            <ul className={`${styles['side-child__lists']}`}>
                              {
                                item.children.map(subItem => (
                                  <li
                                    key={subItem.name}
                                    className={`${styles['side-child__item']} ${pathNow === subItem.path ? styles['side-child__itemactive'] : ''}`}
                                    onClick={() => this.handleChildClick(index, item, subItem)}>
                                    {subItem.name}
                                  </li>
                                ))
                              }
                            </ul>
                          </div>
                        </div>
                        {/* <SideBarChild info={item}></SideBarChild> */}
                    </CSSTransition>
                  ) : ''
                }
              </li>
            ))
          }
        </ul>
        <div className={`${styles['side-bot']}`}>
          <div className={`${styles['side-bot__img']}`}>
            <img src="" alt=""></img>
          </div>
          <p className={`${styles['side-bot__name']}`}>管理员</p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  menuIndex: state.menuIndex
})
const mapDispathToProps = {
  setMenuIndex
}
export default connect(mapStateToProps,mapDispathToProps)(SideBar)