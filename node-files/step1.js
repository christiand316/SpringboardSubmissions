const fs = require("fs")
const process = require("process")

const arg = process.argv[2]

if (fs.existsSync(arg)) {
    const data = fs.readFileSync(arg, "utf-8")
    console.log(data)
    process.exit(0)
}
else {
    throw Error("File does not exist")
}