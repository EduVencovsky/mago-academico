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
  switch (e.key) {
    case "ArrowUp":
      movePlayerUp();
      break;
    case "ArrowDown":
      movePlayerDown();
      break;
    case "ArrowLeft":
      movePlayerLeft();
      break;
    case "ArrowRight":
      movePlayerRight();
      break;
    default:
      break;
  }
};

window.addEventListener("keydown", handleKeyPress);
