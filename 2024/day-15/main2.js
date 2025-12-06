import { readFile } from '../../utils/javascript/file-utils'

const FILE_NAME = 'input/input.txt'

const lines = readFile(FILE_NAME)

const map = []
let instructions = []
let isInstruction = false

for (let i = 0; i < lines.length; i++) {
  const line = lines[i]
  if (line.length === 0) {
    isInstruction = true
  } else if (!isInstruction) {
    map.push(
      line.split('').flatMap((e) => {
        switch (e) {
          case '#':
            return '##'.split('')
          case 'O':
            return '[]'.split('')
          case '.':
            return '..'.split('')
          case '@':
            return '@.'.split('')
        }
      })
    )
  } else {
    instructions.push(line.split(''))
  }
}

let robot
for (let i = 0; i < map.length; i++) {
  for (let j = 0; j < map[0].length; j++) {
    map[i][j] = { value: map[i][j], y: i, x: j, key: `${j}-${i}` }
    if (map[i][j].value === '@') {
      robot = map[i][j]
    }
  }
}

instructions = instructions.flatMap((e) => e)

for (let i = 0; i < instructions.length; i++) {
  let delta
  switch (instructions[i]) {
    case '>':
      delta = [1, 0]
      break
    case '<':
      delta = [-1, 0]
      break
    case '^':
      delta = [0, -1]
      break
    case 'v':
      delta = [0, 1]
      break
  }

  const isVerticalDelta = delta[1] !== 0
  let nextCase = map[robot.y + delta[1]][robot.x + delta[0]]

  if (!isVerticalDelta || nextCase.value === '.' || nextCase.value === '#') {
    const boxes = []
    while (nextCase.value === '[' || nextCase.value === ']') {
      boxes.push(nextCase)
      nextCase = map[nextCase.y + delta[1]][nextCase.x + delta[0]]
    }

    if (nextCase.value !== '#') {
      while (boxes.length > 0) {
        const box = boxes[boxes.length - 1]
        map[box.y + delta[1]][box.x + delta[0]].value = box.value
        boxes.pop()
      }

      let nextCase = map[robot.y + delta[1]][robot.x + delta[0]]
      nextCase.value = '@'
      robot.value = '.'
      robot = nextCase
    }
  } else {
    let isBlocked = false
    const nextOtherCase = nextCase.value === '[' ? map[nextCase.y][nextCase.x + 1] : map[nextCase.y][nextCase.x - 1]
    const alreadyAddedBoxes = [nextCase.key, nextOtherCase.key]
    const boxes = [nextCase, nextOtherCase]
    let nextBoxes = [nextCase, nextOtherCase]

    while (nextBoxes.length > 0 && !isBlocked) {
      nextBoxes = nextBoxes.flatMap((nextBox) => {
        let nextCase = map[nextBox.y + delta[1]][nextBox.x + delta[0]]
        if (nextCase.value === '#') {
          isBlocked = true
        } else if (nextCase.value !== '.') {
          const nextOtherCase =
            nextCase.value === '[' ? map[nextCase.y][nextCase.x + 1] : map[nextCase.y][nextCase.x - 1]
          const res = []
          if (!alreadyAddedBoxes.includes(nextCase.key)) {
            alreadyAddedBoxes.push(nextCase.key)
            boxes.push(nextCase)
            res.push(nextCase)
          }
          if (!alreadyAddedBoxes.includes(nextOtherCase.key)) {
            alreadyAddedBoxes.push(nextOtherCase.key)
            boxes.push(nextOtherCase)
            res.push(nextOtherCase)
          }
          return res
        }
        return []
      })
    }

    if (!isBlocked) {
      while (boxes.length > 0) {
        const box = boxes[boxes.length - 1]
        map[box.y + delta[1]][box.x + delta[0]].value = box.value
        map[box.y][box.x].value = '.'
        boxes.pop()
      }

      let nextCase = map[robot.y + delta[1]][robot.x + delta[0]]
      nextCase.value = '@'
      robot.value = '.'
      robot = nextCase
    }
  }
}

let result = 0
for (let i = 0; i < map.length; i++) {
  for (let j = 0; j < map[0].length; j++) {
    if (map[i][j].value === '[') {
      result += map[i][j].x + map[i][j].y * 100
    }
  }
}

console.log(result)
