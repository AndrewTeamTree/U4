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
  handleInteraction(index) {
    this.activePhrase.checkLetter(index)
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
  gameOver(gameStatus) {
    if (gameStatus === 'won') {
      this.lostMessageDisplayed = false
      gameOverMessage.append(wonMessage)
      document.querySelector('#overlay').style.display = 'block'
      document.querySelector('#overlay').classList.add('win')
    } else if (gameStatus === 'lost' && !this.lostMessageDisplayed) {
      gameOverMessage.append(lostMessage)
      document.querySelector('#overlay').style.display = 'block'
      document.querySelector('#overlay').classList.add('lose')
      this.lostMessageDisplayed = true
    }
  }

  /*
   * Checks for winning move
   */
  checkForWin() {
    if (
      this.missed === 5 ||
      document.querySelectorAll('.letter.show').length ===
        document.querySelectorAll('.letter').length
    ) {
      setTimeout(() => this.gameOver(this.missed === 5 ? 'lost' : 'won'), 500)
    }
  }

  /*
   * Removes a life from the scoreboard
   * Checks if player has remaining lives
   */
  removeALife() {
    if (this.missed < lives.length) {
      //  change liveHeart.png to lostHeart.png
      lives[this.missed].src = 'images/lostHeart.png'
      this.missed++
    }
    // Additional logic if needed when all lives are depleted
    if (this.missed === lives.length) {
      // Handle game over logic
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
