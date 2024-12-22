import { readFile } from '../../utils/javascript/file-utils'

const FILE_NAME = 'input/input.txt'

const getRowActiveNumbers = (line, col) => {
  let res = ['']
  let isActive = false
  line.forEach(char => {
    if (char.isNumber) {
      res[res.length - 1] += char.value
      isActive = isActive || col - 1 <= char.col && char.col <= col + 1
    } else {
      if (!isActive) {
        res.pop()
      } else {
        isActive = false
      }
      res.push('')
    }
  })
  if (!isActive) {
    res.pop()
  }
  return res.filter(r => r)
    .map(r => parseInt(r))
}

const getGearFactor = (row, col, charMatrix) => {
  let activeNumbers = []
  if (row != 0) {
    activeNumbers.push(getRowActiveNumbers(charMatrix[row - 1], col))
  }
  activeNumbers.push(getRowActiveNumbers(charMatrix[row], col))
  if (charMatrix[row + 1]) {
    activeNumbers.push(getRowActiveNumbers(charMatrix[row + 1], col))
  }
  activeNumbers = activeNumbers.flatMap(r => r)
  return activeNumbers.length === 2 ? activeNumbers[0] * activeNumbers[1] : 0
}

let row = -1
let charMatrix = readFile(FILE_NAME)
  .map(line => {
    row++
    let col = -1
    return line.split('')
      .map(char => {
        col++
        return { value: char, row, col, isNumber: !isNaN(char), isGear: char === '*' }
      })
  })

const result = charMatrix.flatMap(line =>
    line.filter(char => char.isGear)
      .map(char => getGearFactor(char.row, char.col, charMatrix))
  )
  .reduce((acc, val) => acc + val, 0)

console.log(result)
