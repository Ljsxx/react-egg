'use strict';

const Controller = require('egg').Controller;

const crypto = require('crypto');

class UserController extends Controller {
  async info() {
    console.log('ctx', this.ctx);
    console.log('session.user', this.ctx.session.user);
    console.log('cookie', this.ctx.cookies.get('userinfo'));
    const user = await this.ctx.service.user.getLists(this.ctx.query);
    this.ctx.body = user;
  }

  // 添加用户
  async add() {
    const formData = this.ctx.request.body;
    const res = {
      msg: '错误',
    };
    if (!formData.name) {
      this.ctx.body = res;
      return;
    }
    if (!formData.account) {
      this.ctx.body = res;
      return;
    }
    if (!formData.password) {
      this.ctx.body = res;
      return;
    }
    let md5 = crypto.createHash('md5');
    formData.newPas = md5.update(formData.password).digest('hex');
    const user = await this.ctx.service.user.addUser(formData);
    // res.msg = '成功';
    // res.data = user;
    this.ctx.body = user;
  }

  // 编辑
  async edit() {
    const formData = this.ctx.request.body;
    if (!formData.name) {
      this.ctx.body = {
        msg: '姓名不能为空',
      };
      return;
    }
    if (!formData.account) {
      this.ctx.body = {
        msg: '账号不能为空',
      };
      return;
    }
    const res = await this.ctx.service.user.editUser(formData);
    this.ctx.body = res;
  }
  // 删除
  async del() {
    const formData = this.ctx.request.body;
    if (!formData.ids || !formData.ids.length) {
      this.ctx.body = {
        msg: 'id不能为空',
      };
      return;
    }
    const res = await this.ctx.service.user.delUser(formData);
    this.ctx.body = res;
  }
}

module.exports = UserController;
