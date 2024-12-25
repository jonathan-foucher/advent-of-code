import { readFile } from '../../utils/javascript/file-utils'

const FILE_NAME = 'input/input.txt' 

const lines = readFile(FILE_NAME)

const WIDTH = lines[0].length
let HEIGHT = 0
while (lines[HEIGHT] !== '') {
  HEIGHT++
}

let counters = []
for (let i = 0; i < WIDTH; i++) {
  counters.push(-1)
}

const keys = []
const locks = []

let isKey = null
for (let i = 0; i <= lines.length; i++) {
  const line = lines[i]
  
  if (line === '' || i === lines.length) {
    if (isKey) {
      keys.push(counters)
    } else {
      locks.push(counters)
    }

    isKey = null
    counters = []
    for (let i = 0; i < WIDTH; i++) {
      counters.push(-1)
    }

    continue
  }
  
  if (isKey === null) {
    isKey = line.split('').some(char => char !== '#')
  }

  for (let j = 0; j < WIDTH; j++) {
    if (line[j] === '#') {
      counters[j]++
    }
  }
}

let result = 0
for (let i = 0; i < locks.length; i++) {
  const lock = locks[i]
  for (let j = 0; j < keys.length; j++) {
    const key = keys[j]
    counters = []
    let k = 0
    while (k < WIDTH && lock[k] + key[k] < HEIGHT - 1) {
      k++
    }
    if (k === WIDTH) {
      result++
    }
  }
}

console.log(result)
