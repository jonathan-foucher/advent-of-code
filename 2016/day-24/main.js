import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const DIRECTIONS = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
]
const TARGETS = []
const START_TARGET = 0

const POSITIONS = new Map()

readFile(FILE_NAME).forEach((line, y) => {
  line.split('').forEach((char, x) => {
    const isNumber = !isNaN(char)
    const key = `${x}-${y}`

    POSITIONS.set(key, {
      x,
      y,
      key,
      char: isNumber ? parseInt(char) : char,
      isWall: char === '#',
      isTarget: isNumber,
    })

    if (isNumber) {
      TARGETS.push({
        key,
        value: isNumber ? parseInt(char) : char,
      })
    }
  })
})

TARGETS.sort((a, b) => a.value - b.value)

const getMinimumSteps = (target, position, visitedPositions, bestResults, steps) => {
  const bestResult = bestResults.get(position.key)
  if (bestResult !== undefined && bestResult <= steps) {
    return Infinity
  }
  bestResults.set(position.key, steps)

  if (visitedPositions.includes(position.key)) {
    return Infinity
  }
  visitedPositions.push(position.key)

  if (position.char === target) {
    return steps
  }

  if (position.char === target) {
    return steps
  }

  const results = [Infinity]
  for (const direction of DIRECTIONS) {
    const newX = position.x + direction[0]
    const newY = position.y + direction[1]
    const newPosition = POSITIONS.get(`${newX}-${newY}`)

    if (!newPosition.isWall) {
      results.push(getMinimumSteps(target, newPosition, [...visitedPositions], bestResults, steps + 1))
    }
  }

  return Math.min(...results)
}

const STEP_RESULTS = []
for (let i = 0; i < TARGETS.length - 1; i++) {
  const startPosition = POSITIONS.get(TARGETS[i].key)
  const startTarget = TARGETS[i].value

  for (let j = i + 1; j < TARGETS.length; j++) {
    const target = TARGETS[j].value
    const result = getMinimumSteps(target, startPosition, [], new Map(), 0)
    STEP_RESULTS.push({
      targets: [startTarget, target],
      steps: result,
    })
  }
}

const getMinimumTotalSteps = (currentTarget, visitedTargets, steps) => {
  if (visitedTargets.length === TARGETS.length) {
    return steps
  }

  const results = [Infinity]
  for (const stepResult of STEP_RESULTS) {
    if (!stepResult.targets.includes(currentTarget)) {
      continue
    }

    const nextTarget = stepResult.targets.find((target) => target != currentTarget)
    if (visitedTargets.includes(nextTarget)) {
      continue
    }

    results.push(getMinimumTotalSteps(nextTarget, [...visitedTargets, nextTarget], steps + stepResult.steps))
  }

  return Math.min(...results)
}

const result = getMinimumTotalSteps(START_TARGET, [START_TARGET], 0)

console.log(result)
