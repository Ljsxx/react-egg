import './style.css'
import './icons'
import MessageBoxListsDom from './message-box-lists'

let messageBoxLists
const boxAdd = (type, content, duration = 3000, onClose) => {
  if (!messageBoxLists) messageBoxLists = MessageBoxListsDom
  console.log('messageBoxLists', messageBoxLists)
  return messageBoxLists.add({type, content, duration, onClose})
}
const boxHide = (type = 'loading') => {
  if (!messageBoxLists) messageBoxLists = MessageBoxListsDom
  console.log('messageBoxLists', messageBoxLists)
  return messageBoxLists.hide(type)
}

export default {
  info (content, duration, onClose) {
    return boxAdd('info', content, duration, onClose)
  },
  success (content, duration, onClose) {
    return boxAdd('success', content, duration, onClose)
  },
  error (content, duration, onClose) {
    return boxAdd('error', content, duration, onClose)
  },
  warning (content, duration, onClose) {
    return boxAdd('warning', content, duration, onClose)
  },
  loading (content, duration = 0, onClose) {
    return boxAdd('loading', content, duration, onClose)
  },
  hide (type) {
    return boxHide(type)
  }
}
