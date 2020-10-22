const menu = document.getElementById("menu");
const start = document.getElementById("start");
const gameScreen = document.getElementById("game-screen");
const questionSec = document.getElementById("question");
const answerSec = document.getElementById("answer-section");
let questions;

///////GETS question data from questions.json
$.ajax({
  type: "Get",
  url: "questions.json",
  dataType: "json",
  success: function (data) {
    questions = data;
  },
}).then(() => {
  start.addEventListener("click", () => runGame());

  let questionCount = 1;

  let score = 0;

  function runGame() {
    menu.innerHTML = "";
    questionSec.innerHTML = "";
    answerSec.innerHTML = "";
    questionMaker(questionCount);
    questionCount++;
  }
  ////////////////Sets up question board
  function questionMaker(questionCount) {
    if (questions[0]) {
      const question = questions[0];
      const answers = question.answers;
      const correctAnswer = question.correctAnswer;

      questionSec.innerHTML = `
            <h3>Question ${questionCount}<h3>
                <p>${question.question}<p>
        `;

      const allAnswers = answers.map((answer) => {
        return `<button class="answerbtn" value="${answer}" >${answer}</button>`;
      });

      answerSec.innerHTML = allAnswers;

      $(".answerbtn").click(function () {
        questionSec.innerHTML = "";
        answerSec.innerHTML = "";

        const selectedAnswer = $(this).val();

        console.log(selectedAnswer + " " + correctAnswer);

        if (selectedAnswer === correctAnswer) {
          questionSec.innerHTML = `
                    <h3 class="correct">Correct!</h3>
                    <p class="correct">${question.explanation}</p>
                    <img src="${question.gif}" alt="GQuestion-${questionCount}">
                `;

          questions.shift();
          score++;

          answerSec.innerHTML = `
                    <input type="button" class="next" id="next"
                    data-correct=true value="Next"/>
                `;
        } else {
          questions.shift();

          questionSec.innerHTML = `
                    <h3>Wrong!</h3>
                    <p>${question.explanation}</p>
                    <img src="${question.gif}" alt="GQuestion-${questionCount}">
                `;

          answerSec.innerHTML = `
                    <input type="button" class="next" id=next value="Next"/>
                `;
        }

        $("#next").click(function () {
          questionCount++;
          questionMaker(questionCount);
        });
      });
    } else {
      finalScreen(score);
    }
  }

  ///////////FINAL SCORE Screen

  function finalScreen(score) {
    questionSec.innerHTML = `
      <h1 class="correct">COMPLETE</h1>
      <img src="https://media.giphy.com/media/b2rLe6TwuIkyQ/giphy.gif" alt="final-screen">
    `;

    answerSec.innerHTML = `
      <h3 class="correct">Final Score:</h3>
      <br>
      <h3 class="correct">${score} / 12 Correct</h3>
      <h4 class="correct">Hit refresh for another go!</h4>
    `;
  }
});
