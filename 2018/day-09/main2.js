import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'
const MODULO = 23
const REMOVED_OFFSET = 7

const line = readFile(FILE_NAME)[0]
const regexResult = /^(?<numberOfPlayers>\d+) players; last marble is worth (?<lastMarble>\d+) points$/.exec(line)
const NUMBER_OF_PLAYERS = parseInt(regexResult.groups['numberOfPlayers'])
const LAST_MARBLE = parseInt(regexResult.groups['lastMarble']) * 100

let scores = []
for (let _ = 0; _ < NUMBER_OF_PLAYERS; _++) {
  scores.push(0)
}

let marble = { id: 0 }
marble.next = marble
marble.previous = marble
for (let id = 1; id <= LAST_MARBLE; id++) {
  if (id % MODULO !== 0) {
    marble = marble.next
    let next = marble.next

    let newMarble = {
      id,
      next,
      previous: marble,
    }
    marble.next = newMarble
    next.previous = newMarble

    marble = marble.next
  } else {
    scores[(id - 1 + NUMBER_OF_PLAYERS) % NUMBER_OF_PLAYERS] += id
    for (let _ = 0; _ < REMOVED_OFFSET; _++) {
      marble = marble.previous
    }
    scores[(id - 1 + NUMBER_OF_PLAYERS) % NUMBER_OF_PLAYERS] += marble.id
    let previous = marble.previous
    let next = marble.next

    previous.next = next
    next.previous = previous

    marble = next
  }
}

const result = Math.max(...scores)
console.log(result)
