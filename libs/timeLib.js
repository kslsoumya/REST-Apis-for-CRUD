const moment = require('moment')
const momenttz = require('moment-timezone')
const timeZone = 'Asia/Kolkata'

let now = () => {
    return moment.utc().format();
}

let getLocalTime = () => {
    return moment.tz(timeZone).format();

}

let convertToLocalTime = (time) => {
    return momenttz.tz(time, timeZone).format('LLLL')

}

module.exprts = {
    now: now,
    getLocalTime: getLocalTime,
    convertToLocalTime: convertToLocalTime
}