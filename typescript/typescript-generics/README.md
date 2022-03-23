# Typescript Generics

## Entendendo como surgiu o *Generics*

Digamos que você não sabe nada sobre *Generics* e você quer criar uma função para verificar se dois números são iguais e caso não sejam, estourar um error. 

Você poderia implementar essa função da seguinte forma:

```ts
const numMustBeEqual = (x: number, y: number) => {
  if (x !== y) throw new Error(`${x} isn't equal to ${y}`)
}
```

Mas digamos que depois de um também, você quer fazer o mesmo, só que com strings, então você poderia fazer algo como:

```ts
const numMustBeEqual = (x: number, y: number) => {
  if (x !== y) {
    throw new Error(`${x} isn't equal to ${y}`);
  }
};

const strMustBeEqual = (x: string, y: string) => {
  if (x !== y) {
    throw new Error(`${x} isn't equal to ${y}`);
  }
};
```

Mas criar duas funções que fazem a mesma coisa, apenas para poder receber tipos diferentes, não é algo muito bom.

Então você decide usar `any` para poder receber qualquer tipo.

```ts
const anyMustBeEqual = (x: any, y: any) => {
  if (x !== y) {
    throw new Error(`${x} isn't equal to ${y}`);
  }
};
```

Mas usar `any` não é uma boa pratica e também pode permitir com que se faça coisas como

```ts
anyMustBeEqual(123, "abc");
```

Onde se comprara strings com números, que claramente não são iguais.

E é ai que você percebe a necessidade de usar *Generics*.

Você quer fazer uma função que possa ser utilizada com mais de um tipo, mas sem especificar-lo, tendo parâmetros que são genéricos.

## Utilizando *Generics*

Para utilizarmos um tipo genérico em nossa função, passaremos um parâmetro de tipo utilizando `<` e `>`, e dentro passaremos o nome do tipo que queremos. 

```ts
const mustBeEqual = <T>(x: T, y: T) => {
  if (x !== y) {
    throw new Error(`${x} isn't equal to ${y}`);
  }
};
```

Você pode visualizar uma função genérica como tendo dois tipos de parâmetros. Parâmetros que se referem a um tipo (generics) e que se referem a uma variável. 

Da mesma forma que você você criar um parâmetro em uma função utilizando `(` + nome da variável + `)`, com parâmetros de tipo, utilizamos `<` + nome do tipo + `>`. Portanto `T` poderia ser qualquer outro nome.

Você também pode passar quantos parâmetros do tipo você quiser, utilizando `,` entre eles, pode passar valores default usando `=` e utilizar outros parâmetros também

```ts
const func = <T, V = number, K = V[]>(foo: T, bar: V, baz: K) => {}
```

*Generics* é usado não só em funções, mas em classes, interfaces e tipos. Para criar uma interface genérica, basta passar os parâmetros de tipo logo após o nome e utiliza-los como um tipo dentro da função.

```tsx
interface Data<T> {
  id: T;
}
```

Um exemplo para utilizar essa interface genérica seria fazer uma função que filtra um array de `Data<T>` através de seu `id`

```tsx
const filterById = <T>(id: T, data: Data<T>[]) => {
  return data.filter((x) => x.id !== id);
};
```

## Utilizando Type Constraints

Essa função tem um pequeno detalhe, ela permite que se use `id` de qualquer tipo, podendo ser até mesmo um objeto ou um array, mas o `id` deve ser apenas `string` ou `number`.

Para resolver esse problema, precisamos definir que `data` apenas estenda a interface e não que seja idêntica a ela. Para isso, criaremos um novo parâmetro de tipo e definiremos uma restrição ([type constraint](https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints)) usando `extends` que restringirá esse tipo para extender `Data<T>`.

```ts
interface Data<T extends string | number> {
  id: T;
}

const filterByIdExtended = <T extends string | number>(id: T, data: Data<T>[]) => {
  return data.filter((x) => x.id !== id);
};
```

Dessa forma a função aceitará qualquer objeto que tiver uma propriedade `id` do mesmo tipo que o `id`  utilizado.

## Observações

Agora que você sabe o que é, porque existe e com usar *Generics*, você pode ter percebido que você já viu ou já utilizou *Generics* antes sem saber.

O melhor exemplo disso é o array que pode ser utilizado como `string[]`, mas esse `[]` no final de um tipo é apenas um syntax sugar para o tipo genérico de array que é `Array<string>`.

Outro fator interessante para saber é que você pode passar explicitamente os parâmetros genéricos utilizando `<` + tipo generico + `>` ao chamar uma função ou utilizar um tipo.  

Quando não é explicitamente utilizado o parâmetro genérico, o typescript infere o tipo automaticamente pelas variáveis, mas quando é explícito, as variáveis devem seguir estritamente o tipo passado.

```ts
const last = <T>(arr: T[]): T => arr[arr.length - 1]

const nArr = [123, 456]

last(nArr)
last<number>(nArr)
last<string>(nArr) // => error
```

No caso a cima, temos uma função com parâmetro genérico que funciona com o parâmetro não explícito e explícito, mas da erro quando o parâmetro explícito é diferente do da variável utilizada.