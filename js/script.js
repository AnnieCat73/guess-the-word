const guessed = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const textInput = document.querySelector(".letter");
const paraProgress = document.querySelector(".word-in-progress");
const paraRemaining = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
let guessedLetters = [];
console.log(guessedLetters);
let remainingGuesses = 8;


const getWord = async function () {
  const response = await fetch ("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
  const data = await response.text();
  const wordArray = data.split("\n");
  const randomIndex = Math.floor(Math.random() * wordArray.length);
  word = wordArray[randomIndex].trim();
  placeholderEachLetter(word);
};

getWord();


const placeholderEachLetter = function (word) {
  const letters = [];

  for (const letter of word) {
    
    letters.push("•");
  }
  paraProgress.innerText = letters.join("");
};


guessButton.addEventListener("click", function (e) {
  e.preventDefault();
  const letterGuess = textInput.value;
  
  clearInput();
  
  message.innerText = "";
  const result = validateInput(letterGuess);
  console.log(result);

  
  if (result) {
  makeGuess(letterGuess);
  }
  
});

const clearInput = function () {
  textInput.value = "";
};


const validateInput = function (input) {
  const acceptedLetter = /[a-zA-Z]/;

  if (input.length === 0) {
    message.innerText = "Please type a letter.";
  }
  else if (input.length > 1) {
    message.innerText = "Please type 1 letter only.";
  }
  else if (!input.match(acceptedLetter)) {
    message.innerText = "Letters only accepted as values.";
  }
  else {
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
    remainingGuessesCount(letterGuess);
    updateGuessedLetters();
    updateWordInProgress(guessedLetters);
  }
};


const updateGuessedLetters = function () {
  guessed.innerHTML = "";
  for (const letter of guessedLetters) {
    const li = document.createElement("li");
    li.innerText = letter;
    guessed.append(li);
  }
};


const updateWordInProgress = function (guessedLetters) {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  
  const updatedCharacters = [];
  
  for (const letter of wordArray) {
    if (guessedLetters.includes(letter)) {
      updatedCharacters.push(letter.toUpperCase());
    } else {
        updatedCharacters.push("•");
    }
  }
  paraProgress.innerText = updatedCharacters.join("");
  checkIfWonGame();
};


const remainingGuessesCount = function (letterGuess) {
  const upperWord = word.toUpperCase();
  if (upperWord.includes(letterGuess)) {
    message.innerText = `Yay! The letter ${letterGuess} is in the word!`;
  } else {
    message.innerText = `The word does not contain the ${letterGuess}!`;
    remainingGuesses -= 1;
  }

  
  if (remainingGuesses === 0) {
    message.innerHTML = `Game over! The word is <span class="highlight">${word}</span>.`;
    startOver();
  }
  
  else if (remainingGuesses === 1) {
    remainingSpan.innerText = `${remainingGuesses} guess`;
  }
  else {
    remainingSpan.innerText = `${remainingGuesses} guesses`;
  }
};



const checkIfWonGame = function () {
  if (word.toUpperCase() === paraProgress.innerText) {
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    
    startOver();
  }
};



const startOver = function () {
  guessButton.classList.add("hide");
  paraRemaining.classList.add("hide");
  guessed.classList.add("hide");
  playAgainButton.classList.remove("hide");
};


playAgainButton.addEventListener("click", function () {
  message.classList.remove("win");
  message.innerText = "";
  guessed.innerHTML = "";
  remainingGuesses = 8;
  guessedLetters = [];
  
  remainingSpan.innerText =  `${remainingGuesses} guesses`;
  getWord();

  guessButton.classList.remove("hide");
  paraRemaining.classList.remove("hide");
  guessed.classList.remove("hide");
  playAgainButton.classList.add("hide");
});





