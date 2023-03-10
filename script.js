const containerEl = document.getElementsByClassName("container");
const headingEl = document.getElementsByClassName("heading");
const hangingEl = document.getElementsByClassName("hangman");
const instructionsEl = document.getElementsByClassName("instructions");
const questionsEl = document.getElementById("question01");
const buttonsEl = document.getElementsByClassName("buttons");
const keysEl = document.getElementsByClassName("keys");
const groupEl = document.querySelector(".group");
const KeyBtns = document.querySelectorAll(".key_button");
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

playBtn.addEventListener("click", startGame);
resetBtn.addEventListener("click", reset);
KeyBtns.forEach((key, i) => {
  key.addEventListener("click", handleSelectLetter);
});

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
      "What are you supposed to do when you find yourself under the mistletoe?",
    answer: "KISS",
  },
];

let stage = 0;
let currentQuestion = null;
let remainingQuestions = quiz;
let answeredQuestions = [];
const bodyParts = ["head", "body", "hands", "legs"];
let tries = bodyParts.length;
let currentIndexBodyPart = 0;
let partsShown = [];
let answerArray = [];

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
  console.log("the remaining questions", remainingQuestions);
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

function getRandomNum() {
  return Math.floor(Math.random() * remainingQuestions.length);
}

function displayQuestion(text) {
  questionsEl.textContent = text;
}

function displayLetter(letter) {
  const divBox = groupEl.querySelectorAll(".unit");
  currentQuestion.answer.split("").forEach((item, index) => {
    const paragraphEl = divBox[index].querySelector(".letter");

    if (letter === item) {
      answerArray.push(item);
      return (paragraphEl.textContent = letter);
    } else {
      return null;
    }
  });

  if (answerArray.length === currentQuestion.answer.length) {
    answerArray = [];

    setTimeout(nextQuetion, 1000);
  }
}

function displayDash() {
  if (currentQuestion !== null) {
    groupEl.innerHTML = "";
    for (let i = 0; i < currentQuestion.answer.length; i++) {
      const unitEl = document.createElement("div");
      const letterEl = document.createElement("p");
      const dashEl = document.createElement("div");
      unitEl.className = "unit";
      letterEl.className = "letter";
      dashEl.className = "dash";
      unitEl.append(letterEl);
      unitEl.append(dashEl);
      groupEl.append(unitEl);
    }
    currentQuestion.answer.length;
  }
}

function handleSelectLetter(event) {
  if (tries === 0) {
    alert("Failed, please try again!");
    reset();
  }
  if (currentQuestion.answer.includes(event.target.textContent)) {
    console.log("Yes, it's contained in answer");
    displayLetter(event.target.textContent);
  } else {
    tries = tries - 1;
    triesEl.textContent = `tries Remaining: ${tries}`;
    console.log("Nope, not in answer");
    hangBodyParts();
  }
}

function hangBodyParts() {
  partsShown.push(bodyParts[currentIndexBodyPart]);
  partsShown.forEach((item) => {
    if (item === "head") {
      svgHead.setAttribute("class", "show");
    } else if (item === "body") {
      svgBody.setAttribute("class", "show");
    } else if (item === "hands") {
      svgRightHand.setAttribute("class", "show");
      svgLeftHand.setAttribute("class", "show");
    } else {
      svgRightLeg.setAttribute("class", "show");
      svgLeftLeg.setAttribute("class", "show");
    }
  });
  console.log(partsShown);
  currentIndexBodyPart++;
}

function nextQuetion() {
  if (stage === 5) {
    alert("Congratulations, you've completed the game.");
    reset();
    return;
  }

  answeredQuestions.push(currentQuestion);
  stage = stage + 1;
  tries = 4;
  triesEl.textContent = `tries Remaining: ${tries}`;
  stageEl.textContent = `Current Stage: ${stage}`;
  const question = selectQuestion();
  showQuestion(question);
  console.log("stage", stage);
}

function showQuestion(question) {
  currentQuestion = question;
  displayQuestion(question.question);
  displayDash();
}

function showBtn(button) {
  button.className = "show";
}

function hideBtn(button) {
  button.className = "hidden";
}

function startGame() {
  reset();
  stage = 1;
  tries = 4;
  stageEl.textContent = `Current Stage: ${stage}`;
  triesEl.textContent = `tries Remaining: ${tries}`;
  const question = selectQuestion();
  showQuestion(question);
  showBtn(resetBtn);
  hideBtn(playBtn);
}
