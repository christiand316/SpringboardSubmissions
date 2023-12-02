"use strict";
/** Textual markov chain generator */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkovMachine = void 0;
var MarkovMachine = /** @class */ (function () {
    function MarkovMachine(text) {
        var words = text.split(/[ \r\n]+/);
        this.words = words.filter(function (c) { return c !== "" && c !== ","; });
        this.chains = new Map();
        this.makeChains(this.words);
    }
    /** set markov chains:
     *
     *  for text of "the cat in the hat", chains will be
     *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */
    MarkovMachine.selectRandom = function (choices) {
        return choices[Math.floor(Math.random() * choices.length)];
    };
    MarkovMachine.prototype.makeChains = function (input) {
        var _a, _b;
        for (var i = 0; i < input.length - 1; i++) {
            var currentWord = input[i];
            var nextWord = input[i + 1];
            if (this.chains.has(currentWord)) {
                if (!((_a = this.chains.get(input[i])) === null || _a === void 0 ? void 0 : _a.includes(nextWord))) {
                    (_b = this.chains.get(currentWord)) === null || _b === void 0 ? void 0 : _b.push(nextWord);
                }
            }
            else {
                this.chains.set(currentWord, [nextWord]);
            }
        }
    };
    /** return random text from chains */
    MarkovMachine.prototype.makeText = function (maxWords) {
        if (maxWords === void 0) { maxWords = 100; }
        var randomWord = MarkovMachine.selectRandom(this.words);
        var result = [];
        for (var i = 0; i < maxWords; i++) {
            if (!randomWord)
                break;
            result.push(randomWord);
            var next = this.chains.get(randomWord);
            //@ts-ignore
            var nextWord = this.chains.get(randomWord);
            randomWord = nextWord ? MarkovMachine.selectRandom(nextWord) : null;
        }
        return result.join(" ");
    };
    return MarkovMachine;
}());
exports.MarkovMachine = MarkovMachine;
