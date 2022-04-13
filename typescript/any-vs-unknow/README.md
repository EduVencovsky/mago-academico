# Você sabe a diferença entre any e unknown?

`any` e `unknown` são tipos bem parecidos e podem parecer que são até iguais, mas possuem suas diferenças.

A confusão que se tem sobre esses dois tipos vem do fato de que, se criarmos uma função que recebe dois parâmetros, um do tipo `any` e outro do tipo `unknown`, veremos que podemos passar qualquer variável para ambos os tipos sem erros.

```tsx
const foo = (anyType: any, unknownType: unknown) => {}

foo({}, {})
foo(123, 456)
foo(null, null)
foo(() => {}, () => {})
```

Mas é possível ver a diferença quando se usa essas variáveis.

Com `any`  você pode atribuir qualquer tipo e usar como se fosse qualquer tipo. Já `unknown` você pode atribuir qualquer tipo, mas ao usar ele não é nenhum tipo e você precisará verificar qual é o tipo.

Uma variável do tipo `any` você pode ser usada como uma `string` ou como uma função e até mesmo como um objeto, mostrando que `any` é equivalente a todos os tipos.

```tsx
const foo = (anyType: any, unknownType: unknown) => {
  const str1: string = anyType; // => ok
  anyType(); // => ok
  anyType.foo; // => ok
}
```

Já o `unknown`, mesmo podendo receber qualquer tipo, ele da erro quando se tenta usa-lo como qualquer tipo, portanto não se pode usa-lo como uma `string`, função, objeto ou qualquer outro tipo diferente de `unknown`. 

```tsx
const foo = (anyType: any, unknownType: unknown) => {
  const str1: string = anyType; // => ok
  anyType(); // => ok
  anyType.foo; // => ok

  const str2: string = unknownType; // => erro
  unknownType(); // => erro
  unknownType.foo; // => erro
}
```

Para você poder usar uma variável do tipo `unknown`, é preciso que se verifique o tipo antes. Para atribuir `unknown` para uma `string`, pode-se verificar utilizando `typeof` e ver se o tipo da variável é de fato `string`, e o mesmo pode ser feito para uma função.

```tsx
const str2: string = unknownType; // => erro
if(typeof unknownType === 'string') {
  const str2: string = unknownType; // => ok
}

unknownType(); // => erro
if(typeof unknownType === 'function') {
	unknownType(); // => ok
}
```

Para verificar se uma variável é de um tipo mais especifico, como um objeto com algumas propriedades especificas, é necessário utilizar um [user-defined type guard](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates), que é uma função que o retorno dela define um *type predicate*, ou seja, define que uma variável é de um determinado tipo utilizando `is`.

```tsx
interface Foo {
  foo: string
}

// user-defined type guard      *type predicate*
const isFooType = (foo: unknown): foo is Foo => {
  return (foo as Foo)?.foo !== undefined
}

unknownType.foo; // => erro
if(isFooType(unknownType)) {
	unknownType.foo; // => ok
}
```

Ao utilizar `unknown` ao invés de `any` você permite que seu código seja utilizado de forma muito mais segura.