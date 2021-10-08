// xmlTool.js
const xml2js = require('xml2js')

exports.xmlToJson = (str) => {
     return new Promise((resolve, reject) => {
        const parseString = xml2js.parseString
        parseString(str, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
     })
}

exports.jsonToXml = (obj) => {
    const builder = new xml2js.Builder()
    return builder.buildObject(obj)
}

// xmlParse.js
const xml = require('./xmlTool')

module.exports = () => {
    return async (ctx, next) => {
        if (ctx.method == 'POST' && ctx.is('text/xml')) {
            let promise = new Promise(function (resolve, reject) {
                let buf = ''
                ctx.req.setEncoding('utf8')
                ctx.req.on('data', (chunk) => {
                    buf += chunk
                })
                ctx.req.on('end', () => {
                    xml.xmlToJson(buf)
                        .then(resolve)
                        .catch(reject)
                })
            })

            await promise.then((result) => {
                    ctx.req.body = result
                })
                .catch((e) => {
                    e.status = 400
                })

            next()
        } else {
            await next()
        }
    }
}


