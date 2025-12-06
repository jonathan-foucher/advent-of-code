import { readFile } from '../../utils/javascript/file-utils'

const FILE_NAME = 'input/input.txt'

const updateStone = (value) => {
  if (value === 0) {
    return [1]
  }

  const strValue = '' + value
  if (strValue.length % 2 === 0) {
    const nDigits = strValue.length / 2
    return [parseInt(strValue.slice(0, nDigits)), parseInt(strValue.slice(nDigits))]
  }

  return [value * 2024]
}

let result = readFile(FILE_NAME)[0]
  .split(' ')
  .map((e) => parseInt(e))
for (let i = 0; i < 25; i++) {
  result = result.flatMap((stone) => updateStone(stone))
}

console.log(result.length)
