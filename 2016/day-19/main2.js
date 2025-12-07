import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const NUMBER_OF_ELVES = parseInt(readFile(FILE_NAME)[0])

let elves = []
for (let i = 1; i <= NUMBER_OF_ELVES; i++) {
  elves.push(i)
}

let i = 0
while (elves.length > 1) {
  const indexToRemove = (i + Math.floor(elves.length / 2)) % elves.length
  elves.splice(indexToRemove, 1)
  if (indexToRemove > i) {
    i++
  }
  if (i >= elves.length) {
    i = 0
  }
}

console.log(elves[0])
