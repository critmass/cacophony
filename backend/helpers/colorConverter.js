


const intToColor = ( colorAsNumber ) => {
    const r = Math.floor( colorAsNumber / (255 ** 2) )
    const b = Math.floor( (colorAsNumber - r) / 255 )
    const g = colorAsNumber - r - b

    return {r,b,g}
}

const colorToInt = ( color ) => {
    return color.r * 255**2 + color.b * 255 + color.g
}

module.exports = { intToColor, colorToInt }