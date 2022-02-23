type NumArr1 = number[]
type NumArr2 = Array<number>

const last = <T>(arr: T[]): T => arr[arr.length - 1]

const nArr = [123, 456]

last(nArr)
last<number>(nArr)
// @ts-expect-error
last<string>(nArr)