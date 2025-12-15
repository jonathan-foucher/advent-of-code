import { readFile } from '../../utils/file-utils.js'
import { cramer } from '../../utils/solver-cramer-utils.js'

const FILE_NAME = 'input/input.txt'

const TOKEN_PRICE_A = 3
const TOKEN_PRICE_B = 1
const NUMBER_REGEX = /(\d+)/g

const file = readFile(FILE_NAME)

const games = []
let game = { x: [], y: [] }
for (let i = 0; i <= file.length; i++) {
  const gameLine = i % 4
  let numbers = []
  switch (gameLine) {
    case 0:
      numbers = file[i].match(NUMBER_REGEX)
      game.x.push(parseInt(numbers[0]))
      game.y.push(parseInt(numbers[1]))
      break
    case 1:
      numbers = file[i].match(NUMBER_REGEX)
      game.x.push(parseInt(numbers[0]))
      game.y.push(parseInt(numbers[1]))
      break
    case 2:
      numbers = file[i].match(NUMBER_REGEX)
      game.p = [parseInt(numbers[0]), parseInt(numbers[1])]
      break
    case 3:
      games.push(game)
      game = { x: [], y: [] }
      break
  }
}

let result = 0
for (const game of games) {
  const [a, b] = cramer([game.x, game.y], game.p)

  if ((a > 0 || b > 0) && Number.isInteger(a) && Number.isInteger(b)) {
    result += TOKEN_PRICE_A * a + TOKEN_PRICE_B * b
  }
}

console.log(result)
