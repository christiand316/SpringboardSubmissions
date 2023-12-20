import axios from 'axios';

class BoggleGame {
  private secs: number;
  private score: number;
  private words: Set<string>;
  private board: HTMLElement;
  private timer: NodeJS.Timeout;

  constructor(boardId: string, secs = 60) {
    this.secs = secs; 
    this.showTimer();

    this.score = 0;
    this.words = new Set<string>();
    this.board = document.getElementById(boardId);

    this.timer = setInterval(this.tick.bind(this), 1000);

    const addWordForm = document.querySelector(".add-word");
    if (addWordForm instanceof HTMLFormElement) {
      addWordForm.addEventListener("submit", this.handleSubmit.bind(this));
    }
  }

  private showWord(word: string) {
    const wordsList = this.board.querySelector(".words");
    if (wordsList instanceof HTMLElement) {
      const listItem = document.createElement("li");
      listItem.textContent = word;
      wordsList.appendChild(listItem);
    }
  }

  private showScore() {
    const scoreElement = this.board.querySelector(".score");
    if (scoreElement instanceof HTMLElement) {
      scoreElement.textContent = this.score.toString();
    }
  }

  private showMessage(msg: string, cls: string) {
    const msgElement = this.board.querySelector(".msg");
    if (msgElement instanceof HTMLElement) {
      msgElement.textContent = msg;
      msgElement.className = `msg ${cls}`;
    }
  }

  /* handle submission of word: if unique and valid, score & show */
  private async handleSubmit(evt: Event) {
    evt.preventDefault();
    const wordInput = this.board.querySelector(".word");
    if (wordInput instanceof HTMLInputElement) {
      let word = wordInput.value;
      if (!word) return;

      if (this.words.has(word)) {
        this.showMessage(`Already found ${word}`, "err");
        return;
      }

      // check server for validity
      try {
        const resp = await axios.get("/check-word", { params: { word: word } });
        if (resp.data.result === "not-word") {
          this.showMessage(`${word} is not a valid English word`, "err");
        } else if (resp.data.result === "not-on-board") {
          this.showMessage(`${word} is not a valid word on this board`, "err");
        } else {
          this.showWord(word);
          this.score += word.length;
          this.showScore();
          this.words.add(word);
          this.showMessage(`Added: ${word}`, "ok");
        }
      } catch (error) {
        console.error(error);
      }

      wordInput.value = "";
      wordInput.focus();
    }
  }
//timer update
  private showTimer() {
    const timerElement = this.board.querySelector(".timer");
    if (timerElement instanceof HTMLElement) {
      timerElement.textContent = this.secs.toString();
    }
  }

  private async tick() {
    this.secs -= 1;
    this.showTimer();

    if (this.secs === 0) {
      clearInterval(this.timer);
      await this.scoreGame();
    }
  }

// end of game
  private async scoreGame() {
    const addWordForm = this.board.querySelector(".add-word");
    if (addWordForm instanceof HTMLElement) {
      addWordForm.style.display = "none";
    }

    try {
      const resp = await axios.post("/post-score", { score: this.score });
      if (resp.data.brokeRecord) {
        this.showMessage(`New record: ${this.score}`, "ok");
      } else {
        this.showMessage(`Final score: ${this.score}`, "ok");
      }
    } catch (error) {
      console.error(error);
    }
  }
}
