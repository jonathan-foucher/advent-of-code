import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const lines = readFile(FILE_NAME).map((line) => line.split(''))

const DIRECTIONS = {
  LEFT: [-1, 0],
  RIGHT: [1, 0],
  UP: [0, -1],
  DOWN: [0, 1],
}

const DIRECTIONS_ROTATION = ['LEFT', 'UP', 'RIGHT', 'DOWN']

const carts = []
const MAP = []
for (let y = 0; y < lines.length; y++) {
  MAP.push([])
  for (let x = 0; x < lines[0].length; x++) {
    const char = lines[y][x]

    let direction = null
    const directions = []
    switch (char) {
      case 'v':
        direction = 'DOWN'
        directions.push('UP')
        directions.push('DOWN')
        break
      case '^':
        direction = 'UP'
        directions.push('UP')
        directions.push('DOWN')
        break
      case '>':
        direction = 'RIGHT'
        directions.push('LEFT')
        directions.push('RIGHT')
        break
      case '<':
        direction = 'LEFT'
        directions.push('LEFT')
        directions.push('RIGHT')
        break
      case '|':
        directions.push('UP')
        directions.push('DOWN')
        break
      case '-':
        directions.push('LEFT')
        directions.push('RIGHT')
        break
      case '+':
        directions.push('LEFT')
        directions.push('RIGHT')
        directions.push('UP')
        directions.push('DOWN')
        break
      case '/':
        if (y !== 0 && ![' ', '-'].includes(lines[y - 1][x])) {
          directions.push('UP')
          directions.push('LEFT')
        } else {
          directions.push('DOWN')
          directions.push('RIGHT')
        }
        break
      case '\\':
        if (y !== 0 && ![' ', '-'].includes(lines[y - 1][x])) {
          directions.push('UP')
          directions.push('RIGHT')
        } else {
          directions.push('DOWN')
          directions.push('LEFT')
        }
        break
    }

    if (direction !== null) {
      carts.push({
        direction,
        turns: -1,
        x,
        y,
      })
    }

    MAP[y].push({
      x,
      y,
      directions,
    })
  }
}

let result
mainloop: while (true) {
  carts.sort((a, b) => {
    if (a.y === b.y) {
      return a.x - b.x
    }
    return a.y - b.y
  })

  for (const cart of carts) {
    const rail = MAP[cart.y][cart.x]
    if (rail.directions.length === 2) {
      const oppositeDirection =
        DIRECTIONS_ROTATION[(DIRECTIONS_ROTATION.findIndex((direction) => direction === cart.direction) + 2) % 4]
      cart.direction = rail.directions.filter((direction) => direction !== oppositeDirection)[0]
    } else if (rail.directions.length === 4) {
      cart.direction =
        DIRECTIONS_ROTATION[
          (DIRECTIONS_ROTATION.findIndex((direction) => direction === cart.direction) + cart.turns + 4) % 4
        ]
      cart.turns = ((cart.turns + 2) % 3) - 1
    }

    cart.x += DIRECTIONS[cart.direction][0]
    cart.y += DIRECTIONS[cart.direction][1]
    if (carts.filter((c) => c.x === cart.x && c.y === cart.y).length > 1) {
      result = `${cart.x},${cart.y}`
      break mainloop
    }
  }
}

console.log(result)
