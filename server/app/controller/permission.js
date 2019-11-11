'use strict';

const Controller = require('egg').Controller;

// const crypto = require('crypto');

class PermissionController extends Controller {
  // 获取全部权限
  async index() {
    console.log('session.roleId', this.ctx.session.roleId);
    const params = {
      id: this.ctx.session.roleId,
    };
    const arr = await this.ctx.service.permission.findRoleById(params) || [];
    if (!arr || !arr.length) {
      this.ctx.body = {
        msg: '用户组不存在',
      };
      return;
    }
    const roleStr = (arr && arr[0] && arr[0].per) || '';
    const roleIds = roleStr.split(',').map(item => +item);
    const res = await this.ctx.service.permission.index(roleIds);
    this.ctx.body = {
      msg: '成功',
      data: res,
      code: 200,
    };
  }
  // 获取权限组
  async role() {
    const arr = await this.ctx.service.permission.getRoleLists();
    this.ctx.body = {
      msg: '成功',
      data: arr,
      code: 200,
    };
  }
  // 添加权限组
  async roleAdd() {
    const params = this.ctx.request.body;
    if (!params.name) {
      this.ctx.body = {
        msg: '权限组名称不能为空',
      };
      return;
    }
    const arr = await this.ctx.service.permission.findRoleByName(params);
    if (arr && arr.length) {
      this.ctx.body = {
        msg: '权限组已存在',
      };
      return;
    }
    const res = await this.ctx.service.permission.roleAdd(params);
    this.ctx.body = {
      msg: '成功',
      data: res,
      code: 200,
    };
  }
  // 编辑权限组
  async roleEdit() {
    const params = this.ctx.request.body;
    if (params.id && params.id === -1) {
      this.ctx.body = {
        msg: '默认权限组，不能编辑和删除',
      };
      return;
    }
    if (!params.name) {
      this.ctx.body = {
        msg: '权限组名称不能为空',
      };
      return;
    }
    const arr = await this.ctx.service.permission.findRoleByName(params);
    if (arr && arr.length) {
      this.ctx.body = {
        msg: '权限组已存在',
      };
      return;
    }
    const res = await this.ctx.service.permission.roleEdit(params);
    this.ctx.body = {
      msg: '成功',
      data: res,
      code: 200,
    };
  }
  // 删除权限组
  async roleDel() {
    const params = this.ctx.request.body;
    if (params.id && params.id === -1) {
      this.ctx.body = {
        msg: '默认权限组，不能编辑和删除',
      };
      return;
    }
    const res = await this.ctx.service.permission.roleDel(params);
    this.ctx.body = {
      msg: '成功',
      data: res,
      code: 200,
    };
  }

  // 根据权限组id获取权限
  async permissionLists() {
    const query = this.ctx.request.query;
    const params = {
      id: query.roleId,
    };
    const arr = await this.ctx.service.permission.findRoleById(params);
    if (!arr || !arr.length) {
      this.ctx.body = {
        msg: '权限组不存在',
      };
      return;
    }
    // 用户组下的权限id
    const per = (arr[0] && arr[0].per) || '';
    const ids = per.split(',').map(item => +item);
    const res = await this.ctx.service.permission.getRolePermission(ids);
    this.ctx.body = {
      msg: '成功',
      data: res,
      code: 200,
    };
  }
  // 编辑权限组下的权限
  async permissionEdit() {
    const params = this.ctx.request.body;
    const res = await this.ctx.service.permission.editRolePermission(params);
    this.ctx.body = {
      msg: '成功',
      data: res,
      code: 200,
    };
  }
}

module.exports = PermissionController;
