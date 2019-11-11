'use strict';

const Controller = require('egg').Controller;

const crypto = require('crypto');

class AdminController extends Controller {
  // 注册
  async register() {
    const formData = this.ctx.request.body;
    if (!formData.account) {
      this.ctx.body = {
        msg: '账号不能为空',
      };
      return;
    }
    if (!formData.password) {
      this.ctx.body = {
        msg: '密码不能为空',
      };
      return;
    }
    // 验证用户
    const user = await this.ctx.service.user.findByAccount(formData);
    if (user && user.length) {
      this.ctx.body = {
        msg: '账号已存在',
      };
      return;
    }
    const md5 = crypto.createHash('md5');
    formData.newPas = md5.update(this.ctx.request.body.password).digest('hex');
    const res = await this.ctx.service.user.addUser(formData);
    this.ctx.body = res;
  }
  // 登录
  async login() {
    const formData = this.ctx.request.body;
    if (!formData.account) {
      this.ctx.body = {
        msg: '账号不能为空',
      };
      return;
    }
    if (!formData.password) {
      this.ctx.body = {
        msg: '密码不能为空',
      };
      return;
    }
    console.log('admin登录');
    console.log('--------------->body<---------------', formData);
    const md5 = crypto.createHash('md5');
    const newPas = md5.update(this.ctx.request.body.password).digest('hex');
    console.log('--------------->newPas<---------------', newPas);
    // 验证用户
    const user = await this.ctx.service.user.findByAccount(formData);
    if (!user || !user.length) {
      this.ctx.body = {
        msg: '用户不存在',
      };
      return;
    }
    // 验证密码
    const arr = await this.ctx.service.admin.findByIdAndPwd({
      id: user[0] && user[0].id,
      password: newPas,
    });
    if (!arr || !arr.length) {
      this.ctx.body = {
        msg: '密码错误',
      };
      return;
    }
    // this.ctx.session.user = user[0];
    this.ctx.session.userId = user[0].id;
    this.ctx.session.roleId = user[0].role_id;
    // this.ctx.cookies.set('userinfo', JSON.stringify(user[0]), {
    //   // 设置这个键值对在浏览器的最长保存时间。是一个从服务器当前时刻开始的毫秒数。
    //   maxAge: 30 * 3600 * 1000,
    //   // 设置键值对是否可以被 js 访问，默认为 true，不允许被 js 访问
    //   httpOnly: true,
    //   // 设置是否对 Cookie 进行加密，如果设置为 true，则在发送 Cookie 前会对这个键值对的值进行加密，客户端无法读取到 Cookie 的明文值。默认为 false
    //   encrypt: false,
    //   // 设置是否对 Cookie 进行签名，如果设置为 true，则设置键值对的时候会同时对这个键值对的值进行签名，后面取的时候做校验，可以防止前端对这个值进行篡改。默认为 true。
    //   signed: true,
    // });
    this.ctx.body = {
      msg: '成功',
      code: 200,
    };
  }
  // 退出
  async logout() {
    this.ctx.session.user = null;
    this.ctx.session.userId = null;
    this.ctx.body = {
      msg: '成功',
      code: 200,
    };
  }
}

module.exports = AdminController;
