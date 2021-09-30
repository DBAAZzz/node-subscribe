const { get, post } = require('../utils/request')
const { appID, appsecret } = require('../config')

let token = '49_CfaPF4mb4E06vhYELEDoadRxqoWeD1h6NJU4zvSBT00oGGvUUA385LXuOQjLDEwTLCvW9YdqZ2g3YYLwv1M2l-IUAd0y-zxXNrhXDLe2jl4NKVcfSYLZzYwAZ6n1dEPKfKY-zPFXm8IuyINDLCRgADAVMB';

async function getWXToken() {
    let data = await get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appID}&secret=${appsecret}`)
    console.log('data', data)
}

async function sendTemepleMessage() {
    let userInfo = await get(`https://api.weixin.qq.com/cgi-bin/user/info?access_token=${token}&openid=oHAoD6UvjROLxXUve8TbjSdt3oMs&lang=zh_CN`)
    console.log('userInfo', userInfo)
    let data = await post(`https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${token}`, {
        touser: "oHAoD6UvjROLxXUve8TbjSdt3oMs",
        template_id: "R8O-Y9pmmRQ4eJWKfd25T2dzfJlh5x8hrdD40sYx5E0",
        data: {
            name: {
                value: userInfo.nickname,
                color: 'red'
            },
            sex: {
                value: userInfo.sex || '未知',
                color: 'red'
            }
        }
    })
}

module.exports = {
    getWXToken,
    sendTemepleMessage
}