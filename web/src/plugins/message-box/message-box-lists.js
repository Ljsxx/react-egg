import React, { Component } from 'react'
import ReactDom from 'react-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import MessageBoxItem from './message-box-item'

class MessageBoxLists extends Component {
  constructor () {
    super()
    this.transitionTime = 300
    this.state = {
      lists: []
    }
  }

  getKey = () => {
    const { lists } = this.state
    return `key-${Date.now()}-${lists.length}`
  }

  add = (item) => {
    const { lists } = this.state
    item.key = this.getKey()
    if (lists.every(ele => item.key !== ele.key)) {
      if (lists.length > 0 && lists[lists.length - 1].type === 'loading') {
        lists.push(item)
        setTimeout(() => {
          this.setState({ lists })
        }, this.transitionTime)
      } else {
        lists.push(item)
        this.setState({ lists })
      }
      if (item.duration > 0) {
        setTimeout(() => {
          this.remove(item.key)
        }, item.duration)
      }
    }
  }

  remove = (key) => {
    const { lists } = this.state
    this.setState({
      lists: lists.filter(item => {
        if (item.key === key) {
          if (item.onClose) {
            setTimeout(() => {
              item.onClose()
            }, this.transitionTime)
          }
          return false
        }
        return true
      })
    })
  }

  render () {
    const { lists } = this.state
    return (
      <TransitionGroup className="xxjs-message-lists">
        {
          lists.map(item => (
            <CSSTransition
              key={item.key}
              className="xxjs-message-item"
              timeout={this.transitionTime}>
                <MessageBoxItem {...item} />
            </CSSTransition>
          ))
        }
      </TransitionGroup>
    )
  }
}

function createLists () {
  const div = document.createElement('div')
  document.body.appendChild(div)
  const ref = React.createRef()
  ReactDom.render(<MessageBoxLists ref={ref} />, div)
  return {
    add (item) {
      return ref.current.add(item)
    },
    destroy () {
      ReactDom.unmountComponentAtNode(div)
      document.body.removeChild(div)
    }
  }
}

export default createLists()
