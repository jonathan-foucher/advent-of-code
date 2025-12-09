import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

let coordinates = readFile(FILE_NAME).map((line) => {
  const x = parseInt(line.split(',')[0])
  const y = parseInt(line.split(',')[1])
  return { x, y }
})

let result = 0

for (let i = 0; i < coordinates.length - 1; i++) {
  const coordinate1 = coordinates[i]
  for (let j = i + 1; j < coordinates.length; j++) {
    const coordinate2 = coordinates[j]
    const area = (Math.abs(coordinate1.x - coordinate2.x) + 1) * (Math.abs(coordinate1.y - coordinate2.y) + 1)
    if (area > result) {
      result = area
    }
  }
}

console.log(result)
