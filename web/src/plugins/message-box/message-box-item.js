import React from 'react'

function MessageBoxItem (props) {
  const { type, content } = props
  const icons = {
    info: 'icon-info-circle-fill',
    success: 'icon-check-circle-fill',
    warning: 'icon-warning-circle-fill',
    error: 'icon-close-circle-fill',
    loading: 'icon-loading'
  }
  return (
    <div className={`xxjs-item ${type}`}>
        <svg className="xxjs-icon" aria-hidden="true">
            <use xlinkHref={`#${icons[type]}`} />
        </svg>
        <span>{content}</span>
    </div>
  )
}

export default MessageBoxItem
