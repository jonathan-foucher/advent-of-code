import { readFile } from './file-utils'

const FILE_NAME = 'input/input.txt'

const XMAS_REGEX = /(MAS|SAM)/g

let row = -1
let matrix = readFile(FILE_NAME)
  .map(line => {
    row++
    let col = -1
    return line.split('')
      .map(char => {
        col++
        return { value: char, row, col }
      })
  })

const isXMas = (char, row, col) => {
  if (char !== 'A' || row === 0 || row === matrix.length - 1 || col === 0 || col === matrix[0].length - 1) {
    return false
  }
  const diag = matrix[row - 1][col - 1].value + char + matrix[row + 1][col + 1].value 
  const otherDiag = matrix[row - 1][col + 1].value  + char + matrix[row + 1][col - 1].value

  return diag.match(XMAS_REGEX) && otherDiag.match(XMAS_REGEX)
}

const result = matrix.flatMap(char => char)
  .filter(char => isXMas(char.value, char.row, char.col))
  .length

console.log(result)
