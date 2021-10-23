


const timeJSToSQL = ( t ) => {
    return t.toISOString().replace('T', ' ').replace('Z',"")
}

const timeSQLToJS = ( t ) => {
    const year = Number(t.slice(0,4))
    const month = Number(t.slice(5,7)) - 1
    const day = Number(t.slice(8,10))
    const hour = Number(t.slice(11,13)) - 7
    const minute = Number(t.slice(14,16))
    const second = Number(t.slice(17,19))
    const mSecond = Number(t.slice(20))

    return new Date( year, month, day, hour, minute, second, mSecond)
}

module.exports = { timeJSToSQL, timeSQLToJS }