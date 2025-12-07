import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const instructions = readFile(FILE_NAME)

const GRID_SIZE = 1000

const lights = []

for (let x = 0; x < GRID_SIZE; x++) {
  lights.push([])
  for (let y = 0; y < GRID_SIZE; y++) {
    lights[x].push(0)
  }
}

for (let i = 0; i < instructions.length; i++) {
  const instruction = instructions[i]
  const isToggle = instruction.startsWith('toggle')
  const state = instruction.startsWith('turn on')
  const coordinates = instruction
    .replace('turn on ', '')
    .replace('turn off ', '')
    .replace('toggle ', '')
    .split(' through ')
    .map((coordinate) => coordinate.split(',').map((value) => parseInt(value)))

  const xCoordinates = [coordinates[0][0], coordinates[1][0]]
  const yCoordinates = [coordinates[0][1], coordinates[1][1]]

  for (let x = Math.min(...xCoordinates); x <= Math.max(...xCoordinates); x++) {
    for (let y = Math.min(...yCoordinates); y <= Math.max(...yCoordinates); y++) {
      lights[x][y] += isToggle ? 2 : state ? 1 : -1
      if (lights[x][y] < 0) {
        lights[x][y] = 0
      }
    }
  }
}

let result = 0
for (let x = 0; x < GRID_SIZE; x++) {
  for (let y = 0; y < GRID_SIZE; y++) {
    result += lights[x][y]
  }
}

console.log(result)
