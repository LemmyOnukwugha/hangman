// CONSTANTS & CACHED ELEMENT REFERENCES
const containerEl = document.getElementsByClassName("conatiner");
const headingEl = document.getElementsByClassName("heading");
const hangingEl = document.getElementsByClassName("hanging");
const instructionsEl = document.getElementsByClassName("instructions");
const questionsEl = document.getElementsByClassName("questions");
const buttonsEl = document.getElementsByClassName("buttons");
const keysEl = document.getElementsByClassName("keys");
// APP'S STATE (VARIABLES)
let words = ["EGGNOG", "BETHLEHEM", "STAR", "HOLY", "KISS"];
let randomWord = words[math.floor(math.random() * words.length)];
let letters;
let wrongGuesses;
let rounds;
let restart;
let answer = [];
for (let i = 0; i < word.length; i++) {
  answer[i] = "_";
}

let remainingLetters = word.length;

//EVENT LISTENERS

//FUNCTIONS
