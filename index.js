const Koa = require('koa');
const app = new Koa();

const router = require('./router')

require('./middleware/schedule');

app.use(router.routes())

app.listen(3000, () => {
    console.log('监听3000端口成功')
});
