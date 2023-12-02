const fs = require("fs")
const process = require("process")
const axios = require("axios")

const arg = process.argv[2]

if (arg.startsWith("http")) {
    axios.get(arg).then(res => console.log(res.data)).catch((err) => console.error(`An error occurred: ${err}`))
}
else {
    if (fs.existsSync(arg)) {
        const data = fs.readFileSync(arg, "utf-8")
        console.log(data)
        process.exit(0)
    }
    else {
        throw Error("File does not exist")
    }
}
