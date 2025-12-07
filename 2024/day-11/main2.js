import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const countLimit = 75
const cache = new Map()

const blink = (value, counter) => {
  if (counter === countLimit) {
    return 1
  }
  const key = `${value}-${counter}`
  const cachedValue = cache.get(key)
  if (cachedValue) {
    return cachedValue
  } else {
    let res
    if (value === 0) {
      res = blink(1, counter + 1)
    } else {
      const strValue = value.toString()
      const strLength = strValue.length
      if (strLength % 2 === 0) {
        const nDigits = strLength / 2
        res =
          blink(parseInt(strValue.slice(0, nDigits)), counter + 1)
          + blink(parseInt(strValue.slice(nDigits)), counter + 1)
      } else {
        res = blink(value * 2024, counter + 1)
      }
    }
    cache.set(key, res)
    return res
  }
}

let numbers = readFile(FILE_NAME)[0]
  .split(' ')
  .map((e) => parseInt(e))
let result = 0

for (let j = 0; j < numbers.length; j++) {
  result += blink(numbers[j], 0)
}

console.log(result)
