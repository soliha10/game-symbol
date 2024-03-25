// GLOBAL VARIABLES

// TIME AND SCORE
const elResScore = document.querySelector(".js-res-score");
const elTime = document.querySelector(".js-time");

const elTestQuestion = document.querySelector(".js-test-question");
const elTestList = document.querySelector(".js-test-list");

// TEMPLATE
const elTestTemplate = document.querySelector(".js-test-template").content;

const elTestPage = document.querySelector(".test-page");
// SECOND PAGE
const elSecondPage = document.querySelector(".second-page");
const elForm = document.querySelector(".js-form");
const elSelectLavel = document.querySelector(".js-level");

// SCORE 
const elTrueAnswer = document.querySelector(".js-true-score");
const elFalseAnswer = document.querySelector(".js-false-score");
let correctAnswer = 0;
let wrongChoice = 5;
let imgA = [];
let res = [];

// Function to shuffle an array 
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Submitting form

elForm.addEventListener("submit", evt => {
  evt.preventDefault();

  elSecondPage.classList.add("hidden");
  elTestPage.classList.remove("hidden");

  const levelVal = elSelectLavel.value;
  let testItems = [];

  // Shuffle the roadSymbol array using Math.random()
  roadSymbol.sort(() => Math.random() - 0.5);

  if (levelVal === "easy") {
    testItems = roadSymbol.slice(0, 18);
  } else if (levelVal === "medium") {
    testItems = roadSymbol.slice(0, 42);
  } else if (levelVal === "hard") {
    testItems = roadSymbol.slice(0, 60);
  }

  renderTest(testItems, elTestList);

  console.log("done");
});

let trueAnswers = 0;
let falseAnswers = 0;

// Checking chosen answers, calculating count of true and false options

elTestList.addEventListener("click", function (event) {
  const clickedItem = event.target.closest(".js-test-item");
  if (!clickedItem) return;

  const clickedImg = clickedItem.querySelector(".js-test-img");
  const imgAlt = clickedImg.alt;

  if (imgAlt === elTestQuestion.textContent) {
    trueAnswers++;
    clickedImg.style.display = "none";
    const newIndex = imgA.indexOf(imgAlt) + 1;
    if (newIndex < imgA.length) {
      elTestQuestion.textContent = res[newIndex];
      correctAnswer += 2;
      elResScore.textContent = correctAnswer;
    } else {
      // All questions answered
      elTestList.classList.add("hidden");
      elTestQuestion.textContent = "Game Over ";
      elTrueAnswer.textContent = "True answers count: " + trueAnswers;
      elFalseAnswer.textContent = "False answers count: " + falseAnswers;
    }
  } else {
    clickedImg.classList.add("bg-red-400");
    if (wrongChoice == 0) {
      elTestList.classList.add("hidden");
      elTestQuestion.textContent = "Game Over ";
      elTrueAnswer.textContent = "True answers count: " + trueAnswers;
      elFalseAnswer.textContent = "False answers count: " + falseAnswers;
    }
    falseAnswers++;
    wrongChoice--;
    correctAnswer--;
    elResScore.textContent = correctAnswer;
  }
});

// Rendering symbol array

function renderTest(arr, node) {
  const testFragment = document.createDocumentFragment();
  arr.forEach(test => {
    const testItemClone = elTestTemplate.cloneNode(true);
    const testImg = testItemClone.querySelector(".js-test-img");
    testImg.src = test.symbol_img;
    testImg.alt = test.symbol_title;

    imgA.push(test.symbol_title);
    res.push(test.symbol_title);
    testFragment.appendChild(testItemClone);
  });
  node.innerHTML = "";
  node.appendChild(testFragment);

  shuffleArray(res)
  elTestQuestion.textContent = res[0];
}
