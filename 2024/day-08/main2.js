import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

let row = 0
const matrix = readFile(FILE_NAME).map((line) => {
  let col = -1
  const res = line.split('').map((char) => {
    col++
    return {
      value: char,
      col: col,
      row: row,
      isAntenna: char !== '.',
      isAntinode: false,
    }
  })
  row++
  return res
})

const MATRIX_HEIGHT = matrix.length
const MATRIX_WIDTH = matrix[0].length

const allFrequencies = []

matrix.forEach((row) =>
  row.forEach((col) => {
    if (col.isAntenna) {
      if (!allFrequencies[col.value.charCodeAt(0)]) {
        allFrequencies[col.value.charCodeAt(0)] = [col]
      } else {
        allFrequencies[col.value.charCodeAt(0)].push(col)
      }
    }
  })
)

allFrequencies.forEach((freq) => {
  freq.forEach((antenna) => {
    freq.forEach((antenna2) => {
      if (antenna.row !== antenna2.row || antenna.col !== antenna2.col) {
        matrix[antenna.row][antenna.col].isAntinode = true
        matrix[antenna2.row][antenna2.col].isAntinode = true

        let antipodeRow = antenna.row + (antenna.row - antenna2.row)
        let antipodeCol = antenna.col + (antenna.col - antenna2.col)

        while (antipodeRow >= 0 && antipodeRow < MATRIX_HEIGHT && antipodeCol >= 0 && antipodeCol < MATRIX_WIDTH) {
          matrix[antipodeRow][antipodeCol].isAntinode = true
          antipodeRow += antenna.row - antenna2.row
          antipodeCol += antenna.col - antenna2.col
        }
      }
    })
  })
})

const result = matrix.flatMap((e) => e).filter((e) => e.isAntinode).length

console.log(result)
