var questions = [{
    question: "What is the basic difference between JavaScript and Java?",
    options: ["Functions are considered as fields", "Functions are values, and there is no hard distinction between methods and fields", "Variables are specific", "There is no difference"],
    answer: 1
},
{
    question: "Which of the following can be used to call a JavaScript Code Snippet?",
    options: ["Function/Method", "Preprocessor", "Triggering Event", "RMI"],
    answer: 0
},
{
    question: "Which of the following object is the main entry point to all client-side JavaScript features and APIs?",
    options: ["Position", "Window", "Location", "Standard"],
    answer: 1
},
{
    question: "Which of the following is not javascript data types?",
    options: ["Null", "Undefined", "Number", "All of the mentioned"],
    answer: 3
},
]

var correctEl = $('<p>Correct! :)</p>');
var incorrectEl = $('<p>Incorrect! :(</p>');
var finishedEl = $('<h3>Quiz Finished</h3>')
var secondsEl = $("#seconds");
var seconds = 75;
var counter = 0;
var newQuestion = questions[counter];

function answerQ() {
    var quizQuestions = $("<div>").attr("id", "quiz-qu");
    $("<h2>").text(newQuestion.question).appendTo(quizQuestions);
    var optionsList = $("<ul>").appendTo(quizQuestions);

    for (var i = 0; i < newQuestion.options.length; i++) {
        var optionButton = $("<button>")
            .addClass("button")
            .attr("id", "answer-" + i)
            .attr("onclick", "checkAnswer(" + i + ")")
            .text(newQuestion.options[i]);
        $("<li>").append(optionButton).appendTo(optionsList);
    }

    $("#question-div").append(quizQuestions);
}


function startButtonEvent() {
    $("#start-button").on("click", handleStartButtonClick);
}


function handleStartButtonClick() {
    $("#start-button-div").hide();
    setTime();
    answerQ();
}


function nextQ() {
    removeQuizQuestions();
    newQuestion = questions[counter];
    answerQ(newQuestion);
}

function finishedQuiz() {
    removeQuizQuestions();
    $("#question-div").append(finishedEl);
}

function checkIfFinished() {
    if (counter === questions.length) {
        finishedQuiz();
    }
}

function removeQuizQuestions() {
    $("#quiz-qu").remove();
}


function checkAnswer(i) {
    if (i === newQuestion.answer) {
        ifCorrectAnswer();
    } else {
        ifIncorrectAnswer();
    }
}

function ifCorrectAnswer() {
    if (seconds > 0 || counter === questions.length) {
        counter++;
        checkIfFinished();
        nextQ();
    } else if (seconds === 0) {
        finishedQuiz();
    }
}

function ifIncorrectAnswer() {
    if (seconds > 0 || counter === questions.length) {
        seconds -= 15;
        counter++;
        checkIfFinished();
        nextQ();
    } else if (seconds === 0) {
        finishedQuiz();
    }
}

function nextQ() {
    $("#quiz-qu").remove();
    newQuestion = questions[counter];
    answerQ();
}

function setTime() {
    timerInterval = setInterval(updateTimer, 1000);
}


function updateTimer() {
    seconds--;
    secondsEl.text(seconds);
    if (seconds === 0) {
        clearInterval(timerInterval);
        finishedQuiz();
    }
}

function finishedQuiz() {
    clearInterval(timerInterval);
    console.log($('#seconds').text());
    $("#quiz-qu").remove();
    $("#question-div").append(finishedEl);
}

function checkIfFinished() {
    if (counter === questions.length) {
        finishedQuiz();
    }
}

startButtonEvent();