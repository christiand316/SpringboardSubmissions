const {sqlForPartialUpdate} = require("./sql")

const incomingData = {firstName: 'Aliya', age: 32}
const jsToSqlRule = {firstName: "first_name", age: "age"}
const outputData = `['"first_name"=$1', '"age"=$2']`

describe("sqlForPartialUpdate", () => {
    test("to succeed with intended values", () => {
        // `{firstName: 'Aliya', age: 32}`
        // `['"first_name"=$1', '"age"=$2']`
        const result = sqlForPartialUpdate(incomingData, jsToSqlRule)
        expect(result)
        .toEqual({"setCols": "\"first_name\"=$1, \"age\"=$2", "values": ["Aliya", 32]})
    }),
    test("fails on empty object", () => {
        expect(() => sqlForPartialUpdate({},{})).toThrow()
    }),
    test("succeeds when jsToSql schema doesn't exist", () => {
        expect(sqlForPartialUpdate(incomingData, {}))
        .toEqual({"setCols": "\"firstName\"=$1, \"age\"=$2", "values": ["Aliya", 32]})
    })
    test("succeeds when there are unused jsToSql schema fields", () => {
        expect(sqlForPartialUpdate(incomingData, {throwawayData: "something_random"}))
        .toEqual({"setCols": "\"firstName\"=$1, \"age\"=$2", "values": ["Aliya", 32]})
    })
})