document.addEventListener('DOMContentLoaded', () => {
    const choices = document.querySelectorAll('.choice');
    const playButton = document.getElementById('playButton');
    const resultText = document.getElementById('result');

    let player1Choice = null;
    let player2Choice = null;

    choices.forEach(choice => {
        choice.addEventListener('click', function() {
            const player = this.parentNode;
            const playerNumber = Array.from(player.parentNode.children).indexOf(player) + 1;

            if (playerNumber === 1) {
                player1Choice = this.getAttribute('data-choice');
            } else {
                player2Choice = this.getAttribute('data-choice');
            }

            this.parentNode.querySelectorAll('.choice').forEach(btn => btn.style.backgroundColor = '');
            this.style.backgroundColor = '#0056b3';
        });
    });

    playButton.addEventListener('click', () => {
        if (!player1Choice || !player2Choice) {
            resultText.textContent = 'Both players must make a choice!';
            return;
        }

        if (player1Choice === player2Choice) {
            resultText.textContent = "It's a tie!";
        } else if (
            (player1Choice === 'rock' && player2Choice === 'scissors') ||
            (player1Choice === 'paper' && player2Choice === 'rock') ||
            (player1Choice === 'scissors' && player2Choice === 'paper')
        ) {
            resultText.textContent = 'Player 1 wins!';
        } else {
            resultText.textContent = 'Player 2 wins!';
        }

        player1Choice = null;
        player2Choice = null;
        choices.forEach(choice => choice.style.backgroundColor = '');
    });
});