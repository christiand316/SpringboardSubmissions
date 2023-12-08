"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
function cleanNumbers(stringNumber) {
    const stringNumbers = stringNumber;
    const numbers = stringNumbers.split(",").map(n => parseInt(n));
    if (numbers.some(isNaN)) {
        console.log("Invalid input was found");
        throw Error("Invalid non-numbers");
    }
    return numbers;
}
app.get("/mean", (req, res) => {
    try {
        //@ts-ignore
        const numbers = cleanNumbers(req.query.nums);
        const mean = numbers.reduce((sum, num) => sum + num) / numbers.length;
        res.json(mean);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
app.get("/median", (req, res) => {
    try {
        //@ts-ignore
        const numbers = cleanNumbers(req.query.nums);
        const median = numbers.sort();
        res.json(median[Math.floor(median.length)]);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
app.get("/mode", (req, res) => {
    try {
        //@ts-ignore
        const numbers = cleanNumbers(req.query.nums);
        let modeMap = {};
        let maxCount = 0;
        let modes = [];
        numbers.forEach(function (num) {
            if (!modeMap[num])
                modeMap[num] = 0;
            modeMap[num]++;
            if (modeMap[num] > maxCount) {
                modes = [num];
                maxCount = modeMap[num];
            }
            else if (modeMap[num] === maxCount) {
                modes.push(num);
            }
        });
        res.json({ modes });
    }
    catch (error) {
        res.status(400).json({ "An error": error });
    }
});
app.get("/", (req, res) => {
    res.status(405).send({ "Valid requests": ["mean", "average", "mode"] });
});
app.listen(3000, () => { console.log("Successfully running Express API server"); });
