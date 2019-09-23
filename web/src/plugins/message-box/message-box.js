import './style.css'
import './icons'
import MessageBoxListsDom from './message-box-lists'

let messageBoxLists
const messageBoxItem = (type, content, duration = 3000, onClose) => {
  if (!messageBoxLists) messageBoxLists = MessageBoxListsDom
  return messageBoxLists.add({type, content, duration, onClose})
}

export default {
  info (content, duration, onClose) {
    return messageBoxItem('info', content, duration, onClose)
  },
  success (content, duration, onClose) {
    return messageBoxItem('success', content, duration, onClose)
  },
  error (content, duration, onClose) {
    return messageBoxItem('error', content, duration, onClose)
  },
  warning (content, duration, onClose) {
    return messageBoxItem('warning', content, duration, onClose)
  },
  loading (content, duration = 0, onClose) {
    return messageBoxItem('loading', content, duration, onClose)
  }
}
