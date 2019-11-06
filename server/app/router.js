'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/login', controller.admin.login);
  router.get('/logout', controller.admin.logout);
  router.post('/register', controller.admin.register);
  router.get('/user', controller.user.lists);
  router.get('/user/:id', controller.user.detail);
  router.post('/user/add', controller.user.add);
  router.post('/user/edit', controller.user.edit);
  router.post('/user/del', controller.user.del);
  router.post('/upload', controller.upload.index);
  // 权限
  router.get('/permission', controller.permission.index);
};
