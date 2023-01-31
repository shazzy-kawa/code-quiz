//score set to zero
var score = 0;
var currentQuestion = 0;
var counter;
var timer;
//variables defined at the start of the javascript file
var startBtn = document.querySelector('#start');
var submitBtn = document.querySelector('#submit');
var startScreenElement = document.querySelector('#start-screen');
var questionsContainer = document.querySelector('#questions');
var questionsTitle = document.querySelector('#question-title');
var choicesContainer = document.querySelector('#choices');
var timerContainer = document.querySelector('#timer');
var endScreenContainer = document.querySelector('#end-screen');
var timerContainerText = document.getElementById('time');
var finalScoreContainer = document.getElementById('final-score');
var initialInput = document.getElementById('initials');
var highscoresContainer = document.getElementById('highscores');
//function to begin populating the page with question and possible answers
function populateQuestion(question) {
    var currentQuestion = question.title;
    var currentChoices = question.choices;

    choicesContainer.innerHTML = '';
    questionsTitle.textContent = currentQuestion;
    var choicesList = document.createElement('ul');       //ul element created for possible answers
    for (let i = 0; i < currentChoices.length; i++) {     //for loop created to add possible answers and and appended to     
        var choice = document.createElement('button');
        choice.textContent = currentChoices[i];
        choicesList.appendChild(choice);
    }
    choicesContainer.appendChild(choicesList)
}
function endGame() {
    questionsContainer.setAttribute('class', 'hide');
    endScreenContainer.setAttribute('class', 'visible');
    finalScoreContainer.textContent = score;
    clearInterval(timer);
}
function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        populateQuestion(questions[currentQuestion]);
    } else {
        endGame();
    }
}
startBtn.addEventListener('click', function() {
    startScreenElement.setAttribute('class', 'hide');
    questionsContainer.setAttribute('class', 'visible');

    currentQuestion = 0;
    populateQuestion(questions[currentQuestion]);

    counter = 60;                                 //timer starting at 60 seconds counting down by 1000ms
    timer = setInterval(function() {
        counter--;
        timerContainerText.textContent = counter;
        if (counter <= 0) {
            endGame();
            clearInterval(counter);
        }
    }, 1000);
});
choicesContainer.addEventListener('click', function(event){            //click to select an answer, if answer if correct add one point if incorrect, timer goes down by 5 seconds
    var selectedAnswer = event.target.textContent;
    if(selectedAnswer === questions[currentQuestion].answer){
        score += 1;
        nextQuestion();
    }else{
        counter -= 5;
        nextQuestion();
    }
})
function saveHighscore(initial) {                                 // scores are stored in local storage 
    var recordScore = [{Initial:initial,Score:score}];
    if(localStorage.getItem('highscores') === null){
        localStorage.setItem('highscores', JSON.stringify(recordScore)); 
    }else{
        var retrieveHighscores = JSON.parse(localStorage.getItem('highscores'));
        retrieveHighscores.push({Initial:initial,Score:score});
        var sortedData = retrieveHighscores.sort(function(a,b){return b.Score-a.Score});
        localStorage.setItem('highscores', JSON.stringify(sortedData));
    }
}
submitBtn.addEventListener('click', function(){
    var initial = initialInput.value.trim();
    saveHighscore(initial);
    location.replace('highscores.html');
})

function endGame() {
    questionsContainer.setAttribute('class', 'hide');
    endScreenContainer.setAttribute('class', 'visible');
    finalScoreContainer.textContent = score;
    clearInterval(timer);
}