import { MarkovMachine } from "./markov";
import * as fs from "fs"
import axios from "axios"

function generate(text: string) {
    const mm = new MarkovMachine(text)
    console.log(mm.makeText())
}

async function determineModality(args: string[]) {
    const dataLocation = args[0]
    if (dataLocation.startsWith("http")) {
        axios.get(dataLocation).then((res) => { generate(res.data) }).catch((err) => { console.error(err) })
    }
    else {
        fs.readFile(dataLocation, "utf8", (err, data) => { if (!err) { console.log(data) } else console.error(err) })
    }
}

determineModality(process.argv.slice(2))