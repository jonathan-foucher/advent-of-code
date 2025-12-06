import { readFile } from '../../utils/javascript/file-utils'

const FILE_NAME = 'input/input.txt'

const isNearSpecialChar = (row, col, charMatrix) => {
  return (
    (row != 0 && charMatrix[row - 1].slice(Math.max(col - 1, 0), col + 2).some((char) => char.isSpecChar))
    || (col != 0 && charMatrix[row][col - 1].isSpecChar)
    || (charMatrix[row][col + 1] && charMatrix[row][col + 1].isSpecChar)
    || (charMatrix[row + 1] && charMatrix[row + 1].slice(Math.max(col - 1, 0), col + 2).some((char) => char.isSpecChar))
  )
}

let row = -1
let charMatrix = readFile(FILE_NAME).map((line) => {
  row++
  let col = -1
  return line.split('').map((char) => {
    col++
    return { value: char, row, col, isNumber: !isNaN(char), isSpecChar: isNaN(char) && char != '.' }
  })
})

charMatrix = charMatrix.map((line) =>
  line.map((char) => {
    return { ...char, isActive: char.isNumber && isNearSpecialChar(char.row, char.col, charMatrix) }
  })
)

const result = charMatrix
  .flatMap((line) => {
    const res = ['']
    let isActive = false
    line.forEach((char) => {
      if (char.isNumber) {
        res[res.length - 1] += char.value
        isActive = isActive || char.isActive
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
    return res.filter((r) => r)
  })
  .map((number) => parseInt(number))
  .reduce((acc, val) => acc + val, 0)

console.log(result)
