import { readFile } from '../../utils/file-utils'

const isExample = false

const FILE_NAME = isExample ? 'input/example.txt' : 'input/input.txt'
const REGEX_EXTRACT = /^\/dev\/grid\/node-x(\d+)-y(\d+) +(\d+)T +(\d+)T +(\d+)T +(\d+)%$/

const nodes = new Map()

readFile(FILE_NAME).forEach((line) => {
  const match = line.match(REGEX_EXTRACT)
  if (!match) {
    return
  }

  const x = parseInt(match[1])
  const y = parseInt(match[2])
  nodes.set(`${x}-${y}`, {
    x: parseInt(match[1]),
    y: parseInt(match[2]),
    used: parseInt(match[4]),
    available: parseInt(match[5]),
  })
})

const MAX_Y = Math.max(...Array.from(nodes.values()).map((node) => node.y))
const MAX_X = Math.max(...Array.from(nodes.values()).map((node) => node.x))

let TARGET_X = MAX_X - 1
let TARGET_Y = 0
let DIRECTIONS = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
]

const minMovement = new Map()

const getMinFromFreeSpaceToTarget = (x, y, n) => {
  if (x === TARGET_X && y === TARGET_Y) {
    return n
  }

  const key = `${x}-${y}`
  const cacheMin = minMovement.get(key)
  if (cacheMin <= n) {
    return Infinity
  }
  minMovement.set(key, n)

  const results = [Infinity]

  const currentCell = nodes.get(`${x}-${y}`)
  for (const direction of DIRECTIONS) {
    const newX = x + direction[0]
    const newY = y + direction[1]
    if (newY >= 0 && newY <= MAX_Y && newX >= 0 && newX <= MAX_X) {
      const newCell = nodes.get(`${newX}-${newY}`)
      if (newCell.used <= currentCell.available + currentCell.used) {
        results.push(getMinFromFreeSpaceToTarget(newX, newY, n + 1))
      }
    }
  }

  return Math.min(...results)
}

const freeSpace = Array.from(nodes.values()).find((node) => node.used === 0)
const minFreeSpaceToTarget = getMinFromFreeSpaceToTarget(freeSpace.x, freeSpace.y, 0)

const result = minFreeSpaceToTarget + 5 * (MAX_X - 1) + 1
console.log(result)
