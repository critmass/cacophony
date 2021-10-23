const { timeJSToSQL, timeSQLToJS } = require("../../helpers/timeConverter")

const timeJS  = new Date(2024, 9, 6, 8, 2, 30, 450)
const timeSQL = "2024-10-06 15:02:30.450"

describe("JS Date to SQL timestamp", () => {
    it("can convert JS Date object to SQL timestamp", () => {
        expect(timeJSToSQL(timeJS)).toBe(timeSQL)
    })
})


describe("Time JS to SQL", () => {
    it("can covert SQL timestamp to JS Date object", () => {
        const t = timeSQLToJS(timeSQL)
        expect(t.getDate()).toBe(6)
        expect(t.getFullYear()).toBe(2024)
        expect(t.getHours()).toBe(8)
        expect(t.getMinutes()).toBe(2)
        expect(t.getSeconds()).toBe(30)
    })
})