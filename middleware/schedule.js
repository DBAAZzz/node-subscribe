var schedule = require('node-schedule');
const { getWXToken } = require('../server/controlServer')

function scheduleCronstyle() {
    schedule.scheduleJob('0/2000 * * * * *', function () {
        getWXToken()
    });
}

scheduleCronstyle();