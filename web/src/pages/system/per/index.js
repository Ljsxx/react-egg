// 权限列表-列表
import React, {Component} from 'react'
import {Tooltip,Input, Button, Icon, Row, Col, Switch, Checkbox, message,  Modal, Spin} from 'antd'
import styles from '@/assets/css/pages/system/per.module.scss'
import axios from 'axios'
import {connect} from 'react-redux'
// import {getPermissionManageThird} from '../../../assets/util/util'
// import ResourceAllLists from '../../../component/permission-manage/resource-all-lists'

class Lists extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // 用户组
      groupLists: [],
      groupActiveId: 0,
      groupDialogVisible: false,
      groupDialogType: 'add',
      groupData: {},
      // 权限
      permissionLists: [],
      // 全选
      allLists: [],
      groupLoading: false,
      permissionLoading: false,
      saveLoading: false,
      keyword: '',
      // 权限
      per: {
        // 权限分配
        assign: true
      },
      // 分配资源
      resourceVisible: false,
      confirmLoading: false
    }
  }
  componentDidMount () {
    // 用户组
    this.getGroupLists()
    // let obj = getPermissionManageThird('权限管理', '权限列表', this.props.permission) || this.state.per
    let obj = this.state.per
    this.setState({
      per: obj
    })
  }

  // 获取用户组
  getGroupLists = () => {
    this.setState({
      groupLoading: true
    })
    axios.get('/role').then(res => {
      this.setState({
        groupLoading: false
      })
      if (res.data && res.data.code === 200) {
        this.setState({
          groupLists: res.data.data
        })
        if (Array.isArray(res.data.data) && res.data.data.length && !this.state.groupActiveId) {
          this.setState({
            groupActiveId: res.data.data[0].id
          }, () => {
            this.getDetail()
          })
        }
      }else {
        message.error(res.data.msg)
      }
    }).catch(err => {
      this.setState({
        groupLoading: false
      })
      message.error('网络异常')
    })
  }

  // 获取权限详情
  getDetail = () => {
    this.setState({
      permissionLoading: true
    })
    axios.get('/permission/lists', {
      params: {
        roleId: this.state.groupActiveId
      }
    }).then(res => {
      this.setState({
        permissionLoading: false
      })
      if (res.data && res.data.code === 200) {
        this.setState({
          permissionLists: res.data.data
        }, () => {
          this.checkAll()
        })
      }
    }).catch(err => {
      this.setState({
        permissionLoading: false
      })
    })
  }

  // 一级权限
  firstChange = (index) => {
    let arr = [...this.state.permissionLists]
    arr[index].checked = !arr[index].checked
    this.setState({
      permissionLists: arr
    })
    this.checkAll()
  }
  // 二级权限
  secondChange = (index, subIndex) => {
    let arr = [...this.state.permissionLists]
    arr[index].children[subIndex].checked = !arr[index].children[subIndex].checked
    this.setState({
      permissionLists: arr
    })
    this.checkAll()
  }
  // 三级权限
  thirdChange = (index, subIndex, graIndex) => {
    let arr = [...this.state.permissionLists]
    arr[index].children[subIndex].children[graIndex].checked = !arr[index].children[subIndex].children[graIndex].checked
    this.setState({
      permissionLists: arr
    })
    this.checkAll()
  }
  // 全选
  getAll (index) {
    let arr = [...this.state.permissionLists]
    let all = [...this.state.allLists]
    let isAll = all[index]
    arr.forEach((ele, ind) => {
      if (ind === index) {
        // 一级
        ele.checked = !isAll
        if (ele.children && ele.children.length) {
          ele.children.forEach(subEle => {
            // 二级
            subEle.checked = !isAll
            if (subEle.children && subEle.children.length) {
              subEle.children.forEach(graEle => {
                // 三级
                graEle.checked = !isAll
              })
            }
          })
        }
      }
    })
    all[index] = !isAll
    this.setState({
      allLists: all
    })
  }
  checkAll () {
    let arr = [...this.state.permissionLists]
    let all = []
    if (Array.isArray(arr) && arr.length) {
      arr.forEach(item => {
        // 一级
        let isAll = true
        if (item.checked && item.children) {
          item.children.forEach(subItem => {
            // 二级
            if (subItem.checked && subItem.children) {
              subItem.children.forEach(graItem => {
                //三级
                if (!graItem.checked) {
                  isAll = false
                }
              })
            }else {
              isAll = false
            }
          })
        }else {
          isAll = false
        }
        all.push(isAll)
      })
    }
    this.setState({
      allLists: [...all]
    })
  }

  // 用户组切换
  roleChange = (id) => {
    this.setState({
      groupActiveId: id
    }, () => {
      this.getDetail()
    })
  }
  // 删除用户组
  roleDelete = (item) => {
    Modal.confirm({
      title: '提示',
      content: '此操作将删除用户组，是否继续？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        this.deleteGroup(item)
      }
    })
  }
  // 打开弹框
  roleDialogOpen = (type, item) => {
    this.setState({
      groupDialogType: type,
      groupDialogVisible: true,
      groupData: item
    })
  }
  // 弹框关闭
  roleDialogClose = () => {
    this.setState({
      groupDialogVisible: false
    })
  }
  // 弹框确定
  roleDialogConfirm = () => {
    if (!this.state.groupData.name) {
      message.warning('请输入用户组名称')
      return
    }
    if (this.state.groupDialogType === 'edit' && this.state.groupData.id) {
      this.editGroup()
    }else {
      this.addGroup()
    }
  }
  // 添加用户组
  addGroup = () => {
    axios.post('/role/add', {
      name: this.state.groupData.name
    }).then(res => {
      if (res.data && res.data.code === 200) {
        message.success('添加成功')
        this.getGroupLists()
        this.setState({
          groupDialogVisible: false
        })
      }else {
        message.error(res.data.msg)
      }
    }).catch(err => {
      message.error('网络异常')
    })
  }
  // 编辑用户组
  editGroup = () => {
    axios.put('/role/edit', {
      name: this.state.groupData.name,
      id: this.state.groupData.id
    }).then(res => {
      if (res.data && res.data.code === 200) {
        message.success('修改成功')
        this.getGroupLists()
        this.setState({
          groupDialogVisible: false
        })
      }else {
        message.error(res.data.msg)
      }
    }).catch(err => {
      message.error('网络异常')
    })
  }
  // 删除用户组
  deleteGroup = (item) => {
    axios.post('/role/del', {
      id: item.id
    }).then(res => {
      if (res.data && res.data.code === 200) {
        message.success('删除成功')
        this.getGroupLists()
        this.setState({
          groupDialogVisible: false
        })
      }else {
        message.error(res.data.msg)
      }
    }).catch(err => {
      message.error('网络异常')
    })
  }
  // 输入
  handleInput = (e) => {
    let obj = {...this.state.groupData}
    obj.name = e.target.value.trim()
    this.setState({
      groupData: obj
    })
  }

  // 保存
  goSave = () => {
    if (!this.state.groupActiveId) {
      message.error('请选择用户组')
      return
    }
    let isOk = true
    let ids = []
    if (Array.isArray(this.state.permissionLists) && this.state.permissionLists.length) {
      this.state.permissionLists.forEach(item => {
        if (item.checked) {
          // 如果勾选一级但是没有勾选二级
          let hasChild = item.children.some(item => item.checked)
          if (!hasChild) {
            isOk = false
            return
          }
          // 一级
          ids.push(item.id)
          if (Array.isArray(item.children) && item.children.length) {
            item.children.forEach(subItem => {
              if (subItem.checked) {
                // 二级
                ids.push(subItem.id)
                if (Array.isArray(subItem.children) && subItem.children.length) {
                  subItem.children.forEach(graItem => {
                    if (graItem.checked) {
                      // 三级
                      ids.push(graItem.id)
                    }
                  })
                }
              }
            })
          }
        }
      })
    }
    if (!isOk) {
      Modal.warning({
        title: '提示',
        content: '如果模块可见，则至少需要勾选一个栏目可见',
        onOk: () => {}
      })
      return
    }
    Modal.confirm({
      title: '提示',
      content: '此操作将修改用户组权限，是否继续？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        this.setState({
          saveLoading: true
        })
        axios({
          url: '/permission/edit',
          data: {
            roleId: this.state.groupActiveId,
            ids: ids
          },
          method: 'post'
        }).then(res => {
          this.setState({
            saveLoading: false
          })
          if (res.data && res.data.code === 200) {
            message.success('修改成功')
            this.getDetail()
          }else {
            message.error(res.data.msg)
          }
        }).catch(err => {
          this.setState({
            saveLoading: false
          })
          message.error('网络异常')
        })
      }
    })
  }
  // 搜索用户组
  keywordInput = (e) => {
    this.setState({
      keyword: e.target.value
    })
  }
  keywordSearch = () => {

  }
  // 分配资源
  resourceOpen = (item) => {
    this.setState({
      resourceVisible: true
    })
  }
  resourceClose = () => {
    this.setState({
      resourceVisible: false
    })
  }
  resourceConfirm = (selectedData) => {
    this.setState({
      confirmLoading: true
    })
    let ajaxData = Object.assign({}, selectedData, {groupId: this.state.groupActiveId})
    axios.post('/management/permission/updateResourcesPower', ajaxData).then(res => {
      this.setState({
        confirmLoading: false
      })
      if (res.data && res.data.code === 200) {
        message.success('分配成功')
        this.setState({
          resourceVisible: false
        })
      }else {
        message.error(res.data.msg)
      }
    }).catch(err => {
      this.setState({
        confirmLoading: false
      })
      message.error('网络异常')
    })
  }

  render () {
    return (
      <section className={`${styles['wrap']} clearfix`}>
        <div className={`${styles['left']}`}>
          <div className={`${styles['left-head']}`}>
            <Input value={this.state.keyword} onChange={this.keywordInput} placeholder="搜索用户组" suffix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}></Input>
            {/* <Button style={{marginLeft: '5px'}}>查询</Button> */}
          </div>
          <Spin spinning={this.state.groupLoading}>
            <ul className={`${styles['left-lists']}`}>
              {
                this.state.groupLists.map((item,index) => (
                  <li className={`${styles['left-item']} ellipsis ${item.id === this.state.groupActiveId ? styles['left-item-active'] : ''}`} key={item.id} style={{display: this.state.keyword ? (item.name.includes(this.state.keyword) ? 'block' : 'none') : 'block'}}>
                    <div className={`${styles['left-item-text']} ellipsis`} onClick={() => this.roleChange(item.id)} title={item.name}>{item.name}</div>
                    {
                      (this.state.per && this.state.per.assign) ? (
                        <Tooltip 
                          title={() => (
                            <span>
                              <Button ghost type="link" className="mr-10" style={{color: '#52C41A'}} onClick={() => this.roleDialogOpen('edit', item)}>编辑</Button>
                              <Button ghost type="link" style={{color: '#52C41A'}} onClick={() => this.roleDelete(item)}>删除</Button>
                            </span>
                          )}
                          className={`${styles['left-item-edit']} bg-color`}
                          placement="right"
                          overlayStyle={{zIndex: '99'}}
                        >
                          <Icon type="edit" />
                        </Tooltip>
                      ) : ''
                    }
                  </li>
                ))
              }
              <li className={`${styles['left-add']}`}>
                <Button type="dashed" disabled={this.state.per && this.state.per.assign === false} className={`${styles['left-add-btn']}`} icon="plus-circle" onClick={() => this.roleDialogOpen('add', {name: ''})}><span className={styles['left-add-t']}>添加用户组</span></Button>
              </li>
            </ul>
          </Spin>
        </div>
        <div className={`${styles['right']}`}>
          <div className={`${styles['right-head']}`}>
            <Row>
              <Col span={2}>可见</Col>
              <Col span={4}>模块</Col>
              <Col span={16}>权限</Col>
              <Col span={2}>全选</Col>
            </Row>
          </div>
          <Spin spinning={this.state.permissionLoading}>
            <ul className={`${styles['right-lists']}`}>
              {/* 一级 */}
              {
                this.state.permissionLists.map((item, index) => (
                <li className={`${styles['right-item']}`} key={index}>
                  <Row className={`${styles['right-itemwrap']}`}>
                    <Col span={2}>
                      <Switch disabled={this.state.per && this.state.per.assign === false} checked={item.checked} onChange={() => this.firstChange(index)}></Switch>
                    </Col>
                    <Col span={4}>
                      <div>{item.name}</div>
                      {
                        (item.name && item.name === '资源管理') ? (
                          <Button type="danger" size="small" onClick={() => this.resourceOpen(item)}>分配资源</Button>
                        ) : ''
                      }
                    </Col>
                    <Col span={16}>
                      <Row type="flex">
                        <Col span={4} className={`${styles['box-co']}`}>可见</Col>
                        <Col span={4} className={`${styles['box-co']}`}>栏目</Col>
                        {/* 三级的title */}
                        {/* {
                          item.children[0].children.map(tit => (
                            <Col span={3} className={`${styles['box-co']}`} key={tit.id}>{tit.name}</Col>
                          ))
                        } */}
                        <Col span={16} className={`${styles['box-co']}`}>功能操作</Col>
                      </Row>
                      {/* 二级 */}
                      {
                        item.children.map((subItem, subIndex) => (
                          <Row type="flex" key={subIndex} className="clearfix">
                            <Col span={4} className={`${styles['box-co']}`}><Switch checked={subItem.checked} disabled={(!item.checked) || (this.state.per && this.state.per.assign === false)} onChange={() => this.secondChange(index, subIndex)}></Switch></Col>
                            <Col span={4} className={`${styles['box-co']}`}>{subItem.name}</Col>
                            {/* 三级 */}
                            <Col span={16} style={{border: '1px solid #eee', padding: '10px'}}>
                              <Row style={{textAlign: 'left'}}>
                                {
                                  subItem.children.map((graItem, graIndex) => (
                                    <Col span={8} xs={24} sm={24} md={12} xl={8} xxl={6} key={graIndex} style={{padding: '2px'}}><Checkbox checked={graItem.checked} disabled={!item.checked || !subItem.checked || (this.state.per && this.state.per.assign === false)} onChange={() => this.thirdChange(index, subIndex, graIndex)}>{graItem.name}</Checkbox></Col>
                                  ))
                                }
                              </Row>
                            </Col>
                            {/* {
                              subItem.children.map((graItem, graIndex) => (
                                <Col span={3} className={`${styles['box-co']}`} key={graIndex}><Checkbox checked={graItem.checked} disabled={!item.checked || !subItem.checked || (this.state.per && this.state.per.assign === false)} onChange={() => this.thirdChange(index, subIndex, graIndex)}></Checkbox></Col>
                              ))
                            } */}
                          </Row>
                        ))
                      }
                    </Col>
                    <Col span={2}><Checkbox disabled={this.state.per && this.state.per.assign === false} checked={this.state.allLists[index]} onChange={() => this.getAll(index)}></Checkbox></Col>
                  </Row>
                </li>
                ))
              }
              <div className={styles['right-btnwrap']}>
                <Button disabled={this.state.per && this.state.per.assign === false} type="primary" size="large" onClick={this.goSave} loading={this.state.saveLoading}>保存</Button>
              </div>
            </ul>
          </Spin>
        </div>
        {/* 弹框 */}
        <Modal visible={this.state.groupDialogVisible} title={this.state.groupDialogType === 'add' ? '新增用户组' : '编辑用户组'} okText="提交" cancelText="取消" onOk={this.roleDialogConfirm} onCancel={this.roleDialogClose}>
            <Input value={this.state.groupData.name} onChange={this.handleInput}></Input>
        </Modal>
        {/* {
          this.state.resourceVisible && (
            <ResourceAllLists 
              visible={this.state.resourceVisible}
              groupId={this.state.groupActiveId}
              resourceClose={this.resourceClose}
              resourceConfirm={this.resourceConfirm}
              confirmLoading={this.state.confirmLoading}
            />
          )
        } */}
      </section>
    )
  }
}
const mapStateToProps = state => ({
  permission: state.permission,
})
const mapDispathToProps = {}
export default connect(mapStateToProps,mapDispathToProps)(Lists)