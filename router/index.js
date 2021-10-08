const Router = require('koa-router')
const { token } = require('../config')
const getRawBody = require('raw-body')
const xml2js = require('xml2js')
const sha1 = require('sha1');
let router = new Router();

router.get('/', async (ctx, next) => {
    const signature = ctx.query.signature, timestamp = ctx.query.timestamp, nonce = ctx.query.nonce;
    const str = [token, timestamp, nonce].sort().join('');
    const result = sha1(str);
    console.log('ctx', ctx)
    if (result === signature) {
        ctx.body = ctx.query.echostr;
    } else {
        ctx.body = {
            code: -1,
            message: 'fail'
        }
    }
    await next()
})

router.post('/', async (ctx, next) => {
    var data = await getRawBody(ctx.req, {
        length: ctx.length,
        limit: '1mb',
        encoding: ctx.charset,
    })
    const xml = await parseXMLAsync(data)
    const createTime = Date.parse(new Date())
    const msgType = xml.xml.MsgType[0]
    const toUserName = xml.xml.ToUserName[0]
    const toFromName = xml.xml.FromUserName[0]
    const event = xml.xml.Event ? xml.xml.Event[0] : ''
    if (msgType == 'event' && event == 'subscribe') {
        //关注后
        ctx.body = `<xml>
            <ToUserName><![CDATA[${toFromName}]]></ToUserName>
            <FromUserName><![CDATA[${toUserName}]]></FromUserName>
            <CreateTime>${createTime}</CreateTime>
            <MsgType><![CDATA[text]]></MsgType>
            <Content><![CDATA[欢迎关注]]></Content>
            </xml>`
    } else {
        //其他情况
        ctx.body = `<xml>
            <ToUserName><![CDATA[${toFromName}]]></ToUserName>
            <FromUserName><![CDATA[${toUserName}]]></FromUserName>
            <CreateTime>${createTime}</CreateTime>
            <MsgType><![CDATA[text]]></MsgType>
            <Content><![CDATA[你说啥？]]></Content>
            </xml>`
    }
})


function parseXMLAsync(xml) {
    return new Promise((resolve, reject) => {
        xml2js.parseString(xml, { trim: true }, function (err, content) {
            if (err) {
                reject(err)
            }
            resolve(content)
        })
    })
}

module.exports = router