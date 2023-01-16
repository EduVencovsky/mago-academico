const movePlayerUp = () => {
  /* ... */
};
const movePlayerDown = () => {
  /* ... */
};
const movePlayerLeft = () => {
  /* ... */
};
const movePlayerRight = () => {
  /* ... */
};

const handleKeyPress = (e) => {
  if (e.key === "ArrowUp") {
    return movePlayerUp();
  } else if (e.key === "ArrowDown") {
    return movePlayerDown();
  } else if (e.key === "ArrowLeft") {
    return movePlayerLeft();
  } else if (e.key === "ArrowRight") {
    return movePlayerRight();
  }
};

window.addEventListener("keydown", handleKeyPress);
