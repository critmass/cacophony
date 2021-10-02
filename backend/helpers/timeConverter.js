


const timeJSToSQL = ( t ) => {
    return t.toISOString().slice(0,19).replace('T', ' ')
}

const timeSQLToJS = ( t ) => {
    const year = t.slice(0,4)
    const month = t.slice(5,7)
    const day = t.slice(8,10)
    const hour = t.slice(11,13)
    const minute = t.slice(14,17)
    const second = t.slice(18)
    return new Date( year, month, day, hour, minute, second, 0)
}

module.exports = { timeJSToSQL, timeSQLToJS }