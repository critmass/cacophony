const bcrypt = require("bcrypt")

const db = require("../../db")
const { BCRYPT_WORK_FACTOR } = require("../../config")
const { colorToInt } = require("../../helpers/colorConverter")
const { timeJSToSQL } = require("../../helpers/timeConverter")

const defaultImgURL = "https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg"
const defaultTimeJS = new Date(2024, 10, 1, 12, 43, 55, 0)
const defaultTimeSQL = timeJSToSQL(defaultTimeJS)
const colorRed = colorToInt({ r: 255, b: 0, g: 0 })
const colorBlue = colorToInt({ r: 0, b: 255, g: 0 })
const colorGreen = colorToInt({ r: 0, b: 0, g: 255 })