import {addCommas} from "./addCommas"

describe("#addCommas", () => {
  test("it is a function", () => {
    expect(typeof addCommas).toBe("function")
  })

  test("`1234` -> 1,234", () => {
    expect(addCommas("1234")).toBe("1,234")
  })

  test("`1234.3` -> 1,234", () => {
    expect(addCommas("1234")).toBe("1,234")
  })
  
  test("`1234.567` -> `1,234.567`", () => {
    expect(addCommas(`1234.567`)).toBe("1,234.567")
  })

  test("`-1234.567` -> `-1,234.567`", () => {
    expect(addCommas(`-1234.567`)).toBe("-1,234.567")
  })

})
