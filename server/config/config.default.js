/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {
    // 数据库
    mysql: {
      // 单数据库信息配置
      client: {
        // host
        host: 'localhost',
        // 端口号
        port: '3306',
        // 用户名
        user: 'root',
        // 密码
        password: '123456',
        // 数据库名
        database: 'react_egg',
      },
      // 是否加载到 app 上，默认开启
      app: true,
      // 是否加载到 agent 上，默认关闭
      agent: false,
    },
    // 跨域
    security: {
      csrf: {
        enable: false,
        ignoreJSON: true,
      },
      domainWhiteList: [ 'http://localhost:3000' ],
    },
    cors: {
      origin: 'http://localhost:3000',
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
      credentials: true,
    },
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1569376069854_6938';

  // add your middleware config here
  config.middleware = [
    'auth',
  ];
  config.auth = {
    // 免验证路由
    whiteUrls: [
      '/login',
      '/logout',
    ],
  };
  // session配置
  config.session = {
    key: 'ESS_SE',
    maxAge: 30 * 60 * 1000,
    httpOnly: true,
    encrupt: true,
    // 每次访问页面都会给session会话延长时间
    renew: true,
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
