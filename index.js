// const Koa = require('koa');
// const sha1 = require('sha1');
// const app = new Koa();
// const { token } = require('./config')

// app.use(async ctx => {
//     const signature = ctx.query.signature, timestamp = ctx.query.timestamp, nonce = ctx.query.nonce;
//     const str = [token, timestamp, nonce].sort().join('');
//     const result = sha1(str);
//     if (result === signature) {
//         ctx.body = ctx.query.echostr;
//     } else {
//         ctx.body = {
//             code: -1,
//             message: 'fail'
//         }
//     }
// });

// app.listen(3000);


const { sendTemepleMessage } = require('./server/controlServer')

sendTemepleMessage()