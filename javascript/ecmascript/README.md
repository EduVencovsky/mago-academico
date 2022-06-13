# O que é ES6? ECMAScript?

ES6 se refere a 6ª versão do ECMAScript. 
ECMAScript é uma especificação de uma linguagem de script e o Javascript é a implementação dessa especificação.

O ECMAScript existe pois cada browser, seja chrome, firefox ou qualquer outro, possui diferentes implementações para que você possa rodar seu código Javascript, mas todos devem seguir a mesma especificação. 

Imagina se para cada browser tivesse uma especificação diferente? Seria uma loucura

Algumas features novas no ES6
```js
// Declaração de variáveis com let e const
let varLet = 123;
const varConst = 456;

// Arrow function
const arrowFunction = () => {};

// Classes
class Classes {}

// Template string
const templateStr = `${varLet} ${varConst}`;

// Promises
const delay = (duration = 0) =>
  new Promise((resolve, reject) => {
    setTimeout(resolve, duration);
  });

await delay(1000)

// E muito mais ...
```

ES7
```js
// Array includes
[1, 2, 3].includes(1) // => true
[1, 2, 3].includes(9) // => false
// Operador de exponenciação
10 ** 3 // => 10 * 10 * 10 = 1000
```

ES8
```js
// Async function
const asyncFunc = async () => {
    await delay();
}

// Object.entries e Object.values
const obj = { siga: 'agora', like: true }
Object.entries(obj) 
// => [['siga', 'agora'], ['like', true]]
Object.values(obj)
// => ['agora', 'true']

// E muito mais ...
```

E existem varias outras versões, ES9, ES10, ...

Se você quer ver todas as versões e entender mais sobre:  
- [Documentação oficial (en-US)](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/)
- [Lista de todas as features (en-US)](https://github.com/daumann/ECMAScript-new-features-list)
- [Artigo mais detalhado sobre ECMAScript e Javascript (en-US)](https://www.freecodecamp.org/news/whats-the-difference-between-javascript-and-ecmascript-cba48c73a2b5/)
