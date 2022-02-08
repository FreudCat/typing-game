// Global 
let score = 0; 
let isPlaying;
function Initialize() {

  userInput.addEventListener("input", startMatch);
}

const levels = {
  easy: 5,
  medium: 3,
  hard: 1
};

// DOM variables 
const currentWord = document.querySelector("#current-word");
const showScore = document.querySelector("#score");
const remainingWords = document.querySelector("#remaining-words");
const startButton = document.querySelector("#start-button");
const userInput = document.querySelector("#typed-input");
const message = document.querySelector("#message"); 
const displayTime = document.querySelector(".display-time");
const timeLeft = document.querySelector("#time-left");


const wordList = [
  "stifle",
  "knee",
  "tarsus",
  "tarsi",
  "carpus",
  "carpi", 
  "cytology",
  "leukocytes",
  "leukocytosis",
  "thrombocyte",
  "thrombocytosis",
  "thrombocytopenia",
  "pancytopenia",
  "erythrocyte",
  "platelet",
  "neutrophil",
  "eosinophils",
  "eosinopenia",
  "macrocytosis",
  "aspirate",
  "hemostasis",
  "basophil",
  "macrophage",
  "lymphocyte"

];

startButton.addEventListener("click", function() {
  isTime.classList.contains("invisible") ? "" : startCountdown(60);
  newWord(wordList);
})

// Add or remove the timer display when user clicks on the "timed" button
const isTime = document.querySelector(".display-time");
document.querySelector("#toggle-time").addEventListener("click", function() {
  isTime.classList.contains("invisible") ? isTime.classList.remove("invisible") : isTime.classList.add("invisible");
})

function startCountdown(seconds) {
  let counter = seconds;
    
  const interval = setInterval(() => {
    timeLeft.innerHTML = counter;
    counter--;
      
    if (counter < 0 ) {
      clearInterval(interval);
      console.log('Ding!');
    }
  }, 1000);
}

function newWord(wordArray) {
  let randomNumber = Math.floor(Math.random() * wordArray.length)
  currentWord.innerHTML = wordArray[randomNumber];
}

userInput.addEventListener("input", () => {
  if (userInput.value === currentWord.innerHTML) {
    message.innerHTML = "Great job!";
    userInput.value = "";
    newWord(wordList);
    return true;
  } else {
    message.innerHTML = "Not quite";
    return false;
  }
});


function startMatch() {
  if (matchWords()) {
    isPlaying = true;
    userInput.value = "";
    score++; 
  }
}

function matchWords() {
  
}



function checkStatus() {
  if (!isPlaying && time === 0) {
    message.innerHTML = "Well done!";
    score = -1;
  }
}
