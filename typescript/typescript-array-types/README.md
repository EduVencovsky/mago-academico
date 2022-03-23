# Você sabe a diferença entre string[] e [string] no typescript?

[Link do video](https://youtu.be/HMfLoEJQeuM)  
[Artigo no dev.to](https://dev.to/magoacademico/voce-sabe-a-diferenca-entre-string-e-string-no-typescript-4fg3)

Você sabe a diferença entre os tipos `string[]` e `[string]` ?

`string[]` é um array de strings, podendo ser um array vazio, com uma string, duas ou quantas strings você quiser.

```ts
let a: string[] = [] // => ok
let b: string[] = ['hello'] // => ok
let c: string[] = ['hello', 'world'] // => ok
```

Já o tipo `[string]` também pode ser considerado um array, mas possui uma característica específica, é um array que possui um numero de elemento fixo em que se sabe o tipo exato de cada elemento. Esse tipo também é conhecido como **tupla** (*tuple*).

Portanto, para a tupla `[string]` só se pode atribuir um array com um único elemento na posição inicial do tipo string, caso seja um array vazio ou com mais de um elemento, dará erro.

```ts
let d: [string] = [] // => error
let e: [string] = ['hello'] // => ok
let f: [string] = ['hello', 'world']  // => error
```

Também é possível ter tuplas com vários elementos e nem todos precisam ser do mesmo tipo

```ts
let g: [string, string] = ['hello', 'world'] // => ok
let h: [string, number] = ['hello', 123] // => ok
let i: [number, number, boolean] = [0, 1, true] // => ok

```

Também é possível adicionar labels para cara elemento da tupla, assim na hora de utilizar esse tipo, é possível saber ao que se refere cada posição do array.

```ts
let i: [x: number, y: number, z: boolean] = [0, 1, true]
```