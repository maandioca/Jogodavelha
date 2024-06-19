// jogodavelha.js
document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById('board');
    const winnerDisplay = document.getElementById('vencedor');
    let currentPlayer = 'X';
    let gameActive = true;
    const gameState = Array(9).fill(null);
    
    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
  
    function handleCellPlayed(clickedCell, clickedCellIndex) {
      gameState[clickedCellIndex] = currentPlayer;
      clickedCell.textContent = currentPlayer;
    }
  
    function handlePlayerChange() {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  
    function handleResultValidation() {
      let roundWon = false;
      for (let i = 0; i < 8; i++) {
        const winCondition = winningConditions[i];
        const a = gameState[winCondition[0]];
        const b = gameState[winCondition[1]];
        const c = gameState[winCondition[2]];
        if (a === null || b === null || c === null) {
          continue;
        }
        if (a === b && b === c) {
          roundWon = true;
          break;
        }
      }
  
      if (roundWon) {
        winnerDisplay.textContent = `Jogador ${currentPlayer} venceu!`;
        gameActive = false;
        return;
      }
  
      const roundDraw = !gameState.includes(null);
      if (roundDraw) {
        winnerDisplay.textContent = 'Empate!';
        gameActive = false;
        return;
      }
  
      handlePlayerChange();
    }
  
    function handleCellClick(event) {
      const clickedCell = event.target;
      const clickedCellIndex = Array.from(board.children).indexOf(clickedCell);
  
      if (gameState[clickedCellIndex] !== null || !gameActive) {
        return;
      }
  
      handleCellPlayed(clickedCell, clickedCellIndex);
      handleResultValidation();
    }
  
    function handleRestartGame() {
      gameActive = true;
      currentPlayer = 'X';
      gameState.fill(null);
      winnerDisplay.textContent = '';
      Array.from(board.children).forEach(cell => (cell.textContent = ''));
    }
  
    // Create board
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div');
      cell.classList.add('casinha');
      if (i % 2 !== 0) {
        cell.classList.add('gray');
      }
      cell.addEventListener('click', handleCellClick);
      board.appendChild(cell);
    }
  
    const restartButton = document.createElement('button');
    restartButton.textContent = 'Reiniciar Jogo';
    restartButton.addEventListener('click', handleRestartGame);
    document.body.appendChild(restartButton);
  });
  