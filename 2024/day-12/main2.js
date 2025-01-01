import { readFile } from '../../utils/javascript/file-utils'

const FILE_NAME = 'input/input.txt'

const getNextPlants = (mat, row, col) => {
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

const getNumberOfCorners = (mat, plant) => {
  const row = plant.row
  const col = plant.col

  const top = (mat[row - 1] && mat[row - 1][col].value) === plant.value
  const bot = (mat[row + 1] && mat[row + 1][col].value) === plant.value
  const left = mat[row][col - 1]?.value === plant.value
  const right = mat[row][col + 1]?.value === plant.value

  const topLeft = (mat[row - 1] && mat[row - 1][col - 1]?.value) === plant.value
  const topRight = (mat[row - 1] && mat[row - 1][col + 1]?.value) === plant.value
  const botLeft = (mat[row + 1] && mat[row + 1][col - 1]?.value) === plant.value
  const botRight = (mat[row + 1] && mat[row + 1][col + 1]?.value) === plant.value

  return (!top && !left) + (!top && !right) + (!bot && !right) + (!bot && !left)
    + (top && left && !topLeft) + (top && right && !topRight)
    + (bot && right && !botRight) + (bot && left && !botLeft)
}

let row = -1
const matrix = readFile(FILE_NAME)
  .map(line =>  line.split(''))
  .map(line => {
    row++
    let col = -1
    return line.map(char => {
      col++
      return { value: char, col, row, key: `${row}-${col}` }
    })
  })

const alreadyCountedPlants = []
const areas = []
const height = matrix.length
const width = matrix[0].length

for (let i = 0; i < height; i++) {
  for (let j = 0; j < width; j++) {
    const plant = matrix[i][j]
    if (!alreadyCountedPlants.includes(plant.key)) {
      const area = []
      let nextPlants = [plant]
      do {
        area.push(...nextPlants)
        alreadyCountedPlants.push(...nextPlants.map(nextPlant => nextPlant.key))
        nextPlants = nextPlants.flatMap(
          nextPlant => getNextPlants(matrix, nextPlant.row, nextPlant.col)
            .filter(nextPlant => plant.value === nextPlant.value
              && !alreadyCountedPlants.includes(nextPlant.key)))
            .reduce((acc, val) => {
              if (!acc.map(p => p.key).includes(val.key)) {
                acc.push(val)
              }
              return acc
            }, [])
      } while(nextPlants.length > 0)
      areas.push(area)
    }
  }
}

let result = 0
for (let i = 0; i < areas.length; i++) {
  const area = areas[i]
  let corners = 0
  for (let j = 0; j < area.length; j++)  {
    corners += getNumberOfCorners(matrix, area[j])
  }
  result += corners * area.length
}

console.log(result)
