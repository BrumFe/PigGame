// COMMENTS 
/* setter
document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';*/

/* getter
var x = document.querySelector('#score-1').textContent;
console.log(x);
*/

/* Anonymous function, is a function that only happens whem the EventListener call.
Example: document.querySelector('.btn-roll').addEventListener('click', function() {});
*/
//////////////////////////////////////////////////////////

var scores, roundScore, activePlayer, gamePlaying, lastDice, lastSecondDice;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
   
        // 1. Random number
        var dice = Math.floor(Math.random() * 6) + 1;
        var secondDice = Math.floor(Math.random() * 6) + 1;
        if (lastDice === 6 && dice === 6 || lastSecondDice === 6 && secondDice === 6) {
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
            nextPlayer();
        } else {
            // 2. Display the result
            var diceDOM = document.getElementById('dice-1');
            var secondDiceDOM = document.getElementById('dice-2');
            diceDOM.style.display = 'block';
            diceDOM.src = 'dice-' + dice + '.png';
            secondDiceDOM.style.display = 'block';
            secondDiceDOM.src = 'dice-' + secondDice + '.png';

            // 3. Update the round score IF the rolled number was NOT a 1
            if (dice !== 1 && secondDice !== 1) {
                // Add score 
                var sumDice = dice + secondDice;
                roundScore += sumDice;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
            } else {
                nextPlayer();
            }
            lastDice = dice;
            lastSecondDice = secondDice;
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function(){   
    if (gamePlaying) {
        var finalScore = document.querySelector('.final-score').value;
        if (finalScore) {
            finalScore;
        } else {
            finalScore = 100;
        }  
         // 1. Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        // 2. Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // 3. Check if player won the game 
        if (scores[activePlayer] >= finalScore) {
            document.querySelector('#name-' + activePlayer).textContent = "Winner!";
            document.querySelector('#dice-1').style.display = 'none';
            document.querySelector('#dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
   
});

function nextPlayer() {
    //Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    lastDice = 0;

    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    document.querySelector('#dice-1').style.display = 'none';
    document.querySelector('#dice-2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    lastDice = 0;
    lastSecondDice = 0;
    gamePlaying = true;
    document.querySelector('#dice-1').style.display = 'none';
    document.querySelector('#dice-2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.final-score').value = '';
}