import { readFile } from '../../utils/javascript/file-utils'

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

let results = []
let j = temp.length
for (let i = 0; i < j; i++) {
  if (temp[i] !== '.') {
    results.push(temp[i])
  } else {
    while (temp[j - 1] === '.') {
      j--
    }
    results.push(temp[j - 1])
    j--
  }
}

let result = 0
j = results.length
for (let i = 0; i < j; i++) {
  result += results[i] * i
}

console.log(result)
