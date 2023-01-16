const playerMoves = {
  ArrowUp: () => {
    /* ... */
  },
  ArrowDown: () => {
    /* ... */
  },
  ArrowLeft: () => {
    /* ... */
  },
  ArrowRight: () => {
    /* ... */
  },
};

const handleKeyPress = (e) => {
  const movePlayer = playerMoves[e.key];
  if (movePlayer) movePlayer();
};

window.addEventListener("keydown", handleKeyPress);
