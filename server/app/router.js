'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const version = '/v1.0';
  const { router, controller } = app;
  router.get(version + '/', controller.home.index);
  router.post(version + '/login', controller.admin.login);
  router.get(version + '/logout', controller.admin.logout);
  router.post(version + '/register', controller.admin.register);
  router.get(version + '/user', controller.user.lists);
  router.get(version + '/user/:id', controller.user.detail);
  router.post(version + '/user/add', controller.user.add);
  router.post(version + '/user/edit', controller.user.edit);
  router.post(version + '/user/del', controller.user.del);
  router.post(version + '/upload', controller.upload.index);
  // 权限
  router.get(version + '/permission', controller.permission.index);
  router.get(version + '/permission/lists', controller.permission.permissionLists);
  router.post(version + '/permission/edit', controller.permission.permissionEdit);
  // 权限-获取权限组
  router.get(version + '/role', controller.permission.role);
  router.post(version + '/role/add', controller.permission.roleAdd);
  router.put(version + '/role/edit', controller.permission.roleEdit);
  router.post(version + '/role/del', controller.permission.roleDel);
};
