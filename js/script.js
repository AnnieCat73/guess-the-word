const guessed = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const textInput = document.querySelector(".letter");
const paraProgress = document.querySelector(".word-in-progress");
const paraRemaining = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";


// function to add placeholders for each letter 

const placeholderEachLetter = function (word) {
  const letters = [];

  for (const letter of word) {
    console.log(letter);
    letters.push("•");
  }
  paraProgress.innerText = letters.join("");
};

placeholderEachLetter(word);

//add Event Listener for the Guess Button

guessButton.addEventListener("click", function (e) {
  e.preventDefault();
  const letterGuess = textInput.value;
  console.log(letterGuess);
  clearInput();

});

const clearInput = function () {
  textInput.value = "";
};
