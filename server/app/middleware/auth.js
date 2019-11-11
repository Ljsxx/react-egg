'use strict';

module.exports = (options, app) => {
  return async function authLogin(ctx, next) {
    const whiteUrls = options.whiteUrls || [];
    const version = options.version || 'v1.0';
    // 是否在白名单
    const isWhiteUrl = whiteUrls.some(whiteUrl => ctx.url.startsWith('/' + version + whiteUrl));
    if (!isWhiteUrl) {
      // 如果不在白名单，需要验证
      if (!ctx.session.userId || !ctx.session.roleId) {
        // 未登录
        ctx.body = {
          msg: '请登录',
          code: 601,
        };
      } else {
        await next();
      }
    } else {
      await next();
    }
  };
};
