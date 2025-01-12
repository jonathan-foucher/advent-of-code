import { readFile } from '../../utils/javascript/file-utils'

const FILE_NAME = 'input/input.txt'

const NUMBER_OF_ELVES = parseInt(readFile(FILE_NAME)[0])

let elves = []
for (let i = 1; i <= NUMBER_OF_ELVES; i++) {
  elves.push(i)
}

while (elves.length > 1) {
  let temp = []
  for (let i = 0; i < elves.length; i++) {
    if (i % 2 === 0) {
      temp.push(elves[i])
    }
  }
  if (elves.length > 1 && elves.length % 2 === 1) {
    temp = temp.slice(1, temp.length)
  }
  elves = temp
}

console.log(elves[0])
