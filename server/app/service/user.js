'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async find(params) {
    console.log('--------------->params<---------------', params);
    const user = await this.app.mysql.select('p_user', {
      where: { id: 1 },
      columns: [ 'id', 'name', 'account', 'phone' ],
      order: [[ 'id', 'desc' ]],
      limit: +params.pageSize || 10,
      offset: (+params.pageSize * +params.pageIndex) || 0,
    });
    return user;
  }
  async getLists(params) {
    // const sql1 = `SELECT id,name,account FROM p_user WHERE name LIKE '%${params.keyword}%' ORDER BY id DESC LIMIT ${params.pageIndex * params.pageSize},${params.pageSize}`;
    const sql2 = `SELECT id,name,account FROM p_user WHERE name LIKE '%${params.keyword}%' ORDER BY id DESC LIMIT ${((params.pageIndex - 1) * params.pageSize) || 0},${params.pageSize || 10}`;
    const lists = await this.app.mysql.query(sql2);
    return lists;
  }
}

module.exports = UserService;
