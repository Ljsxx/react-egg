'use strict';

const Service = require('egg').Service;
const moment = require('moment');

class UserService extends Service {
  async login() {
    return {};
  }
  // 根据id查询
  async findById(params) {
    const user = await this.app.mysql.select('p_user', {
      where: { id: params.id },
      columns: [ 'id', 'name', 'account', 'phone' ],
      order: [[ 'id', 'desc' ]],
      limit: 1,
    });
    return user;
  }
  // 根据账号查询
  async findByAccount(params) {
    const user = await this.app.mysql.select('p_user', {
      where: { account: params.account },
      order: [[ 'id', 'desc' ]],
    });
    return user;
  }

  async getLists(params) {
    // const sql1 = `SELECT id,name,account FROM p_user WHERE name LIKE '%${params.keyword}%' ORDER BY id DESC LIMIT ${params.pageIndex * params.pageSize},${params.pageSize}`;
    const sql2 = `SELECT id,name,account,phone,gender,age FROM p_user WHERE name LIKE '%${params.keyword}%' ORDER BY id DESC LIMIT ${((params.pageIndex - 1) * params.pageSize) || 0},${params.pageSize || 10}`;
    const lists = await this.app.mysql.query(sql2);
    return lists;
  }

  // 添加用户
  async addUser(params) {
    const arr = await this.findByAccount(params);
    if (!arr.length) {
      // 未添加
      const sql = `INSERT INTO p_user(name,account,phone,gender,age,register_time,is_delete)
      VALUES('${params.name}', '${params.account}', '${params.phone}','${params.gender}','${params.age}','${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}',0);`;
      // 添加
      await this.app.mysql.query(sql);
      // 拿到id
      const userArr = await this.findByAccount(params);
      if (userArr && userArr.length) {
        const sql1 = `INSERT INTO p_password(user_id,password,create_time)
        VALUES('${userArr[0].id}', '${params.newPas}','${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}');`;
        const info = await this.app.mysql.query(sql1);
        return {
          msg: '成功',
          data: userArr[0],
          info,
          code: 200,
        };
      }
    } else {
      return {
        msg: params.account + '账号已注册',
      };
    }
  }

  // 编辑用户
  async editUser(params) {
    const arr = await this.findById(params);
    if (arr.length) {
      const sql = `UPDATE p_user SET name='${params.name}',gender='${params.gender}',age='${params.age}',phone='${params.phone}' WHERE id=${params.id}`;
      const info = await this.app.mysql.query(sql);
      return {
        msg: '成功',
        info,
        code: 200,
      };
    }
    return {
      msg: '用户不存在',
    };
  }
  // 删除用户
  async delUser(params) {
    const sql = `DELETE FROM p_user WHERE id IN (${params.ids.toString()})`;
    const info = await this.app.mysql.query(sql);
    return {
      mas: '成功',
      info,
      code: 200,
    };
  }
}

module.exports = UserService;
