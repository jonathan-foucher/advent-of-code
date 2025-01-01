import { readFile } from '../../utils/javascript/file-utils'

const FILE_NAME = 'input/input.txt'

const lines = readFile(FILE_NAME)

const NUM_PAD = [
  { value: '7', x: 0, y: 0 },
  { value: '8', x: 1, y: 0 },
  { value: '9', x: 2, y: 0 },
  { value: '4', x: 0, y: 1 },
  { value: '5', x: 1, y: 1 },
  { value: '6', x: 2, y: 1 },
  { value: '1', x: 0, y: 2 },
  { value: '2', x: 1, y: 2 },
  { value: '3', x: 2, y: 2 },
  { value: '0', x: 1, y: 3 },
  { value: 'A', x: 2, y: 3 }
]

const DIR_PAD = [
  { value: '^', x: 1, y: 0 },
  { value: 'A', x: 2, y: 0 },
  { value: '<', x: 0, y: 1 },
  { value: 'v', x: 1, y: 1 },
  { value: '>', x: 2, y: 1 }
]

const countSeq = (seq, depth, isNumPad) => {
  if (depth === 0) {
    return seq.length
  }

  const currentPad = isNumPad ? NUM_PAD : DIR_PAD

  let counter = 0
  let currentKey = currentPad.find(key => key.value === 'A')
  for (let i = 0; i < seq.length; i++) {
    const char = seq[i]
    const target = currentPad.find(key => key.value === char)
    let deltaX = target.x - currentKey.x
    let deltaY = target.y - currentKey.y
    let newSeq = ''
    while (deltaX !== 0 || deltaY !== 0) {
      if (deltaX < 0) {
        const isLeftGap = currentPad.filter(key => key.x >= target.x && key.x < target.x - deltaX
          && key.y === target.y - deltaY).length !== Math.abs(deltaX)

        if (!isLeftGap) {
          while (deltaX < 0) {
            newSeq += '<'
            deltaX++
          }
        }
      }

      if (deltaY > 0) {
        const isBotGap = currentPad.filter(key => key.x === target.x - deltaX
          && key.y <= target.y && key.y > target.y - deltaY).length !== Math.abs(deltaY)

        if (!isBotGap) {
          while (deltaY > 0) {
            newSeq += 'v'
            deltaY--
          }
        }
      }

      if (deltaY < 0) {
        const isTopGap = currentPad.filter(key => key.x === target.x - deltaX
          && key.y >= target.y && key.y < target.y - deltaY).length !== Math.abs(deltaY)

        if (!isTopGap) {
          while (deltaY < 0) {
            newSeq += '^'
            deltaY++
          }
        }
      }

      if (deltaX > 0) {
        const isRightGap = currentPad.filter(key => key.x <= target.x && key.x > target.x - deltaX
          && key.y === target.y - deltaY).length !== Math.abs(deltaX)

        if (!isRightGap) {
          while (deltaX > 0) {
            newSeq += '>'
            deltaX--
          }
        }
      }
    }
    newSeq += 'A'
    counter += countSeq(newSeq, depth - 1, false)
    currentKey = target
  }
  return counter
}

let result = 0
for (let i = 0; i < lines.length; i++) {
  const line = lines[i]
  const res = countSeq(line, 3, true)
  console.log(res, parseInt(lines[i].replace('A', '')))
  result += res * parseInt(lines[i].replace('A', ''))
}

console.log(result)
