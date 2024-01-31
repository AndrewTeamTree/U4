/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 */
//Phrase.js

//Phrase class to handle the creation of phrases
class Phrase {
	constructor(phrase) {
		this.phrase = phrase.toLowerCase()
	}
	addPhraseToDisplay() {
		for (let char of this.phrase) {
			const li = document.createElement('li')
			if (char === ' ') {
				li.className = 'space'
			} else {
				li.className = `letter ${char}`
				li.textContent = char
			}
			document.querySelector('#phrase ul').appendChild(li)
		}
	}
	/*
	 * Checks to see if the key clicked matches
	 */
	checkLetter(letter) {
		return this.phrase.includes(letter)
	}
	/*
	 * Displays passed letter on screen after a match is found
	 */
	showMatchedLetter(letter) {
		let matchingLetters = document.querySelectorAll(`.letter.${letter}`)
		matchingLetters.forEach((matchingLetter) => {
			matchingLetter.classList.add('show')
			matchingLetter.classList.add('chosen')
		})
	}
}