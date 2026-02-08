import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'
const MODULO = 23
const REMOVED_OFFSET = 7

const line = readFile(FILE_NAME)[0]
const regexResult = /^(?<numberOfPlayers>\d+) players; last marble is worth (?<lastMarble>\d+) points$/.exec(line)
const NUMBER_OF_PLAYERS = parseInt(regexResult.groups['numberOfPlayers'])
const LAST_MARBLE = parseInt(regexResult.groups['lastMarble'])

let scores = []
for (let _ = 0; _ < NUMBER_OF_PLAYERS; _++) {
  scores.push(0)
}

const circle = [0]
let position = 0
for (let i = 1; i <= LAST_MARBLE; i++) {
  if (i % MODULO !== 0) {
    position = (position + 1) % circle.length
    circle.splice(position + 1, 0, i)
    position = (position + 1) % circle.length
  } else {
    scores[(i - 1 + NUMBER_OF_PLAYERS) % NUMBER_OF_PLAYERS] += i
    position = (position - REMOVED_OFFSET + circle.length) % circle.length
    const removedMarble = circle.splice(position, 1)[0]
    scores[(i - 1 + NUMBER_OF_PLAYERS) % NUMBER_OF_PLAYERS] += removedMarble
  }
}

const result = Math.max(...scores)
console.log(result)
