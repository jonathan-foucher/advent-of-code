import { readFile } from '../../utils/javascript/file-utils'

const FILE_NAME = 'input/input.txt'

const instructions = readFile(FILE_NAME)[0].split(', ')
  .map(item => {
    const rotation = item[0]
    const steps = parseInt(item.slice(1, item.length))
    return { rotation, steps }
  })

let direction = 0
let x = 0
let y = 0
for (let i = 0; i < instructions.length; i++) {
  const rotation = instructions[i].rotation
  const steps = instructions[i].steps
  if (rotation === 'R') {
    direction = (direction + 1) % 4
  } else {
    direction = (direction + 3) % 4
  }

  switch(direction) {
    case 0:
      y -= steps
      break
    case 1:
      x += steps
      break
    case 2:
      y += steps
      break
    case 3:
      x -= steps
      break
  }
}

console.log(Math.abs(x) + Math.abs(y))
