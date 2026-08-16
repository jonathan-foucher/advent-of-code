import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

let input = readFile(FILE_NAME)[0]
input = input.substring(1, input.length - 1)

let x = 0
let y = 0

const rooms = new Map()

const updateRoom = (x, y, char, prevChar) => {
  const key = `${x}_${y}`
  const room = rooms.get(key)
  if (room !== undefined) {
    room.north = room.north === true || char === 'N' || prevChar === 'S'
    room.west = room.west === true || char === 'W' || prevChar === 'E'
    room.south = room.south === true || char === 'S' || prevChar === 'N'
    room.east = room.east === true || char === 'E' || prevChar === 'W'
  } else {
    rooms.set(key, {
      x,
      y,
      north: char === 'N' || prevChar === 'S',
      west: char === 'W' || prevChar === 'E',
      south: char === 'S' || prevChar === 'N',
      east: char === 'E' || prevChar === 'W',
      shortestPath: Number.MAX_SAFE_INTEGER,
    })
  }
}

updateRoom(x, y, null, null)
const splits = []
let prevChar = null
for (const char of input) {
  updateRoom(x, y, char, prevChar)
  switch (char) {
    case '(': {
      splits.push({ x, y })
      break
    }
    case ')': {
      const lastSplit = splits.pop()
      x = lastSplit.x
      y = lastSplit.y
      break
    }
    case '|': {
      const lastSplit = splits[splits.length - 1]
      x = lastSplit.x
      y = lastSplit.y
      break
    }
    case 'N': {
      y++
      break
    }
    case 'W': {
      x--
      break
    }
    case 'E': {
      x++
      break
    }
    case 'S': {
      y--
      break
    }
  }
}

updateRoom(x, y, null, prevChar)

const calculateShortestPath = (x, y, path) => {
  const key = `${x}_${y}`
  const room = rooms.get(key)

  if (path.includes(key)) {
    return
  }
  path.push(key)

  if (room.shortestPath > path.length - 1) {
    room.shortestPath = path.length - 1
  }

  if (room.north === true) {
    calculateShortestPath(x, y + 1, [...path])
  }
  if (room.south === true) {
    calculateShortestPath(x, y - 1, [...path])
  }
  if (room.west === true) {
    calculateShortestPath(x - 1, y, [...path])
  }
  if (room.east === true) {
    calculateShortestPath(x + 1, y, [...path])
  }
}

calculateShortestPath(0, 0, [])

const result = Math.max(...rooms.values().map((room) => room.shortestPath))
console.log(result)
