import { readFile } from './file-utils'

const FILE_NAME = 'input/input.txt'

const XMAS_REGEX = /(?=(XMAS|SAMX))/g

const resultHor = readFile(FILE_NAME)
  .flatMap(line => line.match(XMAS_REGEX))
  .filter(res => res != null)
  .length

const matrix = readFile(FILE_NAME)
  .map(line => line.split(''))

const colSize = matrix[0].length

const vertStr = Array(colSize).fill({}).map(e => [])
matrix.forEach((row, i) => {
  row.forEach((col, j) => {
    vertStr[j][i] = col
  })
})

const resultVert = vertStr.map(row => row.join(''))
  .flatMap(line => line.match(XMAS_REGEX))
  .filter(res => res != null)
  .length

const diagStr = Array(colSize * 2 - 1).fill({}).map(e => [])
matrix.forEach((row, i) => {
  row.forEach((col, j) => {
    diagStr[i + j].push(col)
  })
})

const resultDiag = diagStr.map(row => row.join(''))
  .flatMap(line => line.match(XMAS_REGEX))
  .filter(res => res != null)
  .length

const diagReversedStr = Array(colSize * 2 - 1).fill({}).map(e => [])
matrix.reverse().forEach((row, i) => {
  row.forEach((col, j) => {
    diagReversedStr[i + j].push(col)
  })
})

const resultDiagReversed = diagReversedStr.map(row => row.join(''))
  .flatMap(line => line.match(XMAS_REGEX))
  .filter(res => res != null)
  .length

console.log(resultHor + resultVert + resultDiag + resultDiagReversed)
