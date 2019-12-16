import React, { Component } from 'react'
import { Provider } from './context'
import { hashHistory } from './history'
const url = require('url')

class HashRouter extends Component {
  constructor () {
    super()
    this.state = {
      pathName: window.location.hash.slice(1) || '/',
      // 记录历史
      historyPaths: []
    }
  }

  componentDidMount () {
    // 如果没用hash
    // window.location.hash = window.location.hash || '/'
    // window.addEventListener('hashchange', () => {
    //   this.setState({
    //     pathName: window.location.hash.slice(1) || '/'
    //   })
    // })
    // this.setState({
    //   pathName: window.location.hash.slice(1) || '/'
    // })
  }

  push = (path) => {
    console.log('push')
    let url = '/'
    if (typeof path === 'string') {
      url = path.indexOf('/') === 0 ? path : ('/' + path)
    } else if (typeof path === 'object') {
      let obj = {
        pathname: path.path || '/',
        query: path.query || {}
      }
      const formatUrl = url.format(obj)
      url = formatUrl.indexOf('/') === 0 ? formatUrl : ('/' + formatUrl)
    }
    let arr = this.state.historyPaths
    if (arr[arr.length -1] !== url) {
      arr.push(url)
    }
    this.setState({
      historyPaths: arr,
      pathName: url
    })
  }

  replace = (path) => {
    console.log('replace')
    let url = '/'
    if (typeof path === 'string') {
      url = path.indexOf('/') === 0 ? path : ('/' + path)
    } else if (typeof path === 'object') {
      let obj = {
        pathname: path.path || '/',
        query: path.query || {}
      }
      const formatUrl = url.format(obj)
      url = formatUrl.indexOf('/') === 0 ? formatUrl : ('/' + formatUrl)
    }
    let arr = this.state.historyPaths
    arr[arr.length - 1] = path
    this.setState({
      historyPaths: arr,
      pathName: url
    })
  }

  go = (index) => {
    console.log('go ', index)
    if (!this.state.historyPaths || !this.state.historyPaths.length || index > -1) {
      return
    }
    let arr = this.state.historyPaths
    arr.splice(index)
    let url = arr[arr.length - 1]
    this.setState({
      historyPaths: arr,
      pathName: url || '/'
    })
  }

  back = () => {
    console.log('back', this.state.historyPaths)
    this.go(-1)
  }

  render () {
    console.log('in keep pathName --> ', this.state.pathName)
    let value = {
      type: 'HashRouter',
      history: {
        push: this.push,
        replace: this.replace,
        go: this.go,
        back: this.back
      },
      // history: hashHistory,
      location: Object.assign({
        pathname: '/'
      }, url.parse(this.state.pathName, true))
    }
    return (
      <Provider value={value}>
        {this.props.children}
      </Provider>
    )
  }
}

export default HashRouter
