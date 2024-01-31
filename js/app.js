/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

/* new instance of the `Game` class and add event listeners for the start
button and onscreen keyboard buttons*/

document.addEventListener('DOMContentLoaded', () => {
	document.getElementById('qwerty').addEventListener('click', (event) => {
		const clickedElement = event.target
		if (clickedElement.classList.contains('key')) {
			const clickedLetter = clickedElement.textContent
			game.handleInteraction(clickedLetter)
		}
	})
})