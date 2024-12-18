import { readFile } from './file-utils'

const FILE_NAME = 'input/input.txt'

const lines = readFile(FILE_NAME)

let program = []

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('Program')) {
    program = lines[i].split(': ')[1].split(',').map(number => parseInt(number))
  }
}

let pw = program.length - 1
let aValue = 0
let countArray = []

for (let i = 0; i <= pw; i++) {
  countArray.push(0)
}

while (pw >= 0) {
  let found = false
  while (!found) {
    let a = aValue
    let b
    let c
    let i = 0
    do {
      b = ((a % 8) + 8) % 8
      b = b ^ 5
      c = Math.trunc(a / Math.pow(2, b))
      b = b ^ 6
      a = Math.trunc(a / 8)
      b = b ^ c
      i++
    } while (i <= pw && a !== 0)

    if (i === pw + 1 && (((b % 8) + 8) % 8) === program[pw]) {
      found = true
      pw--
    } else {
      while (countArray[pw] === 7) {
        aValue -= 7 * Math.pow(8, pw)
        countArray[pw] = 0
        pw++
      }
      countArray[pw]++
      aValue += Math.pow(8, pw)
    }
  }
}

let res = []
let a = aValue
let b
let c
while (a !== 0) {
  b = ((a % 8) + 8) % 8
  b = b ^ 5
  c = Math.trunc(a / Math.pow(2, b))
  b = b ^ 6
  a = Math.trunc(a / 8)
  b = b ^ c
  res.push(((b % 8) + 8) % 8)
}

console.log(program.join(','))
console.log(res.join(','))
console.log(res.join(',') === program.join(','))
console.log(aValue)
