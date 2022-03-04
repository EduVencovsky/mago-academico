type StringArray = string[]
type Tuple = [string]

let a1: StringArray = []
let a2: StringArray = ['deixa']
let a3: StringArray = ['deixa', 'o']
let a4: StringArray = ['deixa', 'o', 'like']

let b2: Tuple = ['se']
// @ts-expect-error
let b1: Tuple = []
// @ts-expect-error
let b3: Tuple = ['se', 'inscreva']

let c1: [number, number] = [1, 2]
let c2: [number, number, boolean] = [1, 2, true]
let c3: [x: number, y: number, visible: boolean] = [1, 2, true]