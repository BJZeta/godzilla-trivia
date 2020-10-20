const menu = document.getElementById("menu");
const start = document.getElementById("start");
const gameScreen = document.getElementById("game-screen");
const questionSec = document.getElementById("question");
const answerSec = document.getElementById("answer-section");
let questions;

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
  //////////////////////////////////////Sets up question board
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
                `;

          questions.shift();
          score++;

          answerSec.innerHTML = `
                    <input type="button" class="next" id="next"
                    data-correct=true value="Next"/>
                `;
        } else {
          questions.shift();
          score--;

          questionSec.innerHTML = `
                    <h3>Wrong!</h3>
                    <p>${question.explanation}</p>
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
      console.log("done");
    }
  }
});

// function runGame() {
//     menu.innerHTML = "";
//     let questionCount = 1;
//     if(questions[0]) {
//         questionMaker(questionCount);
//     } else {
//         finalScreen();
//     }
// }

// //////////////////////////////////////Sets up question board
// function questionMaker(questionCount) {
//     const question = questions[0];
//     const answers = question.answers;
//     const correctAnswer = question.correctAnswer;

//     questionSec.innerHTML = `
//         <h3>Question ${questionCount}<h3>
//             <p>${question.question}<p>
//     `

//     const allAnswers = answers.map(answer => {
//         return `<button onclick="checkAnswer(${answer}, ${correctAnswer})">${answer}</button>`
//     });

//     answerSec.innerHTML = allAnswers;

// }

// /////////////////////////////////////////////Start Button
// start.addEventListener('click', () => runGame());
