const menu = document.getElementById('menu');
const start = document.getElementById('start');
const gameScreen = document.getElementById('game-screen');
const questionSec = document.getElementById('question');
const answerSec = document.getElementById('answer-section');
let questions

$.ajax({
    type: "Get",
    url: "questions.json",
    dataType: "json",
    success: function(data) {

        questions = data;
        
    }
    
}).then(()=> {
    start.addEventListener('click', () => runGame())

    function runGame() {
        menu.innerHTML = "";
        let questionCount = 1;
        if(questions[0]) {
            questionMaker(questionCount);
        } else {
            finalScreen();
        }
    }

    //////////////////////////////////////Sets up question board
    function questionMaker(questionCount) { 
    const question = questions[0];  
    const answers = question.answers;
    const correctAnswer = question.correctAnswer;

    questionSec.innerHTML = `
        <h3>Question ${questionCount}<h3>
            <p>${question.question}<p>
    `

    const allAnswers = answers.map(answer => {
        return `<button value=${answer} >${answer}</button>`
    });

    answerSec.innerHTML = allAnswers;

    ////////////////BRANDON, THE this SELECTOR WORKS, CONITNUE CODING FROM HERE!!!/////////////////////////
    $('button').click(function () {
        console.log($(this).val())
    })

    }

    
})



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