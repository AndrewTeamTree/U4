/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btn__reset').addEventListener('click', () => {
    // Initialize the game
    game = new Game()
    game.startGame()

    // Move the event listener for keys inside the 'click' event listener
    document.getElementById('qwerty').addEventListener('click', (event) => {
      const clickedElement = event.target
      if (clickedElement.classList.contains('key')) {
        const clickedLetter = clickedElement.textContent
        game.handleInteraction(clickedLetter)
      }
    })
  })
})
