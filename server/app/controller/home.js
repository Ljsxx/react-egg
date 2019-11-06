'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');
const util = require('util');
const readFilePromise = util.promisify(fs.readFile);
class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // const tmp = await fs.createReadStream('../public/web/index.html');
    // ctx.body = tmp;
    // ctx.response.type = 'html';
    // ctx.body = fs.readFileSync(path.resolve(__dirname, '../public/web/index.html'));
    ctx.response.type = 'html';
    const page = await readFilePromise(path.resolve(__dirname, '../public/web/index.html'));
    ctx.body = page;
  }
}

module.exports = HomeController;
