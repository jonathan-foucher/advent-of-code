import { readFile } from './file-utils'

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

matrix.forEach(line => {
  line.forEach(plant => {
    plant.fences = 4 - getNextPlants(matrix, plant.row, plant.col)
      .filter(nextPlant => plant.value === nextPlant.value).length
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
  let perimeter = 0
  for (let j = 0; j < area.length; j++)  {
    perimeter += area[j].fences
  }
  result += area.length * perimeter
}

console.log(result)
