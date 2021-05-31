//step 2

const guessed = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const textInput = document.querySelector(".letter");
const paraProgress = document.querySelector(".word-in-progress");
const paraRemaining = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];
console.log(guessedLetters);




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
  //console.log(letterGuess);
  clearInput();
  // from step 3
  message.innerText = "";//empty message paragraph
  const result = validateInput(letterGuess);
  console.log(result);

  //step 4
  if (result) {
  makeGuess(letterGuess);
  }
  
});
const clearInput = function () {
  textInput.value = "";
};


//step 3

//create a function to check player's input

const validateInput = function (input) {
  const acceptedLetter = /[a-zA-Z]/;

  if (input.length === 0) {//if no input
    //console.log();
    message.innerText = "Please type a letter.";
  }
  else if (input.length > 1) {//if more than 1 letter
    //console.log("Please type 1 letter only");
    message.innerText = "Please type 1 letter only";

  }
  else if (!input.match(acceptedLetter)) {//if not a letter
    //console.log("Letters only accepted as values");
    message.innerText = "Letters only accepted as values";
  }
  else {//log out the letter
    return input;
  }
};

const makeGuess = function (letterGuess) {
  letterGuess = letterGuess.toUpperCase();
  if (guessedLetters.includes(letterGuess)) {
    message.innerText = "You have already guessed that letter, please try again!";
  }
  else {
    guessedLetters.push(letterGuess);
    console.log(guessedLetters);
    //step 4
    updateGuessedLetters();
    updateWordInProgress(guessedLetters);
  }
};

//step 4

//function to show the guessed letters
const updateGuessedLetters = function () {
  guessed.innerHTML = "";
  for (const letter of guessedLetters) {
    const li = document.createElement("li");
    li.innerText = letter;
    guessed.append(li);
  }
};

//function to update the word in progress
const updateWordInProgress = function (guessedLetters) {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");//return the letters the player inputs into an array
  console.log(wordArray);
  //array for updated characters
  const updatedCharacters = [];
  //loop over wordArray
  for (const letter of wordArray) {
    if (guessedLetters.includes(letter)) {
      updatedCharacters.push(letter.toUpperCase());
    } else {
        updatedCharacters.push("•");
    }
    
  }
  console.log(updatedCharacters);
  paraProgress.innerText = updatedCharacters.join("");
  checkIfWonGame();
};

//function to check if player won
const checkIfWonGame = function () {
  if (word.toUpperCase() === paraProgress.innerText) {
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
  }
};


