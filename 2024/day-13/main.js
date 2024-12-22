import { readFile } from '../../utils/javascript/file-utils'

const FILE_NAME = 'input/input.txt'

const TOKEN_PRICE_A = 1
const TOKEN_PRICE_B = 3
const NUMBER_REGEX = /(\d+)/g

const file = readFile(FILE_NAME)

const games = []
let currentGame = {}
for (let i = 0; i < file.length; i++) {
  const gameLine = i%4
  let numbers = []
  switch (gameLine) {
    case 0:
      numbers = file[i].match(NUMBER_REGEX)
      currentGame.ax = parseInt(numbers[0])
      currentGame.ay = parseInt(numbers[1])
      break;
    case 1:
      numbers = file[i].match(NUMBER_REGEX)
      currentGame.bx = parseInt(numbers[0])
      currentGame.by = parseInt(numbers[1])
      break;
    case 2:
      numbers = file[i].match(NUMBER_REGEX)
      currentGame.px = parseInt(numbers[0])
      currentGame.py = parseInt(numbers[1])
      break;
    case 3:
    games.push(currentGame)
    currentGame = {}
      break;
  }
}

let result = 0
games.forEach(game => {
  const detAB = game.ax * game.by - game.ay * game.bx
  const detAP = game.ax * game.py - game.ay * game.px
  const detBP = game.px * game.by - game.py * game.bx

  if (detAP % detAB === 0 && detBP % detAB === 0) {
    const a = detAP / detAB
    const b = detBP / detAB
    if (a > 0 && b > 0) {
      result += TOKEN_PRICE_A * a + TOKEN_PRICE_B * b
    }
  }
})

console.log(result)
