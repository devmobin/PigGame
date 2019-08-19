let scores, roundScore, activePlayer, gameState, winningPoint

$(document).ready(initialGame)

$('.btn-roll').click(function() {
    if (gameState === 'running') {
        let dice = Math.floor(Math.random() * 6) + 1
        $('.dice')
            .css('display', 'block')
            .attr('src', `dice-${dice}.png`)
        if (dice !== 1) {
            roundScore += dice
            $(`#current-${activePlayer}`).text(roundScore)
        } else {
            $('.wrapper').addClass('dice-one')
            $(`.player-${activePlayer}-panel`).removeClass('active')
            setTimeout(() => {
                $('.wrapper').removeClass('dice-one')
                changeActivePlayer()
            }, 500)
        }
    } else {
        initialGame()
    }
})

$('.btn-hold').click(function () {
    if (gameState === 'running') {
        winningPoint = $('.final-score').val() ? $('.final-score').val() : 20
        scores[activePlayer] += roundScore
        $(`#score-${activePlayer}`).text(scores[activePlayer])
        if (scores[activePlayer] >= winningPoint) {
            gameState = 'stopped'
            $(`#name-${activePlayer}`).text('Winner!!!')
            $('.dice').css('display', 'none')
            $(`.player-${activePlayer}-panel`).removeClass('active')
            $(`.player-${activePlayer}-panel`).addClass('winner')
        } else {
            changeActivePlayer()
        }
    } else {
        initialGame()
    }
})

$('.btn-new').click(initialGame)

function initialGame() {
    scores = [0, 0]
    roundScore = 0
    activePlayer = 0
    gameState = 'running'
    $('.dice').css('display', 'none')
    $('#score-0').text('0')
    $('#score-1').text('0')
    $('#current-0').text('0')
    $('#current-1').text('0')
    $(`#name-0`).text('Player 1')
    $(`#name-1`).text('Player 2')
    $(`.player-0-panel`).removeClass('winner')
    $(`.player-1-panel`).removeClass('winner')
    $(`.player-0-panel`).addClass('active')
    $(`.player-1-panel`).removeClass('active')
}

function changeActivePlayer() {
    $('.dice').css('display', 'none')
    $(`#current-${activePlayer}`).text(0)
    $(`.player-${activePlayer}-panel`).removeClass('active')    
    activePlayer = activePlayer === 0 ? 1 : 0
    $(`.player-${activePlayer}-panel`).addClass('active')
    roundScore = 0
}
