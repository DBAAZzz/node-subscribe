const superagent = require('superagent');

async function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        superagent.get(url).query(params).then(res => {
            resolve(res.body)
        }).catch(err => {
            reject(err)
        })
    })
}

async function post(url, params = {}) {
    return new Promise((resolve, reject) => {
        superagent.post(url).send(params).then(res => {
            resolve(res.body)
        }).catch(err => {
            reject(err)
        })
    })
}

module.exports = {
    get, post
}