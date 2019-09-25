import React, { Component } from 'react'
import styles from '@/assets/css/components/layout/side-bar.module.scss'

class SideBarChild extends Component {
  // constructor (props) {
  //   super(props)
  // }

  componentDidMount () {
    console.log('children', this.props)
  }

  render () {
    return (
      <div>
        <div className={`${styles['side-child']}`}>
          <p className={`${styles['side-child__pname']}`}>{this.props.info.name}</p>
          <ul className={`${styles['side-child__lists']}`}>
            {
              this.props.info.children.map(subItem => (
                <li key={subItem.name} className={`${styles['side-child__item']}`}>{subItem.name}</li>
              ))
            }
          </ul>
        </div>
      </div>
    )
  }
}

export default SideBarChild