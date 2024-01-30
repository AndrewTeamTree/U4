/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

// Event listener for keyboard buttons
let keys = document.querySelectorAll('.key')

// Document Selectors
let gameOverMessage = document.getElementById('game-over-message')
let lives = document.querySelectorAll('.tries img')

// Messages
const wonMessage = 'Congratulations You Have Won!!'
const lostMessage = 'Sorry you have run out of lives. Please Try Again!'

// Opening to Game Class
class Game {
  constructor() {
    this.missed = 0
    this.phrases = [
      new Phrase('The box is never empty'),
      new Phrase('Do it and make it count'),
      new Phrase('Be in this moment for good'),
      new Phrase(`The light shines tomorrow`),
      new Phrase('Question everything'),
    ]
    this.activePhrase = null
  }
  handleInteraction(letter) {
    const isMatch = this.activePhrase.checkLetter(letter)

    if (isMatch) {
      this.activePhrase.showMatchedLetter(letter)
      const hasWon = this.checkForWin()
      if (hasWon) {
        this.gameOver('won')
      }
    } else {
      this.removeLife()
    }
  }
  /*
   * Selects random phrase from phrases property
   */
  getRandomPhrase() {
    return this.phrases[Math.floor(Math.random() * this.phrases.length)]
  }

  /*
   * Begins game by selecting a random phrase and displaying it to user
   * hides the overlay sets the game-over-message to empty
   * sends new random phrase to the addPhraseToDisplay()
   */
  startGame() {
    document.querySelector('#overlay').style.display = 'none'
    this.resetGame()
    this.activePhrase = this.getRandomPhrase()
    this.activePhrase.addPhraseToDisplay()
  }

  /*
   * Displays game over message
   */
  gameOver(outcome) {
    const overlay = document.getElementById('overlay')
    overlay.style.display = 'block'
    overlay.classList.add(outcome === 'won' ? 'win' : 'lose')
    document.getElementById('game-over-message').textContent =
      outcome === 'won'
        ? 'Congratulations, You Won!'
        : 'Sorry, You Lost. Try Again!'
  }

  /*
   * Checks for winning move
   */
  checkForWin() {
    const allLetters = document.querySelectorAll('.letter')
    const revealedLetters = document.querySelectorAll('.letter.show')

    return allLetters.length === revealedLetters.length
  }

  /*
   * Removes a life from the scoreboard
   * Checks if player has remaining lives
   */
  removeLife() {
    if (this.missed < 5) {
      lives[this.missed].src = 'images/lostHeart.png'
      this.missed++
    }

    if (this.missed === 5) {
      this.gameOver('lost')
    }
  }
  /*
   * Resets the game to its initial state
   */
  resetGame() {
    // Remove the 'lose' and 'win' classes
    const overlay = document.querySelector('#overlay')
    overlay.classList.remove('lose', 'win')

    document.querySelector('#game-over-message').textContent = ''
    document.querySelector('#phrase ul').innerHTML = ''
    const keys = document.querySelectorAll('.key')

    keys.forEach((key) => {
      key.classList.remove('chosen', 'wrong')
    })

    // Reset the missed count and hearts
    this.missed = 0
    const lives = document.querySelectorAll('.tries img')
    lives.forEach((life) => {
      life.src = 'images/liveHeart.png'
    })
  }
}
