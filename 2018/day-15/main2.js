import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const lines = readFile(FILE_NAME)

let bonus = 1
let units = null
let round = null
mainloop: while (true) {
  const elvesAttackPower = 3 + bonus
  const MAP = []
  units = []
  for (let y = 0; y < lines.length; y++) {
    MAP.push([])
    for (let x = 0; x < lines[0].length; x++) {
      const char = lines[y][x]
      let unit = null
      if (['E', 'G'].includes(char)) {
        unit = {
          isElf: char === 'E',
          hp: 200,
          x,
          y,
        }
        units.push(unit)
      }

      MAP[y].push({
        isWall: char === '#',
        unit,
        x,
        y,
      })
    }
  }

  const getPossibilities = (
    x,
    y,
    isElf,
    steps = 0,
    path = [],
    best = { leastSteps: Infinity },
    bestSteps = new Map()
  ) => {
    const key = `${x}-${y}`
    const cache = bestSteps.get(key) ?? Infinity
    if (steps > best.leastSteps || steps >= cache || path.includes(key)) {
      return []
    }

    bestSteps.set(key, steps)
    path.push(key)

    const targets = []
    const possibilities = []
    if (MAP[y - 1] && MAP[y - 1][x]) {
      const possibility = MAP[y - 1][x]

      if (possibility.unit !== null && possibility.unit.isElf !== isElf) {
        targets.push(possibility.unit)
      } else if (!possibility.isWall && possibility.unit === null) {
        possibilities.push(possibility)
      }
    }

    if (MAP[y][x - 1]) {
      const possibility = MAP[y][x - 1]

      if (possibility.unit !== null && possibility.unit.isElf !== isElf) {
        targets.push(possibility.unit)
      } else if (!possibility.isWall && possibility.unit === null) {
        possibilities.push(possibility)
      }
    }

    if (MAP[y][x + 1]) {
      const possibility = MAP[y][x + 1]

      if (possibility.unit !== null && possibility.unit.isElf !== isElf) {
        targets.push(possibility.unit)
      } else if (!possibility.isWall && possibility.unit === null) {
        possibilities.push(possibility)
      }
    }

    if (MAP[y + 1] && MAP[y + 1][x]) {
      const possibility = MAP[y + 1][x]

      if (possibility.unit !== null && possibility.unit.isElf !== isElf) {
        targets.push(possibility.unit)
      } else if (!possibility.isWall && possibility.unit === null) {
        possibilities.push(possibility)
      }
    }

    if (targets.length > 0) {
      targets.sort((a, b) => {
        if (a.hp === b.hp) {
          if (a.y === b.y) {
            return a.x - b.x
          }
          return a.y - b.y
        }
        return a.hp - b.hp
      })

      if (best.leastSteps > steps) {
        best.leastSteps = steps
      }
      return [{ steps, target: targets[0], path, x, y }]
    }

    if (possibilities.length === 0) {
      return []
    }

    let bestTargets = []
    for (const possibility of possibilities) {
      bestTargets = bestTargets.concat(
        getPossibilities(possibility.x, possibility.y, isElf, steps + 1, [...path], best, bestSteps)
      )
    }

    return bestTargets
  }

  round = 0
  roundsloop: while (true) {
    units.sort((a, b) => {
      if (a.y === b.y) {
        return a.x - b.x
      }
      return a.y - b.y
    })

    const currentUnits = units.filter((unit) => unit.hp > 0)
    for (let i = 0; i < currentUnits.length; i++) {
      const unit = currentUnits[i]
      if (unit.hp <= 0) {
        continue
      }

      let possibilities = getPossibilities(unit.x, unit.y, unit.isElf)
      if (possibilities.length === 0) {
        continue
      }
      const minSteps = Math.min(...possibilities.map((possibility) => possibility.steps))
      possibilities = possibilities.filter((possibility) => possibility.steps === minSteps)
      possibilities.sort((a, b) => {
        if (a.y === b.y) {
          return a.x - b.x
        }
        return a.y - b.y
      })
      const selectedPossibility = possibilities[0]

      if (selectedPossibility.path.length > 1) {
        MAP[unit.y][unit.x].unit = null
        const [newX, newY] = selectedPossibility.path[1].split('-').map((char) => parseInt(char))
        unit.x = newX
        unit.y = newY
        MAP[newY][newX].unit = unit
      }

      const target = selectedPossibility.target
      if (Math.abs(target.x - unit.x) + Math.abs(target.y - unit.y) === 1) {
        target.hp -= unit.isElf ? elvesAttackPower : 3
        if (target.hp <= 0) {
          MAP[target.y][target.x].unit = null
        }
      }

      if (
        currentUnits.every((unit) => unit.hp <= 0 || unit.isElf)
        || currentUnits.every((unit) => unit.hp <= 0 || !unit.isElf)
      ) {
        if (i === currentUnits.length - 1) {
          round++
        }
        break roundsloop
      }
    }
    round++
  }

  if (units.some((unit) => unit.isElf && unit.hp <= 0)) {
    bonus++
  } else {
    break mainloop
  }
}

const result = round * units.reduce((acc, val) => acc + (val.hp > 0 ? val.hp : 0), 0)
console.log(result)
