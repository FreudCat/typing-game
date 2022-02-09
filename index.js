let score = 0;
let isPlaying;
const currentWord = document.querySelector("#current-word");
const showScore = document.querySelector("#score");
const startButton = document.querySelector("#start-button");
const userInput = document.querySelector("#typed-input");
const message = document.querySelector("#message");
const displayTime = document.querySelector(".display-time");
const timeLeft = document.querySelector("#time-left");
const buttonNodelist = document.querySelectorAll(".option-button");
const instructionNodelist = document.querySelectorAll(".instructions");

// This is a shortened wordlist. It would be great to have a separate wordlist for each module. The students can't get to the module's wordlist until the module is opened in Canvas. Once the module is open, they can toggle to add it to a combined wordlist to practice all of the currently open module wordlists. 
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

// This modlist contains a list of medical terminology that is spoken as well as the correct spelling of the term. This modlist is considered "level 2". The students will first need to take a text-only typing test for the current module, and if they pass the text-only typing test, the audiolist typing module will be open to them and they can practice as much as they want until they are ready to take the "audio-only" typing test. This will also have a separate audiolist for each module. There will be at least three different individuals providing audio. 
const audioList = [
	{
		audioFile: "assets/audio/carpi.mp3",
		audioWord: "carpi",
	},
	{
		audioFile: "assets/audio/carpus.mp3",
		audioWord: "carpus",
	},
	{
		audioFile: "assets/audio/knee-stifle.mp3",
		audioWord: "stifle",
	},
	{
		audioFile: "assets/audio/stifle.mp3",
		audioWord: "stifle",
	},
	{
		audioFile: "assets/audio/tarsus.mp3",
		audioWord: "tarsus",
	},
];

// This modlist contains a list of "common" medical terms as well as the correct spelling of the "medical" terminology. This is "level 3" after they complete the tests for the text-only and audio-only. I will most likely make this audio-only instead of text-only. 
const interpretList = [
	{
		common: "redness",
		medical: "erythema",
	},
	{
		common: "excess fluid (in a body cavity)",
		medical: "effusion",
	},
	{
		common: "grinding (in a joint)",
		medical: "crepitus",
	},
	{
		common: "excess fluid (in tissue)",
		medical: "edema",
	},
	{
		common: "itchiness",
		medical: "pruritis",
	},
];

window.addEventListener("load", initialize);
function initialize() {
	newWord(wordList);
}

startButton.addEventListener("click", function () {
	// One the game starts, the option buttons are disabled so students can't choose another play-style and mess up their game
	for (let button of buttonNodelist) {
		button.setAttribute("disabled", "");
	}

	// Remove the instructions from the screen when the student starts the game
	for (let instruction of instructionNodelist) {
		instruction.classList.add("invisible");
	}

	isPlaying = true;

	// if the timer option is chosen, the timer will start when the students click the start button. They will have 60 seconds total, but I just have 5 seconds here just for testing purposes. 
	if (document.querySelector("#toggle-time").hasAttribute("active")) {
		startCountdown(5);
	}

	//if the practice button is chosen, the students can type for as long as they want. No score is kept, no timer is on the screen, and the student can end the game by closing the window or navigating away
	if (document.querySelector("#toggle-practice").hasAttribute("active")) {
		startTyping();
	}

  //This start the audio game. 
	if (document.querySelector("#toggle-audio").hasAttribute("active")) {
		hearWordAndType();
	}

	if (document.querySelector("#toggle-interpret").hasAttribute("active")) {
		interpretWord();
	}

	if (document.querySelector("#toggle-test").hasAttribute("active")) {
		startTest(4);
	}
});

//These randomly generate new words or audio based on the word/audio array depending on what the student toggles
function newCommonWord(interpretArray) {
	let randomNumber = Math.floor(Math.random() * interpretArray.length);
  document.querySelector("#common-word").innerHTML = interpretArray[randomNumber].common;
	currentWord.innerHTML = interpretArray[randomNumber].medical;
}

function newAudioWord(audioArray) {
	let randomNumber = Math.floor(Math.random() * audioArray.length);
	document.querySelector("#play-audio").src =
		audioArray[randomNumber].audioFile;
	currentWord.innerHTML = audioArray[randomNumber].audioWord;
}

function newWord(wordArray) {
	let randomNumber = Math.floor(Math.random() * wordArray.length);
	currentWord.innerHTML = wordArray[randomNumber];
}


// Each module will have its own test where 25 random words will be chosen from the word or audio array. The students have 120 seconds for the test. I think this is more than enough to get all 25 text and audio words. The students have to pass the word test with a 90% and then they have to pass the audio array with 90%. Passing both is considered a requirement to open the next module. 
function startTest(totalWords) {
	let wordsLeft = totalWords;
  userInput.removeAttribute("disabled");
	userInput.addEventListener("input", () => {
		if (userInput.value === currentWord.innerHTML) {
			userInput.value = "";
      score = score + 4; // When there are 25 words, each word will be 4 points each
      wordsLeft--;
			newWord(wordList);
      document.querySelector("#words-left").innerHTML = wordsLeft;
      document.querySelector("#score").innerHTML = score;
		} else {
      return false;
		}
    if (wordsLeft <= 0) {
      isPlaying = false;
      checkStatusTest(score);
      userInput.setAttribute("disabled", "");
    }
	});
}

function interpretWord() {
	userInput.removeAttribute("disabled");
	userInput.addEventListener("input", () => {
		if (userInput.value === currentWord.innerHTML) {
			userInput.value = "";
			newCommonWord(interpretList);
			console.log("correct");
		} else {
			console.log("not correct");
			return false;
		}
	});
}

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
	});
}

let wordCounter = 0 
function startCountdown(seconds) {
	let counter = seconds;
	startTyping();
	const interval = setInterval(() => {
		timeLeft.innerHTML = counter;
		counter--;

		if (counter < 0) {
			isPlaying = false;
			clearInterval(interval);
			checkStatus(wordCounter);
			userInput.setAttribute("disabled", "");
		}
	}, 1000);
}

function startTyping() {
	userInput.removeAttribute("disabled");
	userInput.addEventListener("input", () => {
		if (userInput.value === currentWord.innerHTML) {
			userInput.value = "";
      wordCounter++;
			newWord(wordList);
		} else {
			return false;
		}
	});
}

// Add or remove the timer display when user clicks on the "timed" button. When a play-style is clicked, it will disable all of the other buttons until it is toggle again. 
const isTime = document.querySelectorAll(".display-time");
document.querySelector("#toggle-time").addEventListener("click", function () {
	document.querySelector("#toggle-time").setAttribute("active", "");
	for (let item of isTime) {
		if (item.classList.contains("invisible")) {
			item.classList.remove("invisible");
			for (let button of buttonNodelist) {
				if (button.id != "toggle-time") {
					button.setAttribute("disabled", "");
				}
			}
		} else {
			document.querySelector("#toggle-time").removeAttribute("active");
			item.classList.add("invisible");
			for (let button of buttonNodelist) {
				button.removeAttribute("disabled");
			}
		}
	}
});


document.querySelector("#toggle-practice").addEventListener("click", function () {
		document.querySelector("#toggle-practice").setAttribute("active", "");
		if (
			document.querySelector(".display-practice").classList.contains("invisible")
		) {
			document.querySelector(".display-practice").classList.remove("invisible");
			for (let button of buttonNodelist) {
				if (button.id != "toggle-practice") {
					button.setAttribute("disabled", "");
				}
			}
		} else {
			document.querySelector("#toggle-practice").removeAttribute("active");
			document.querySelector(".display-practice").classList.add("invisible");
			for (let button of buttonNodelist) {
				button.removeAttribute("disabled");
			}
		}
	});

// When the "audio" button is clicked, the word is removed from the screen and is replaced by the audio controls. When the student clicks "start", they will hear the first word. They will have the option of replaying the audio via the controls. The audio is dynamically populated through the array of objects. The object contains the audio file and the correct spelling of the spoken word.
document.querySelector("#toggle-audio").addEventListener("click", function () {
	document.querySelector("#toggle-audio").setAttribute("active", "");
	if (
		document.querySelector(".display-audio").classList.contains("invisible")
	) {
		currentWord.classList.add("invisible");
		newAudioWord(audioList);
		document.querySelector("#play-audio").classList.remove("invisible");
    document.querySelector("#show-word").classList.remove("invisible");
		document.querySelector(".display-audio").classList.remove("invisible");
		for (let button of buttonNodelist) {
			if (button.id != "toggle-audio") {
				button.setAttribute("disabled", "");
			}
		}
	} else {
		document.querySelector("#toggle-audio").removeAttribute("active");
    document.querySelector("#show-word").classList.add("invisible");
		document.querySelector(".display-audio").classList.add("invisible");
		document.querySelector("#play-audio").classList.add("invisible");
		currentWord.classList.remove("invisible");
		for (let button of buttonNodelist) {
			button.removeAttribute("disabled");
		}
	}
});

// When the "interpret" button is clicked, the interpretList array of objects is called. The students will see a certain word and will need to type in the correct medical terminology. The displayed word and the correct word is taken from the interpretList array.
document.querySelector("#toggle-interpret").addEventListener("click", function () {
		document.querySelector("#toggle-interpret").setAttribute("active", "");
		if (
			document.querySelector(".display-interpret").classList.contains("invisible")
		) {
			document.querySelector(".display-interpret").classList.remove("invisible");
      document.querySelector("#common-word").classList.remove("invisible");
      newCommonWord(interpretList);
      currentWord.classList.add("invisible");
      document.querySelector("#show-word").classList.remove("invisible");
			for (let button of buttonNodelist) {
				if (button.id != "toggle-interpret") {
					button.setAttribute("disabled", "");
				}
			}
		} else {
			document.querySelector("#toggle-interpret").removeAttribute("active");
			document.querySelector(".display-interpret").classList.add("invisible");
      document.queryselector("#common-word").classList.add("invisible");
      currentWord.classList.remove("invisible");
      document.querySelector("#show-word").classList.add("invisible");
			currentWord.classList.remove("invisible");
			for (let button of buttonNodelist) {
				button.removeAttribute("disabled");
			}
		}
	});

const isTest = document.querySelectorAll(".display-score");
document.querySelector("#toggle-test").addEventListener("click", function () {
	document.querySelector("#toggle-test").setAttribute("active", "");
	for (let testItem of isTest) {
		if (testItem.classList.contains("invisible")) {
			testItem.classList.remove("invisible");
			for (let button of buttonNodelist) {
				if (button.id != "toggle-test") {
					button.setAttribute("disabled", "");
				}
			}
		} else {
			document.querySelector("#toggle-test").removeAttribute("active");
			testItem.classList.add("invisible");
			for (let button of buttonNodelist) {
				button.removeAttribute("disabled");
			}
		}
	}
});

document.querySelector("#show-word").addEventListener("click", function() {
  currentWord.classList.contains("invisible") ? currentWord.classList.remove("invisible") : currentWord.classList.add("invisible");
})

function checkStatus(wordCount) {
	if (!isPlaying || time === 0) {
		message.innerHTML = `<h2>Great Job! You got ${wordCount} words correct!</h2>`;
	}
}

function checkStatusTest(finalScore) {
		message.innerHTML = `<h2>Great Job! Your final score is ${finalScore}%</h2>`;
  }
