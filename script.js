// script.js

const scrambledWord = document.querySelector(".scrambled-word");
const guessInput = document.querySelector(".guess-input");
const checkBtn = document.querySelector(".check-btn");
const refreshBtn = document.querySelector(".refresh-btn");
const hintText = document.querySelector(".hint-text");
const message = document.querySelector(".message");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const difficultySelect = document.getElementById("difficulty-select");

// Sound Effects
const correctSound = document.getElementById("correct-sound");
const wrongSound = document.getElementById("wrong-sound");
const timeupSound = document.getElementById("timeup-sound");
const scrambleSound = document.getElementById("scramble-sound");

let words = [
  { word: "javascript", hint: "Programming language for the web" },
  { word: "python", hint: "Snake and a popular programming language" },
  { word: "keyboard", hint: "Used to type" },
  { word: "internet", hint: "Global network" },
  { word: "monitor", hint: "Display device" },
  { word: "google", hint: "Famous search engine" },
  { word: "github", hint: "Code hosting platform" },
  { word: "coding", hint: "Writing instructions for a machine" },
  { word: "server", hint: "Hosts and serves content" },
  { word: "cache", hint: "Temporary memory storage" },
  { word: "function", hint: "Block of reusable code" },
  { word: "variable", hint: "Holds a value" },
  { word: "loop", hint: "Repeats code" },
  { word: "array", hint: "Collection of items" },
  { word: "addition", hint: "The process of adding numbers" },
  { word: "meeting", hint: "Event in which people come together" },
  { word: "number", hint: "Math symbol used for counting" },
  { word: "exchange", hint: "The act of trading" },
  { word: "canvas", hint: "Piece of fabric for oil painting" },
  { word: "garden", hint: "Space for planting flower and plant" },
  { word: "position", hint: "Location of someone or something" },
  { word: "feather", hint: "Hair like outer covering of bird" },
  { word: "comfort", hint: "A pleasant feeling of relaxation" },
  { word: "tongue", hint: "The muscular organ of mouth" },
  { word: "expansion", hint: "The process of increase or grow" },
  { word: "country", hint: "A politically identified region" },
  { word: "group", hint: "A number of objects or persons" },
  { word: "taste", hint: "Ability of tongue to detect flavour" },
  { word: "store", hint: "Large shop where goods are traded" },
  { word: "field", hint: "Area of land for farming activities" },
  { word: "friend", hint: "Person other than a family member" },
  { word: "pocket", hint: "A bag for carrying small items" },
  { word: "needle", hint: "A thin and sharp metal pin" },
  { word: "expert", hint: "Person with extensive knowledge" },
  { word: "statement", hint: "A declaration of something" },
  { word: "second", hint: "One-sixtieth of a minute" },
  { word: "library", hint: "Place containing collection of books" },
  { word: "keyboard", hint: "Device used to input text into a computer" },
  { word: "volcano", hint: "Mountain that erupts with lava" },
  { word: "gravity", hint: "Force that pulls objects toward the Earth" },
  { word: "pyramid", hint: "Triangular ancient Egyptian structure" },
  { word: "battery", hint: "Device that stores electrical energy" },
  { word: "weather", hint: "The state of atmosphere at a place and time" },
  { word: "internet", hint: "Global system of interconnected computer networks" },
  { word: "festival", hint: "Occasion of celebration or cultural event" },
  { word: "plastic", hint: "Synthetic material used in packaging" },
  { word: "muscle", hint: "Tissue that produces movement in the body" },
  { word: "diamond", hint: "Hardest naturally occurring substance" },
  { word: "rocket", hint: "Vehicle used to travel into space" },
  { word: "island", hint: "Land surrounded by water" },
  { word: "mirror", hint: "Reflective surface showing an image" },
  { word: "engineer", hint: "A person who designs or builds machines or systems" },
  { word: "station", hint: "Place where trains stop" },
  { word: "window", hint: "An opening in a wall to let in air and light" },
  { word: "umbrella", hint: "Used for protection against rain" },
  { word: "pencil", hint: "A tool used for writing or drawing" },
  { word: "planet", hint: "A celestial body orbiting a star" }
];

let currentWord = "";
let currentScrambled = "";
let score = 0;
let timeLeft = 30;
let timer;
let gameActive = true;

// Utility function to shuffle letters
function shuffleWord(word) {
  return word.split("").sort(() => Math.random() - 0.5).join("");
}

// Start a new round
function startGame() {
  scrambleSound.play();

  gameActive = true;
  guessInput.value = "";
  message.textContent = "";
  message.style.color = "#fff";

  // Select random word
  const randomObj = words[Math.floor(Math.random() * words.length)];
  currentWord = randomObj.word;
  currentScrambled = shuffleWord(currentWord);

  scrambledWord.textContent = currentScrambled;
  hintText.textContent = randomObj.hint;

  // Set timer
  resetTimer();
}

// Timer logic
function resetTimer() {
  clearInterval(timer);

  const difficulty = difficultySelect.value;
  timeLeft = difficulty === "easy" ? 30 : difficulty === "medium" ? 20 : 15;

  timerDisplay.textContent = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      endGame(false); // Time's up
    }
  }, 1000);
}

// Check the answer
checkBtn.addEventListener("click", () => {
  if (!gameActive) return;

  const userGuess = guessInput.value.trim().toLowerCase();
  if (userGuess === currentWord) {
    correctSound.play();
    message.textContent = "✅ Correct!";
    message.style.color = "lime";
    score++;
    scoreDisplay.textContent = score;
    setTimeout(startGame, 1000);
  } else {
    wrongSound.play();
    message.textContent = "❌ Wrong! Try again.";
    message.style.color = "orange";
  }
});

// If time runs out or user skips
function endGame(isManual = true) {
  if (!gameActive) return;
  gameActive = false;

  if (!isManual) {
    timeupSound.play();
    message.textContent = `⏰ Time's up! The word was "${currentWord}".`;
    message.style.color = "red";
  }

  setTimeout(startGame, 3000);
}

// Skip word / Refresh button
refreshBtn.addEventListener("click", () => {
  endGame(true);
});

// Start the game on load
window.addEventListener("load", startGame);
