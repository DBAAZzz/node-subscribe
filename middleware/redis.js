const redis = require('redis');
const { host, port } = require('../config')

const PASSWORD = 97010500;
const client = redis.createClient(port, host, {
    password: PASSWORD
})
// 指定连接到redis的1号DB
client.select(1, () => { })

function setString(key, value, exprires) {
    return new Promise((resolve, reject) => {
        client.set(key, value, (err, value) => {
            if (err) {
                reject(err)
            }
            if (exprires) {
                client.expire(key, exprires)
            }
            resolve(value)
        })
    })
}

function getString(key) {
    return new Promise((resolve, reject) => {
        client.get(key, (err, value) => {
            if (err) {
                reject(err)
            }
            resolve(value)
        })
    })
}

function del(key) {
    client.del(key);
}

module.exports = {
    client,
    setString,
    getString,
    del
}