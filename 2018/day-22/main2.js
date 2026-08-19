import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const LINES = readFile(FILE_NAME)
const DEPTH = Number.parseInt(/^depth: (?<depth>\d+)$/.exec(LINES[0]).groups.depth)
const X_TARGET = Number.parseInt(/^target: (?<x>\d+),\d+$/.exec(LINES[1]).groups.x)
const Y_TARGET = Number.parseInt(/^target: \d+,(?<y>\d+)$/.exec(LINES[1]).groups.y)
const TOOL_TIME = 7
const MAX_X = X_TARGET + 20
const MAX_Y = Y_TARGET + 20

const DIRECTIONS = [
  { deltaX: 1, deltaY: 0 },
  { deltaX: 0, deltaY: 1 },
  { deltaX: -1, deltaY: 0 },
  { deltaX: 0, deltaY: -1 },
]

const regions = new Map()

for (let x = 0; x <= MAX_X; x++) {
  for (let y = 0; y <= MAX_Y; y++) {
    const key = `${x}-${y}`

    let geologicIndex = null
    if (x === 0) {
      geologicIndex = y * 48271
    } else if (y === 0) {
      geologicIndex = x * 16807
    } else if (x === X_TARGET && y === Y_TARGET) {
      geologicIndex = 0
    } else {
      geologicIndex = regions.get(`${x - 1}-${y}`) * regions.get(`${x}-${y - 1}`)
    }

    const erosionLevel = (geologicIndex + DEPTH) % 20183
    regions.set(key, erosionLevel)
  }
}

for (const [key, value] of regions.entries()) {
  regions.set(key, value % 3)
}

let result = X_TARGET + Y_TARGET
let isTorch = true
let isClimbingGear = false

for (let x = 1; x <= X_TARGET; x++) {
  const key = `${x - 1}-0`
  const erosionLevel = regions.get(key)
  const nextKey = `${x}-0`
  const nextErosionLevel = regions.get(nextKey)

  if (erosionLevel !== nextErosionLevel) {
    if (nextErosionLevel === 0 && isTorch === false && isClimbingGear === false) {
      result += TOOL_TIME

      if (erosionLevel === 1) {
        isTorch = false
        isClimbingGear = true
      } else {
        isTorch = true
        isClimbingGear = false
      }
    } else if (nextErosionLevel === 1 && isTorch === true) {
      result += TOOL_TIME

      if (erosionLevel === 0) {
        isTorch = false
        isClimbingGear = true
      } else {
        isTorch = false
        isClimbingGear = false
      }
    } else if (nextErosionLevel === 2 && isClimbingGear === true) {
      result += TOOL_TIME

      if (erosionLevel === 0) {
        isTorch = true
        isClimbingGear = false
      } else {
        isTorch = false
        isClimbingGear = false
      }
    }
  }
}

for (let y = 1; y <= Y_TARGET; y++) {
  const key = `0-${y - 1}`
  const erosionLevel = regions.get(key)
  const nextKey = `0-${y}`
  const nextErosionLevel = regions.get(nextKey)

  if (erosionLevel !== nextErosionLevel) {
    if (nextErosionLevel === 0 && isTorch === false && isClimbingGear === false) {
      result += TOOL_TIME

      if (erosionLevel === 1) {
        isTorch = false
        isClimbingGear = true
      } else {
        isTorch = true
        isClimbingGear = false
      }
    } else if (nextErosionLevel === 1 && isTorch === true) {
      result += TOOL_TIME

      if (erosionLevel === 0) {
        isTorch = false
        isClimbingGear = true
      } else {
        isTorch = false
        isClimbingGear = false
      }
    } else if (nextErosionLevel === 2 && isClimbingGear === true) {
      result += TOOL_TIME

      if (erosionLevel === 0) {
        isTorch = true
        isClimbingGear = false
      } else {
        isTorch = false
        isClimbingGear = false
      }
    }
  }
}

if (!isTorch) {
  result += TOOL_TIME
}

const bestTimes = new Map()

const getShortestPath = (x, y, time, isTorch, isClimbingGear) => {
  if (time + Math.abs(X_TARGET - x) + Math.abs(Y_TARGET - y) + TOOL_TIME * !isTorch >= result) {
    return
  }

  if (x === X_TARGET && y === Y_TARGET) {
    if (isTorch === false) {
      time += TOOL_TIME
    }
    if (time < result) {
      result = time
    }
    return
  }

  const key = `${x}-${y}`
  const timeKey = `${key}-${isTorch + 2 * isClimbingGear}`
  const bestTime = bestTimes.get(timeKey)
  if (bestTime === undefined) {
    bestTimes.set(timeKey, time)
  } else {
    if (time >= bestTime) {
      return
    }
    bestTimes.set(timeKey, time)
  }

  const erosionLevel = regions.get(key)
  for (const direction of DIRECTIONS) {
    const nextX = x + direction.deltaX
    const nextY = y + direction.deltaY
    if (nextX > MAX_X || nextY > MAX_Y || nextX < 0 || nextY < 0) {
      continue
    }

    const nextKey = `${nextX}-${nextY}`
    const nextErosionLevel = regions.get(nextKey)

    let nextTime = time + 1
    let nextIsTorch = isTorch
    let nextIsClimbingGear = isClimbingGear
    if (erosionLevel !== nextErosionLevel) {
      if (nextErosionLevel === 0 && isTorch === false && isClimbingGear === false) {
        nextTime += TOOL_TIME

        if (erosionLevel === 1) {
          nextIsTorch = false
          nextIsClimbingGear = true
        } else {
          nextIsTorch = true
          nextIsClimbingGear = false
        }
      } else if (nextErosionLevel === 1 && isTorch === true) {
        nextTime += TOOL_TIME

        if (erosionLevel === 0) {
          nextIsTorch = false
          nextIsClimbingGear = true
        } else {
          nextIsTorch = false
          nextIsClimbingGear = false
        }
      } else if (nextErosionLevel === 2 && isClimbingGear === true) {
        nextTime += TOOL_TIME

        if (erosionLevel === 0) {
          nextIsTorch = true
          nextIsClimbingGear = false
        } else {
          nextIsTorch = false
          nextIsClimbingGear = false
        }
      }
    }

    getShortestPath(nextX, nextY, nextTime, nextIsTorch, nextIsClimbingGear)
  }
}

getShortestPath(0, 0, 0, true, false)

console.log(result)
