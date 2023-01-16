# Dica para iniciantes em Javascript de como melhorar seu código

Você já deve ter feito ou ainda vai fazer um código assim na sua vida

```js
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
```

Mas você sabia que tem como melhorar?

Talvez você saibe que é possível fazer o mesmo código utilizando um 'switch' case.

```js
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
```

Mas calma que pode ficar melhor ainda.

Você pode criar um objeto em que as chaves combinam com o valor que você quer verificar e dai basta acessar o objeto com a chave correta, verificar se o valor existe e chamar sua função.

```js
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
```

Isso faz com que seu código se torne muito mais claro e agora caso você queria adicionar novos métodos, basta adicionar uma nova chave no objeto sem precisar adicionar novos ifs.
