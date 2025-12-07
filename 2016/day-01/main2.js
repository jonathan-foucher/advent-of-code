import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const instructions = readFile(FILE_NAME)[0]
  .split(', ')
  .map((item) => {
    const rotation = item[0]
    const steps = parseInt(item.slice(1, item.length))
    return { rotation, steps }
  })

let direction = 0
let x = 0
let y = 0
const alreadyVisited = ['0-0']
for (let i = 0; i < instructions.length; i++) {
  const rotation = instructions[i].rotation
  const steps = instructions[i].steps
  if (rotation === 'R') {
    direction = (direction + 1) % 4
  } else {
    direction = (direction + 3) % 4
  }

  let isAlreadyVisited = false
  for (let _ = 0; _ < steps; _++) {
    if (direction === 0) {
      y--
    } else if (direction === 1) {
      x++
    } else if (direction === 2) {
      y++
    } else {
      x--
    }

    const key = `${x}-${y}`
    if (alreadyVisited.includes(key)) {
      isAlreadyVisited = true
      break
    }
    alreadyVisited.push(key)
  }

  if (isAlreadyVisited) {
    break
  }
}

console.log(Math.abs(x) + Math.abs(y))
