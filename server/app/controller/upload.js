'use strict';

// node.js文件操作对象
const fs = require('fs');
// node.js路径操作对象
const path = require('path');
// controller
const Controller = require('egg').Controller
// 异步二进制写入流
const awaitWriteStream = require('await-stream-ready').write;
// 管道读入一个虫洞
const sendToWormhole = require('stream-wormhole');
// md5
// const md5 = require('md5');

class UploadController extends Controller {
  async index() {
    const ctx = this.ctx;
    const stream = await ctx.getFileStream();
    // 新建一个文件名
    const filename = Date.now() + path.extname(stream.filename).toLowerCase();
    // 文件生成绝对路径
    const target = path.join(this.config.baseDir, 'app/public/uploads', filename);
    // 生成一个文件写入 文件流
    const writeStream = fs.createWriteStream(target);
    try {
      // 异步把文件流写入
      await awaitWriteStream(stream.pipe(writeStream));
    } catch (err) {
      // 错误
      await sendToWormhole(stream);
      throw err;
    }
    // 响应
    ctx.body = {
      code: 200,
      url: '/public/uploads/' + filename,
      msg: '成功',
    };
  }
}

module.exports = UploadController;
