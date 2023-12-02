const fs = require("fs")
const process = require("process")
const axios = require("axios")

const args = process.argv.slice(2)

let dataLocation
let outputFile

for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith("--")) {
        if (args[i] === "--out") {
            outputFile = args[i + 1]
            i++
        }
    }
    else {
        dataLocation = args[i]
    }
}

function returnResults(data_string) {
    if (outputFile) {
        fs.writeFileSync(outputFile, data_string, "utf-8")
    }
    else {
        console.log(data_string)
    }
}

if(!dataLocation) {
    throw Error("Data location is undefined")
}

if (dataLocation.startsWith("http")) {
    axios.get(dataLocation).then(res => returnResults(res.data)).catch((err) => console.error(`An error occurred: ${err}`))
}
else {
    if (fs.existsSync(dataLocation)) {
        const data = fs.readFileSync(dataLocation, "utf-8")
        returnResults(data)
    }
    else {
        throw Error("File does not exist")
    }
}
