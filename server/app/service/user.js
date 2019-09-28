'use strict';

const Service = require('egg').Service;
const moment = require('moment')

class UserService extends Service {
  async login() {
    return {};
  }
  // 根据id查询
  async find(params) {
    const user = await this.app.mysql.select('p_user', {
      where: { id: 1 },
      columns: [ 'id', 'name', 'account', 'phone' ],
      order: [[ 'id', 'desc' ]],
      limit: +params.pageSize || 10,
      offset: (+params.pageSize * +params.pageIndex) || 0,
    });
    return user;
  }
  // 根据账号查询
  async findByAccount(params) {
    const user = await this.app.mysql.select('p_user', {
      where: { account: params.account },
      order: [[ 'id', 'desc' ]]
    });
    return user;
  }

  async getLists(params) {
    // const sql1 = `SELECT id,name,account FROM p_user WHERE name LIKE '%${params.keyword}%' ORDER BY id DESC LIMIT ${params.pageIndex * params.pageSize},${params.pageSize}`;
    const sql2 = `SELECT id,name,account FROM p_user WHERE name LIKE '%${params.keyword}%' ORDER BY id DESC LIMIT ${((params.pageIndex - 1) * params.pageSize) || 0},${params.pageSize || 10}`;
    const lists = await this.app.mysql.query(sql2);
    return lists;
  }

  // 添加用户
  async addUser (params) {
    const arr = await this.findByAccount(params)
    if (!arr.length) {
      // 未添加
      const sql = `INSERT INTO p_user(name,account,gender,age,register_time,is_delete)
      VALUES('${params.name}', '${params.account}','${params.gender}','${params.age}','${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}',0);`;
      // 添加
      await this.app.mysql.query(sql);
      // 拿到id
      const userArr = await this.findByAccount(params)
      if (userArr && userArr.length) {
        const sql1 = `INSERT INTO p_password(user_id,password,create_time)
        VALUES('${userArr[0].id}', '${params.newPas}','${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}');`;
        await this.app.mysql.query(sql1)
        return {
          msg: '注册成功',
          data: userArr[0]
        }
      }
    } else {
      return {
        msg: params.account + '账号已注册'
      }
    }
  }
}

module.exports = UserService;
