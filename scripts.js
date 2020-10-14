const menu = document.getElementById('menu');
const start = document.getElementById('start');
const gameScreen = document.getElementById('game-screen');
const questionSec = document.getElementById('question');
const answerSec = document.getElementById('answer-section');
const answerBtn = document.getElementById('answerbtn');
$.ajax({
    type: "Get",
    url: "questions.json",
    dataType: "json",
    success: function(data) {

        const questions = data;

        ///////////////////////Starts Game
        function runGame() {
            menu.innerHTML = "";
            let questionCount = 1;
            if(questions[0]) {
                questionMaker(questionCount);
            } else {
                finalScreen();
            }
        }

        ////////////////////////////////////////Sets up question board
        function questionMaker(questionCount) { 
            const question = questions[0];  
            const answers = question.answers;
            const correctAnswer = question.correctAnswer;
        
            console.log(questions);
        
            questionSec.innerHTML = `
                <h3>Question ${questionCount}<h3>
                    <p>${question.question}<p>
            `
        
            const allAnswers = answers.map(answer => {
                return `<button onclick="checkAnswer(${answer}, ${correctAnswer})">${answer}</button>`
            });
        
            answerSec.innerHTML = allAnswers;
        
        }

        /////////////////////////////////////////////Start Button
        start.addEventListener('click', () => runGame());
    },
    error: () => alert("didnt work")
})

/////////////////////////////////////////////Check if Answer is Correct
function checkAnswer(selectedAns, correctAns) {
    if(selectedAns === correctAns) {
        console.log("correct");
    } else {
        console.log("incorrect");
    }
}

