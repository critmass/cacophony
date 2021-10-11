


const timeJSToSQL = ( t ) => {
    return t.toISOString().replace('T', ' ').replace('Z',"")
}

const timeSQLToJS = ( t ) => {
    const year = Number(t.slice(0,4))
    const month = Number(t.slice(5,7))
    const day = Number(t.slice(8,10))
    const hour = Number(t.slice(11,13))
    const minute = Number(t.slice(14,17))
    const second = Number(t.slice(18,20))
    const mSecond = Number(t.slice(21))

    return new Date( year, month, day, hour, minute, second, mSecond)
}

module.exports = { timeJSToSQL, timeSQLToJS }