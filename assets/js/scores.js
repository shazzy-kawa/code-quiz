var highscoresContainer = document.querySelector('#highscores');
var highscores = JSON.parse(localStorage.getItem('highscores'));
var clearButton = document.querySelector('#clear');

for(let i = 0; i < highscores.length; i++){                          //scores added to highscores list and added to local storage
    var scoreList = document.createElement('li');
    scoreList.textContent = highscores[i].Initial + " " + highscores[i].Score;
    highscoresContainer.appendChild(scoreList)
}

clearButton.addEventListener('click', function(){
    localStorage.removeItem('highscores');
    highscoresContainer.setAttribute('class','hide');
})