import { readFile } from './file-utils'

const FILE_NAME = 'input/input.txt'

const temp = []
readFile(FILE_NAME)[0].split('')
  .map((e, i) => {
    for (let j = 0; j < parseInt(e); j++) {
      if (i % 2 === 0) {
        temp.push(i / 2)
      } else {
        temp.push('.')
      }
    }
  })

const updatedIndexes = []

for (let i = temp.length - 1; i > 0; i--) {
  if (temp[i] !== '.' && !updatedIndexes.includes(i)) {
    const id = temp[i]

    let fileSize = 1
    while(temp[i - 1] === id) {
      fileSize++
      i--
    }

    let f = temp.findIndex(e => e === '.')
    let freeSpaceSize = 0
    do {
      freeSpaceSize++
    } while(temp[f + freeSpaceSize] === '.')

    let end = false
    do {
      if (fileSize <= freeSpaceSize && f < i) {
        for (let x = 0; x < fileSize; x++) {
          updatedIndexes.push(f + x)
          temp[i + x] = '.'
          temp[f + x] = id
        }
        end = true
      } else {
        f +=  freeSpaceSize
        do {
          f++
        } while(f < i && temp[f] !== '.')
        if (temp[f] === '.') {
          freeSpaceSize = 0
          do {
            freeSpaceSize++
          } while(temp[f + freeSpaceSize] === '.')
        } else {
          freeSpaceSize = 0
        }
      }
    } while (f < i && !end)
  } else if (updatedIndexes.includes(i)) {
    const id = temp[i]
    while (temp[i - 1] === id) {
      i--
    }
  }
}

let result = 0
let j = temp.length
for (let i = 0; i < j; i++) {
  if (temp[i] !== '.') {
    result += temp[i] * i
  }
}

console.log(result)
