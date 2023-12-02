/** Textual markov chain generator */

class MarkovMachine {

  words: string[]
  chains: Map<string, (string | null)[]>

  constructor(text: string) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "" && c !== ",");
    this.chains = new Map()
    this.makeChains(this.words);
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  static selectRandom(choices: (string | null)[]) {
    return choices[Math.floor(Math.random() * choices.length)]
  }

  makeChains(input: string[]) {
    for (let i = 0; i < input.length - 1; i++) {
      const currentWord = input[i]
      const nextWord = input[i + 1]
      if (this.chains.has(currentWord)) {
        if(!(this.chains.get(input[i])?.includes(nextWord))) {
          this.chains.get(currentWord)?.push(nextWord)
        }
      }
      else {
        this.chains.set(currentWord, [nextWord])
      }
    }
  }


  /** return random text from chains */

  makeText(maxWords = 100) {

    let randomWord = MarkovMachine.selectRandom(this.words)
    const result: string[] = []
    

    for (let i = 0 ; i < maxWords; i++) {
      if (!randomWord) break
      result.push(randomWord)
      const next = this.chains.get(randomWord)
      //@ts-ignore
      const nextWord = this.chains.get(randomWord);
      randomWord = nextWord ? MarkovMachine.selectRandom(nextWord) : null;
    }
    return result.join(" ")
  }
}

export {MarkovMachine}