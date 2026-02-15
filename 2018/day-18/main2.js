import { readFile } from '../../utils/file-utils.js'

const IS_EXAMPLE = false
const FILE_NAME = IS_EXAMPLE ? 'input/example.txt' : 'input/input.txt'
const SIZE = IS_EXAMPLE ? 10 : 50

const NUMBER_OF_MINUTES = 1000000000

const SURROUNDING_POSITIONS = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
]

let map = readFile(FILE_NAME).map((line) => {
  return line.split('')
})

const cache = new Map()

for (let i = 0; i < NUMBER_OF_MINUTES; i++) {
  const key = map.map((row) => row.join('')).join('')
  const cachedValue = cache.get(key)
  if (cachedValue) {
    map = cachedValue.map
    i += (i - cachedValue.step) * Math.trunc((NUMBER_OF_MINUTES - i + 1) / (i - cachedValue.step))
    continue
  }

  const newMap = []
  for (let y = 0; y < SIZE; y++) {
    newMap.push([])

    for (let x = 0; x < SIZE; x++) {
      let woodedCount = 0
      let lumberyardCount = 0
      for (const position of SURROUNDING_POSITIONS) {
        if (y + position[0] >= 0 && y + position[0] < SIZE) {
          switch (map[y + position[0]][x + position[1]]) {
            case '#':
              lumberyardCount++
              break
            case '|':
              woodedCount++
              break
          }
        }
      }

      let newValue
      switch (map[y][x]) {
        case '.':
          newValue = woodedCount >= 3 ? '|' : '.'
          break
        case '|':
          newValue = lumberyardCount >= 3 ? '#' : '|'
          break
        case '#':
          newValue = lumberyardCount >= 1 && woodedCount >= 1 ? '#' : '.'
          break
      }

      newMap[y].push(newValue)
    }
  }
  map = newMap
  cache.set(key, { step: i, map })
}

let woodedCount = 0
let lumberyardCount = 0
for (let y = 0; y < SIZE; y++) {
  for (let x = 0; x < SIZE; x++) {
    switch (map[y][x]) {
      case '#':
        lumberyardCount++
        break
      case '|':
        woodedCount++
        break
    }
  }
}

const result = lumberyardCount * woodedCount
console.log(result)
