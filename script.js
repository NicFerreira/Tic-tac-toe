let currentPlayer;
let player1Name;
let player2Name;
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = false;

// Array de combinações vencedoras
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
    [0, 4, 8], [2, 4, 6]             // Diagonais
];

// Função para atualizar o input com o jogador atual
function updateCurrentPlayer() {
    const currentPlayerInput = document.getElementById('currentPlayer');
    
    currentPlayerInput.value = `Vez de: ${currentPlayer}`;
    
    // Remova a classe .O se existir, adicione se currentPlayer for 'O'
    currentPlayerInput.classList.remove('O');
    if (currentPlayer === 'O') {
        currentPlayerInput.classList.add('O');
    }
}

// Função para iniciar o jogo
function startGame() {
    player1Name = document.getElementById('player1Name').value;
    player2Name = document.getElementById('player2Name').value;

    if (player1Name.trim() === '' || player2Name.trim() === '') {
        alert('Por favor, insira os nomes dos jogadores.');
    } else {
        currentPlayer = Math.random() < 0.5 ? 'X' : 'O'; // Escolha aleatoriamente entre 'X' e 'O'
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;

        // Limpe os quadrados e atualize o jogador atual
        const squares = document.querySelectorAll('.square');
        squares.forEach(square => {
            square.innerHTML = '';
        });

        updateCurrentPlayer();
    }
}

// Função para reiniciar o jogo
function resetGame() {
    currentPlayer = Math.random() < 0.5 ? 'X' : 'O'; // Escolha aleatoriamente entre 'X' e 'O'
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;

    // Limpe os quadrados, redefina as classes e atualize o jogador atual
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
        square.innerHTML = '';
        square.classList.remove('X', 'O'); // Remova as classes .X e .O
    });

    updateCurrentPlayer();
}

//Função de jogada
//Novo comentário teste
function makeMove(square) {
    const squareIndex = Array.from(square.parentNode.children).indexOf(square);

    if (gameBoard[squareIndex] === '' && gameActive) {
        square.innerHTML = currentPlayer;
        square.classList.add(currentPlayer); // Adiciona a classe correspondente
        gameBoard[squareIndex] = currentPlayer;

        // Verificar se houve uma vitória
        if (checkWin(currentPlayer)) {
            gameActive = false;
            alert(`${currentPlayer === 'X' ? player1Name : player2Name} venceu!`);
        } else if (!gameBoard.includes('')) {
            gameActive = false;
            alert('O jogo empatou!');
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updateCurrentPlayer(); // Atualize o jogador atual após cada jogada
        }
    }
}

function checkWin(player) {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] === player && gameBoard[b] === player && gameBoard[c] === player) {
            return true;
        }
    }
    return false;
}
