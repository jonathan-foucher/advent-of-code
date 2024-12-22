import { readFile } from '../../utils/javascript/file-utils'

const FILE_NAME = 'input/input.txt'

const getNextPositions = (mat, row, col) => {
  const res = []
  const height = mat.length
  const width = mat[0].length

  if (row > 0) {
    res.push(mat[row - 1][col])
  }
  if (row < height - 1) {
    res.push(mat[row + 1][col])
  }
  if (col > 0) {
    res.push(mat[row][col - 1])
  }
  if (col < width - 1) {
    res.push(mat[row][col + 1])
  }
  return res
}

let row = -1
const matrix = readFile(FILE_NAME)
  .map(line =>  line.split(''))
  .map(line => {
    row++
    let col = -1
    return line.map(char => {
      col++
      return { value: parseInt(char), col, row }
    })
  })

const result = matrix.flatMap(e => e).filter(e => e.value === 0)
  .map(startingPosition => {
    let res = [ startingPosition ]
    
    let currentStep = 1
    do {
      res = res.flatMap(pos => getNextPositions(matrix, pos.row, pos.col))
        .filter(nextPos => nextPos.value === currentStep)
      currentStep++
    } while (res.length > 0 && currentStep <= 9)

    return res.length
  })
  .reduce((acc, val) => acc + val, 0)

console.log(result)
