'use strict';

const Service = require('egg').Service;

class AdminService extends Service {
  // 根据id查询
  async findByIdAndPwd(params) {
    const user = await this.app.mysql.select('p_password', {
      where: { user_id: params.id, password: params.password },
      columns: [ 'id' ],
      order: [[ 'id', 'desc' ]],
      limit: 1,
    });
    return user;
  }
}

module.exports = AdminService;
