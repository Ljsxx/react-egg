'use strict';

const Service = require('egg').Service;

class PermissionService extends Service {
  async getData(pid, ids) {
    const sql = 'SELECT id,name,code FROM p_permission WHERE pid=' + pid;
    const data = await this.app.mysql.query(sql) || [];
    if (data && data.length) {
      for (let i = 0; i < data.length; i++) {
        data[i].children = await this.getData(data[i].id, ids);
      }
    }
    const arr = data.filter(item => ids.indexOf(item.id) > -1);
    return arr;
  }
  async getTree(pid, ids) {
    const sql = 'SELECT id,name,code FROM p_permission WHERE pid=' + pid;
    const data = await this.app.mysql.query(sql) || [];
    if (data && data.length) {
      for (let i = 0; i < data.length; i++) {
        data[i].checked = ids.indexOf(data[i].id) > -1;
        data[i].children = await this.getTree(data[i].id, ids);
      }
    }
    return data;
  }
  // 查询全部权限
  async index(ids) {
    const lists = await this.getData(-1, ids);
    return lists;
  }
  // 获取权限组
  async getRoleLists() {
    const sql = 'SELECT id,name from p_role';
    const lists = await this.app.mysql.query(sql) || [];
    return lists;
  }
  // 根据name查询权限组
  async findRoleByName(params) {
    const sql = `SELECT * from p_role WHERE name='${params.name}' LIMIT 1`;
    const lists = await this.app.mysql.query(sql);
    return lists;
  }
  // 根据id查询权限组
  async findRoleById(params) {
    const sql = `SELECT * from p_role WHERE id='${params.id}' LIMIT 1`;
    const lists = await this.app.mysql.query(sql);
    return lists;
  }
  // 添加权限组
  async roleAdd(params) {
    const sql = `INSERT INTO p_role(name,ctime) VALUES('${params.name}', ${Date.now()})`;
    await this.app.mysql.query(sql);
    return null;
  }
  // 编辑权限组
  async roleEdit(params) {
    const sql = `UPDATE p_role SET name='${params.name}', utime=${Date.now()} WHERE id=${params.id}`;
    await this.app.mysql.query(sql);
    return null;
  }
  // 删除权限组
  async roleDel(params) {
    const sql = `DELETE FROM p_role WHERE id=${params.id}`;
    await this.app.mysql.query(sql);
    return null;
  }

  // 获取权限组下的权限
  async getRolePermission(ids) {
    const lists = await this.getTree(-1, ids);
    return lists;
  }
  // 编辑权限组下的权限
  async editRolePermission(params) {
    const sql = `UPDATE p_role SET per='${params.ids}', utime=${Date.now()} WHERE id=${params.roleId}`;
    await this.app.mysql.query(sql);
    return null;
  }
}

module.exports = PermissionService;
