// Global 
let score = 0; 
let isPlaying;

// DOM variables 
const currentWord = document.querySelector("#current-word");
const showScore = document.querySelector("#score");
const remainingWords = document.querySelector("#remaining-words");
const startButton = document.querySelector("#start-button");
const userInput = document.querySelector("#typed-input");
const message = document.querySelector("#message"); 
const displayTime = document.querySelector(".display-time");
const timeLeft = document.querySelector("#time-left");
const buttonNodelist = document.querySelectorAll(".option-button");
const instructionNodelist = document.querySelectorAll(".instructions");


const wordList = [
  "stifle",
  "knee",
  "tarsus",
  "tarsi",
  // "carpus",
  // "carpi", 
  // "cytology",
  // "leukocytes",
  // "leukocytosis",
  // "thrombocyte",
  // "thrombocytosis",
  // "thrombocytopenia",
  // "pancytopenia",
  // "erythrocyte",
  // "platelet",
  // "neutrophil",
  // "eosinophils",
  // "eosinopenia",
  // "macrocytosis",
  // "aspirate",
  // "hemostasis",
  // "basophil",
  // "macrophage",
  // "lymphocyte"
];

const audioList = [
  {
    audioFile: "assets/audio/carpi.mp3",
    audioWord: "carpi"
  },
  {
    audioFile: "assets/audio/carpus.mp3",
    audioWord: "carpus"
  },
  {
    audioFile: "assets/audio/knee-stifle.mp3",
    audioWord: "stifle"
  },
  {
    audioFile: "assets/audio/stifle.mp3",
    audioWord: "stifle"
  },
  {
    audioFile: "assets/audio/tarsus.mp3",
    audioWord: "tarsus"
  }, 
]

const interpretList = [
  {
    common: "redness",
    medical: "erythema"
  }, 
  {
    common: "swelling (in a body cavity)",
    medical: "effusion"
  }, 
  {
    common: "grinding (in a joint)",
    medical: "crepitus"
  }, 
  {
    common: "swelling (in tissue)",
    medical: "edema"
  }, 
  {
    common: "itchiness",
    medical: "pruritis"
  },
]

window.addEventListener('load', initialize);
function initialize() {
  newWord(wordList);
}

startButton.addEventListener("click", function() {
  // once the game starts, buttons are disabled so students can't choose another play-style and mess up their game 
  for (let button of buttonNodelist) { 
    button.setAttribute("disabled", "");
  }

  // Remove the instructions from the screen when the student starts the game
  for (let instruction of instructionNodelist) {
    instruction.classList.add("invisible");
  }

  isPlaying = true;

  // if the timer option is chosen, the timer will start when the students click the start button
  if (document.querySelector("#toggle-time").hasAttribute("active")) {
    startCountdown(5);
  }

  //if the practice button is chosen, the students can type for as long as they want. No score is kept, no timer is on the screen, and the student can end the game by closing the window or navigating away 
  if (document.querySelector("#toggle-practice").hasAttribute("active")) {
    startTyping();
  }

  if (document.querySelector("#toggle-audio").hasAttribute("active")) {
    hearWordAndType();
  }

}); 

function hearWordAndType() {
  userInput.removeAttribute("disabled");
  document.querySelector("#play-audio").play();
userInput.addEventListener("input", () => {
  if (userInput.value === currentWord.innerHTML) {
    userInput.value = "";
    newAudioWord(audioList);
    document.querySelector("#play-audio").play();
    console.log("correct");
  } else {
    console.log("not correct");
    return false;
  }
})
}

function newAudioWord(audioArray) {
  let randomNumber = Math.floor(Math.random() * audioArray.length)
  document.querySelector("#play-audio").src = audioArray[randomNumber].audioFile;
  currentWord.innerHTML = audioArray[randomNumber].audioWord;
}




let wordCounter = 0;
function startCountdown(seconds) {
  let counter = seconds;
  startTyping();
  const interval = setInterval(() => {
    timeLeft.innerHTML = counter;
    counter--;
      
    if (counter < 0 ) {
      isPlaying = false;
      clearInterval(interval);
      checkStatus(wordCounter); 
      wordCounter = 0; 
      userInput.setAttribute("disabled", "");
    }
  }, 1000);
}

function startTyping() {
  userInput.removeAttribute("disabled");
userInput.addEventListener("input", () => {
  if (userInput.value === currentWord.innerHTML) {
    userInput.value = "";
    newWord(wordList);
    wordCounter++; 
  } else {
    return false;
  }
})
};

// Add or remove the timer display when user clicks on the "timed" button
const isTime = document.querySelectorAll(".display-time");
document.querySelector("#toggle-time").addEventListener("click", function() {
  document.querySelector("#toggle-time").setAttribute("active", "");
  for (let item of isTime) {
  if (item.classList.contains("invisible")) {
    item.classList.remove("invisible");
    for (let button of buttonNodelist) {
      if (button.id != "toggle-time") {
      button.setAttribute("disabled", "");
      }
    } 
}else {
  document.querySelector("#toggle-time").removeAttribute("active");
  item.classList.add("invisible");
  for (let button of buttonNodelist) {
    button.removeAttribute("disabled");
  } 
    }
  }
})

document.querySelector("#toggle-practice").addEventListener("click", function() {
  document.querySelector("#toggle-practice").setAttribute("active", "");
  if (document.querySelector(".display-practice").classList.contains("invisible")) {
    document.querySelector(".display-practice").classList.remove("invisible");
    for (let button of buttonNodelist) {
      if (button.id != "toggle-practice") {
      button.setAttribute("disabled", "");
      }
    } 
}else {
  document.querySelector("#toggle-practice").removeAttribute("active");
  document.querySelector(".display-practice").classList.add("invisible");
  for (let button of buttonNodelist) {
    button.removeAttribute("disabled");
  } 
  }
})

// When the "audio" button is clicked, the word is removed from the screen and is replaced by the audio controls. When the student clicks "start", they will hear the first word. They will have the option of replaying the audio via the controls. The audio is dynamically populated through the array of objects. The object contains the audio file and the correct spelling of the spoken word. 
document.querySelector("#toggle-audio").addEventListener("click", function() {
  document.querySelector("#toggle-audio").setAttribute("active", "");
  if (document.querySelector(".display-audio").classList.contains("invisible")) {
    currentWord.classList.add("invisible");
    newAudioWord(audioList);
    document.querySelector("#play-audio").classList.remove("invisible");
    document.querySelector(".display-audio").classList.remove("invisible");
    for (let button of buttonNodelist) {
      if (button.id != "toggle-audio") {
      button.setAttribute("disabled", "");
      }
    } 
}else {
  document.querySelector("#toggle-audio").removeAttribute("active");
  document.querySelector(".display-audio").classList.add("invisible");
  document.querySelector("#play-audio").classList.add("invisible");
  currentWord.classList.remove("invisible");
  for (let button of buttonNodelist) {
    button.removeAttribute("disabled");
  } 
  }
})




const isTest = document.querySelector(".display-score");
document.querySelector("#toggle-test").addEventListener("click", function() {
  isTest.classList.contains("invisible") ? isTest.classList.remove("invisible") : isTest.classList.add("invisible");
})

function newWord(wordArray) {
  let randomNumber = Math.floor(Math.random() * wordArray.length)
  currentWord.innerHTML = wordArray[randomNumber];
}


function checkStatus(wordCount) {
  if (!isPlaying || time === 0 ) {
    message.innerHTML = `<h2>Great Job! You got ${wordCount} words correct!</h2>`;

  }
}

console.log(isPlaying);