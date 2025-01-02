import { readFile } from '../../utils/javascript/file-utils'

const FILE_NAME = 'input/input.txt'

const TARGET = parseInt(readFile(FILE_NAME)[0])

let max = 0
let n = 0
while(max < TARGET) {
  n++
  let res = 10
  for (let i = 2; i <= n; i++) {
    if (n % i === 0) {
      res += 10 * i
    }
  }
  if (res > max) {
    max = res
  }
}

console.log(n)
