export default function getPath (name) {
  switch (name) {
    case '工作台':
      return '/work'
    case '项目':
      return '/pro'
    case '系统':
      return '/sys'
    case '系统-权限':
      return '/per'
    case '系统-用户':
      return '/user'
    case '消息':
      return '/news'
    default:
      return '/'
  }
}