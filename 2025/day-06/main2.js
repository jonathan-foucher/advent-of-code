import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const matrix = readFile(FILE_NAME).map((line) => line.split('').map((c) => c.replace(' ', '')))
const rotMatrix = []

for (let j = 0; j < matrix[0].length; j++) {
  rotMatrix.push([])
  for (let i = 0; i < matrix.length; i++) {
    rotMatrix[j].push(matrix[i][j] || '')
  }
}

let result = 0
let currentResult = 0
let isAddition

for (let i = -1; i < rotMatrix.length; i++) {
  if (i === -1 || rotMatrix[i].every((c) => c === '')) {
    i++
    result += currentResult
    isAddition = rotMatrix[i][rotMatrix[i].length - 1] === '+'
    currentResult = parseInt(rotMatrix[i].slice(0, rotMatrix[i].length - 1).join(''))
  } else {
    if (isAddition) {
      currentResult += parseInt(rotMatrix[i].join(''))
    } else {
      currentResult *= parseInt(rotMatrix[i].join(''))
    }
  }
}
result += currentResult

console.log(result)
