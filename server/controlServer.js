const { get, post } = require('../utils/request')
const { getString, setString } = require('../middleware/redis')
const { appID, appsecret } = require('../config')

async function getWXToken() {
    let { access_token, expires_in } = await get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appID}&secret=${appsecret}`)
    setString('wxtoken', access_token, expires_in)
}

async function sendTemepleMessage(openid, templateId) {
    let token = await getString('wxtoken')
    let userInfo = await get(`https://api.weixin.qq.com/cgi-bin/user/info?access_token=${token}&openid=${openid}&lang=zh_CN`)
    console.log('userInfo', userInfo)
    await post(`https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${token}`, {
        touser: openid,
        template_id: templateId,
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