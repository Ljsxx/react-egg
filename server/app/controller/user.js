'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async info() {
    console.log('info');
    // const { ctx } = this;
    // const uid = ctx.params.id;
    console.log('--------------->this<---------------', this.ctx.query);
    console.log('--------------->ctx<---------------', this.ctx);
    const user = await this.ctx.service.user.getLists(this.ctx.query);
    this.ctx.body = user;
  }
}

module.exports = UserController;
