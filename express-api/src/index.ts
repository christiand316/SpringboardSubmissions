import express, { Request, Response } from "express"

const app = express()

function cleanNumbers(stringNumber: string): number[] {
    const stringNumbers: string = stringNumber

    const numbers = stringNumbers.split(",").map(n => parseInt(n))

    if (numbers.some(isNaN)) {
        console.log("Invalid input was found")
        throw Error("Invalid non-numbers")
    }
    return numbers
}

app.get("/mean", (req: Request, res: Response) => {
    try {
        //@ts-ignore
        const numbers = cleanNumbers(req.query.nums)

        const mean = numbers.reduce((sum, num) => sum + num) / numbers.length

        res.json(mean)
    } catch (error) {
        res.status(400).json(error)
    }
})
app.get("/median", (req: Request, res: Response) => {
    try {
        //@ts-ignore
        const numbers = cleanNumbers(req.query.nums)

        const median = numbers.sort()

        res.json(median[Math.floor(median.length)])
    } catch (error) {
        res.status(400).json(error)
    }
})
app.get("/mode", (req: Request, res: Response) => {
    try {
        //@ts-ignore
        const numbers = cleanNumbers(req.query.nums)

        let modeMap: {[key: number]: number} = {};
        let maxCount = 0;
        let modes: number[] = []

        numbers.forEach(function (num) {
            if (!modeMap[num]) modeMap[num] = 0;
            modeMap[num]++;

            if (modeMap[num] > maxCount) {
                modes = [num];
                maxCount = modeMap[num];
            } else if (modeMap[num] === maxCount) {
                modes.push(num);
            }
        });

        res.json({ modes })
    } catch (error) {
        res.status(400).json({ "An error": error })
    }
})


app.get("/", (req: Request, res: Response) => {
    res.status(405).send({ "Valid requests": ["mean", "average", "mode"] })
})

app.listen(3000, () => { console.log("Successfully running Express API server") })