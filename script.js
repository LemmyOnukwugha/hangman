// CONSTANTS & CACHED ELEMENT REFERENCES
const containerEl = document.getElementsByClassName("conatiner");
const headingEl = document.getElementsByClassName("heading");
const hangingEl = document.getElementsByClassName("hangman");
const instructionsEl = document.getElementsByClassName("instructions");
const questionsEl = document.getElementsByClassName("question01");
const buttonsEl = document.getElementsByClassName("buttons");
const keysEl = document.getElementsByClassName("keys");
const groupEl = document.querySelector(".group");
const KeysBtns = document.querySelectorAll(".key_button");
const stageEl = document.querySelector("#current_stage");
const triesEl = document.querySelector("#tries");
const svgHead = document.querySelector("#head");
const svgBody = document.querySelector("#body-svg");
const svgLeftHand = document.querySelector("#armL");
const svgRightHand = document.querySelector("#armR");
const svgLeftLeg = document.querySelector("#legL");
const svgRightLeg = document.querySelector("#legR");
const playBtn = document.querySelector("#play");
const resetBtn = document.querySelector("#restart");

// APP'S STATE (VARIABLES)
let stage = 0;
let currentQuestion = null;
let remainingQuestions = quiz;
let answeredQuestions = [];
const bodyParts = ["head", "body", "hands", "legs"];
let tries = bodyParts.length;
let currentIndexBodyPart = 0;
let partsShown = [];
let answerArray = [];

//EVENT LISTENERS
playBtn.addEventListener("click", startGame);
resetBtn.addEventListener("click", reset);
KeysBtns.forEach((key, i) => {
  key.addEventListener("click", handleSelectLetter);
});

//QUIZ ARRAY
const quiz = [
  {
    id: 1,
    question: 'Which popular Christmas beverage is also called "milk punch"?',
    answer: "EGGNOG",
  },
  {
    id: 2,
    question: "Where was baby Jesus born?",
    answer: "BETHLEHEM",
  },
  {
    id: 3,
    question: "What do people traditionally put on top a christmas tree?",
    answer: "STAR",
  },
  {
    id: 4,
    question: 'What word follow "Silent Night" in the song?',
    answer: "HOLY",
  },
  {
    id: 5,
    question:
      "What are you supposed to do when you find yourself under the mistletoe",
    answer: "KISS",
  },
];

//FUNCTIONS
//function to show a question

function selectQuestion() {
  if (currentQuestion) {
    const selectedQue = remainingQuestions.find((que, index) => {
      return que.id === currentQuestion.id;
    });
    console.log("selected question", selectedQue);
    if (!!selectQuestion) {
      remainingQuestions = remainingQuestions.filter((item, index) => {
        return item.id !== selectedQue.id;
      });
    }
  }
  console.log("the remaining quetions", remainingQuestions);
  const randomNum = getRandomNum();
  console.log("random Number", randomNum);
  const question = remainingQuestions.find((item, index) => {
    return index === randomNum;
  });
  console.log("question from find", question);
  return question;
}

function reset() {
  stage = 0;
  currentQuestion = null;
  answeredQuestions = [];
  currentIndexBodyPart = 0;
  partsShown = [];
  showBtn(playBtn);
  hideBtn(resetBtn);
  stageEl.textContent = "";
  triesEl.textContent = "";
  groupEl.innerHTML = "";
  questionsEl.textContent = "";
  partsShown = [];
  svgHead.setAttribute("class", "hidden");
  svgBody.setAttribute("class", "hidden");
  svgRightHand.setAttribute("class", "hidden");
  svgLeftHand.setAttribute("class", "hidden");
  svgRightLeg.setAttribute("class", "hidden");
  svgLeftLeg.setAttribute("class", "hidden");
}

function getRandonNum() {
  return Math.floor(Math.random() * remainingQuestions.length);
}

//display functions
function displayQuestion(text) {
  questionsEl.textContent = text;
}
