import * as fileSys from "fs"
import * as process from "process"
import axios from "axios"
import path = require("node:path")

const fileName = process.argv[2]
if (!fileName) {
    console.error("Please pass a filename")
    process.exit(1)
}

const fileRaw = fileSys.readFileSync(fileName, "utf-8")

if (!fileRaw) {
    console.error(`Failed to find or load file ${fileName}`)
    process.exit(1)
}

const urlList = fileRaw.split(`\n`)


const timeoutDelay = 5000

type Status = {
    success: boolean,
    url: string, 
    html: string
    error?: string
}

function getHostnameFromUrl(url: string) {
    const newUrl = new URL(url)
    return newUrl.hostname
}

function printDataToOutputFolder(data: Status) {
    const hostname = getHostnameFromUrl(data.url)
    const writeTo = path.join(__dirname, "/", "output")
    fileSys.writeFileSync(`${writeTo}/${hostname}`, data.html, {flag: "w+"})
}

function fetchUrl(url: string): Promise<Status> {
    return axios.get(url).then(response => {
        return {success: true,url: url,html: response.data}
    })
    .catch((error) => {
        return {
            success: false,
            url: url,
            html: null,
            error: error.message,
        }
    })
}

Promise.allSettled(urlList.map(url => fetchUrl(url))).then(results => results.forEach(result => {
    if(result.status === "fulfilled") {
        if(result.value.success === true) {
            console.log(`Found ${result.value.url}`)
            printDataToOutputFolder(result.value)
        }
        else {
            console.error(`Failed to find ${result.value.url}`)
        }
    }
})).catch(failure => console.error(failure))

// function fetchDataWithTimeout(url: string) {
//     const request = axios.get(url)
//     const timeoutPromise = new Promise((_, reject) => setTimeout((err) => reject(new Error("Failed to resolve in time")), timeoutDelay))
//     //@ts-ignore
//     return Promise.race([request, timeoutPromise]).then((response) => ({url, html: response.data})).catch((error) => {throw ({url, error})})
// }

// Promise.all(urlList.map((url) => {
//     fetchDataWithTimeout(url)
// })).then((results =>
//     console.log(results))).catch((errors) => {
//     console.error(errors)
// })

// const promises: Promise<[string, string] | unknown>[] = []

// for (const url of urlList) {
//     const fetchPromise = axios.get(url).then((response) => [url, response.data as string])
//     const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject("unique-string"), timeoutDelay))

//     const duality = Promise.race([fetchPromise, timeoutPromise])

//     promises.push(duality)
// }


// Promise.allSettled(promises).then((results) => {
//     results.forEach((result) => {
//         if (result.status === "fulfilled") {
//             const url: string = result.value[0]
//             const data: string = result.value[1]

//             if(!url || !data) {
//                 throw Error
//             }

//             const hostname = getHostnameFromUrl(url)

//             console.log(`${url} was written to file output/${hostname} with data ${data.slice(0,20)}`)
//         }
//         else {
//             const url = result.reason[0]
//             const reason = result.reason[1]

//             if(!url || !reason) {
//                 throw Error
//             }

//             const hostname = getHostnameFromUrl(url)


//             console.log(`${hostname} failed due to ${reason}`)
//         }
//     })
// })