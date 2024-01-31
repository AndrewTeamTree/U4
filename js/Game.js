/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 *Game.js*/
/* Game class methods for starting and ending the game, handling
interactions, getting a random phrase, checking for a win, and removing a life from the
scoreboard*/
// Event listener for keyboard buttons
let keys = document.querySelectorAll('.key')
let gameOverMessage = document.getElementById('game-over-message')
let lives = document.querySelectorAll('.tries img')

let selectedKeys = document.querySelectorAll('.key.wrong')
let lastSelectedKey = selectedKeys[selectedKeys.length - 1]
let allLetters = document.querySelectorAll('#phrase .letter')
let revealedLetters = document.querySelectorAll('#phrase .letter.show')


class Game {
  constructor() {
    this.missed = 0
    this.phrases = [
      new Phrase('The box is never empty'),
      new Phrase('Do it and make it count'),
      new Phrase('Be in this moment for good'),
      new Phrase('The light shines tomorrow'),
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
      // Find the clicked key based on the letter
      const clickedKey = Array.from(keys).find(
        (key) => key.textContent.toLowerCase() === letter
      )
      if (clickedKey) {
        clickedKey.classList.add('wrong')
        clickedKey.disabled = true
        this.removeLife()
      }
    }
}

  addKeyListeners() {
    keys.forEach((key) => {
      key.addEventListener('click', (event) => {
        event.stopPropagation() // Stop event propagation
        console.log('Clicked:', event.target)
        if (event.target.classList.contains('key')) {
          event.stopPropagation()
          const letter = event.target.textContent.toLowerCase()
          console.log('Selected Letter:', letter)
          const isWrong = !this.activePhrase.checkLetter(letter)
          if (isWrong) {
            key.classList.add('wrong')
            key.disabled = true
            this.removeLife()
          } else {
            key.classList.add('chosen') // Add 'chosen' class for correct keys
            this.activePhrase.showMatchedLetter(letter)
            const hasWon = this.checkForWin()
            if (hasWon) {
              this.gameOver('won')
            }
          }
        }
      })
    })
  }
  getRandomPhrase() {
    return this.phrases[Math.floor(Math.random() * this.phrases.length)]
  }
  startGame() {
    document.querySelector('#overlay').style.display = 'none'
    this.resetGame()
    this.activePhrase = this.getRandomPhrase()
    this.activePhrase.addPhraseToDisplay()
  }
  gameOver(outcome) {
    const overlay = document.getElementById('overlay')
    overlay.style.display = 'block'
    overlay.classList.add(outcome === 'won' ? 'win' : 'lose')
    document.getElementById('game-over-message').textContent =
      outcome === 'won'
        ? 'Congratulations, You Won!'
        : 'Sorry, You Lost. Try Again!'
  }
  checkForWin() {
    const allLetters = document.querySelectorAll('.letter')
    const revealedLetters = document.querySelectorAll('.letter.show')
    return allLetters.length === revealedLetters.length
  }
  removeLife() {
    // Check if there are remaining lives
    if (this.missed < lives.length) {
      // Change liveHeart.png to lostHeart.png
      lives[this.missed].src = 'images/lostHeart.png'
      this.missed++
      // Additional logic if needed when all lives are depleted
      if (this.missed === lives.length) {
        // Handle game over logic
        this.gameOver('lost')
      }
    }
  }
  getLastSelectedKeyText() {
    const selectedKeys = document.querySelectorAll('.key.wrong')
    const lastSelectedKey = selectedKeys[selectedKeys.length - 1]
    return lastSelectedKey ? lastSelectedKey.textContent : null
  }
  resetGame() {
    // Remove the 'lose' and 'win' classes
    const overlay = document.querySelector('#overlay')
    overlay.classList.remove('lose', 'win')
    document.querySelector('#game-over-message').textContent = ''
    document.querySelector('#phrase ul').innerHTML = ''
    // Reset the missed count and hearts
    this.missed = 0
    const lives = document.querySelectorAll('.tries img')
    lives.forEach((life) => {
      life.src = 'images/liveHeart.png'
    })
    // Reset the state of the keys
    const keys = document.querySelectorAll('.key')
    keys.forEach((key) => {
      key.classList.remove('chosen', 'wrong')
      key.disabled = false // Enable the key
    })
  }
}

// Create an instance of the Game class
const game = new Game()
game.addKeyListeners()
// Add event listener for the "Start Game" button
document.getElementById('btn__reset').addEventListener('click', () => {
  game.startGame()
})
