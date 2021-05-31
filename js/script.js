//step 2

const guessed = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const textInput = document.querySelector(".letter");
const paraProgress = document.querySelector(".word-in-progress");
const paraRemaining = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
const guessedLetters = [];
console.log(guessedLetters);
let remainingGuesses = 8;

//Async function
const getWord = async function () {
  const response = await fetch ("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
  const data = await response.text();
  console.log(data);
  const wordArray = words.split("\n");
  console.log(wordArray);
  const randomIndex = Math.floor(Math.random() * wordArray.length);
  word = wordArray[randomIndex].trim();
  placeholderEachLetter(word);
};
getWord();





// function to add placeholders for each letter 

const placeholderEachLetter = function (word) {
  const letters = [];

  for (const letter of word) {
    console.log(letter);
    letters.push("•");
  }
  paraProgress.innerText = letters.join("");
};

//placeholderEachLetter(word);was here

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
    //step 5
    remainingGuessesCount(letterGuess);
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

// step 5

//function to count guesses remaining
const remainingGuessesCount = function (letterGuess) {
  const upperWord = word.toUpperCase();
  if (upperWord.includes(letterGuess)) {
    message.innerText = `Yay! The letter ${letterGuess} is in the word!`;
  } else {
    message.innerText = `The word does not contain the ${letterGuess}!`;
    remainingGuesses -= 1;
  }

  //new cond statement
  if (remainingGuesses === 0) {
    message.innerHTML = `Game over! The word is <span class="highlight">${word}</span>.`;
  }
  else if (remainingGuesses === 1) {
    remainingSpan.innerText = `You have ${remainingGuesses} guess`;
  }
  else {
    remainingSpan.innerText = `You have ${remainingGuesses} guesses`;
  }
  
};


//step 4
//function to check if player won
const checkIfWonGame = function () {
  if (word.toUpperCase() === paraProgress.innerText) {
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
    //step 5
    startOver();
  }
};


/*step 5
//function to hide and show elements
const startOver = function () {
  guessButton.classList.add("hide");
  paraRemaining.classList.add("hide");
  guessed.classList.add("hide");
  playAgainButton.classList.remove("hide");
};

//add click event to playAgainButton
playAgainButton.addEventListener("click", function () {
  message.classList.remove("win");
  message.innerText = "";
  guessed.innerHTML = "";
  remainingGuesses = 8;
  guessedLetters = [];
  remainingSpan.innerText =  `${remainingGuesses} guesses`;
  guessButton.classList.remove("hide");
  paraRemaining.classList.remove("hide");
  guessed.classList.remove("hide");
  playAgainButton.classList.add("hide");
  getWord();
});





