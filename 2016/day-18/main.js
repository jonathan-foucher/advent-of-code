import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const firstRow = readFile(FILE_NAME)[0]
  .split('')
  .map((char) => char === '.')
const WIDTH = firstRow.length
const HEIGHT = 40
const rows = [firstRow]

let result = firstRow.filter((e) => e).length
for (let y = 1; y < HEIGHT; y++) {
  rows.push([])
  for (let x = 0; x < WIDTH; x++) {
    const previousRow = rows[y - 1]
    const isLeftTrap = x === 0 ? false : !previousRow[x - 1]
    const isRightTrap = x === WIDTH - 1 ? false : !previousRow[x + 1]

    const isTrap = (isLeftTrap && !isRightTrap) || (isRightTrap && !isLeftTrap)
    if (!isTrap) {
      result++
    }
    rows[y].push(!isTrap)
  }
}

console.log(result)
