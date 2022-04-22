# Cuidado com labels em javascript

Você sabe qual é o problema nesse código?

```js
[1, 2, 3].map(x => {id: x})
```

Se você executar esse código, você verá que não terá nenhum erro, mas retornará um array de elementos `undefined` ao invés de retornar um array de objetos com a propriedade `id`.

Porque isso acontece? Primeiramente é importante entender como arrumar esse código.

Para retornar um objeto diretamente de uma *arrow function* é necessário utilizar `()` envolta do objeto, da seguinte forma:

```js
// ❌ 
[1, 2, 3].map(x =>   {id: x}   ) // => [undefined, undefined, undefined]

// ✅ 
[1, 2, 3].map(x => ( {id: x} ) ) // => [{id: 1}, {id: 2}, {id: 3}]
```

Outra forma seria utilizar `return` 

```js
[1, 2, 3].map(x => {
	return {id: x} 
}) 
```

Então o que seria esse `x => {id: x}` ?

Na verdade, esse código deve ser visto da seguinte forma

```js
[1, 2, 3].map(x => {
	id: x
})
```

E o que ele realmente representa é a utilização de um [labeled statement](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/label) ou também conhecido como label no Javascript.

Um label serve como um identificador para depois ser utilizador por um `break` ou um `continue`. Um exemplo seria quando se tem mais de um `for`  loop dentro do outro e você deseja dar um `break` ou `continue` em um loop fora do escopo em que o código se encontra, ou seja, você está no loop de dentro, mas deseja dar um `break` no loop de fora. 

```js
loop1: for(let i = 0; i < 10; i++) { // loop de fora
	loop2: for(let i = 0; i < 10; i++) { // loop de dentro
		if(condition1) {
			break; // sai do loop2
		}
		if(condition2) {
			break loop2; // sai do loop2, igual a usar somente "break;"
		}
		if(condition3) {
			break loop1; // sai do loop1
		}
		if(condition4) {
			// labels tambem podem ser usados com "cotinue"
			continue loop1; // continua o loop1
		}
	}
}
```

Um label pode ser atribuído para qualquer variável, até mesmo `for` , `while` e escopos como `label: { /* codigo javascript */ }` e é dai que surge o erro no código.

Portanto, fique atento ao retornar objetos diretamente em uma *arrow function* para não cair no perigo de utilizar um label statement de maneira indesejada.