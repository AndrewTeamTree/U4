/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 */
//Phrase.js
class Phrase {
  constructor(phrase) {
    this.phrase = phrase.toLowerCase()
  }

  addPhraseToDisplay() {
    let char

    for (char in game.activePhrase.phrase) {
      if (game.activePhrase.phrase[char] === ' ') {
        document.querySelector(
          '#phrase ul'
        ).innerHTML += `<li class="space"> </li>`
      } else {
        let aNewLetR = game.activePhrase.phrase[char]
        document.querySelector(
          '#phrase ul'
        ).innerHTML += `<li class="letter ${aNewLetR}">${aNewLetR}</li>`
      }
    }
  }

  /*
   * Checks to see if the key clicked matches
   */
  checkLetter(index) {
    let letter = index.innerHTML
    let check = document.querySelector(`.letter.${letter}`)

    if (check) {
      this.showMatchedLetter(check)
      index.classList.add('chosen')
    } else {
      if (!index.classList.contains('wrong')) {
        // Deduct a life only if it's not already marked as wrong
        index.classList.add('wrong')
        game.removeALife()
      }
    }

    game.checkForWin()
  }

  /*
   * Displays passed letter on screen after a match is found
   */
  showMatchedLetter(letter) {
    letter.classList.add('show')
    // Display the char of the corresponding letters and check if the game is won

    // Use querySelectorAll to select all elements with the same class
    const matchingLetters = document.querySelectorAll(
      `.letter.${letter.classList[1]}`
    )

    // Loop through each matching letter and add the 'show' class
    matchingLetters.forEach((matchingLetter) => {
      matchingLetter.classList.add('show')
    })
  }
}
