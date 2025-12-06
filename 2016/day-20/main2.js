import { readFile } from '../../utils/javascript/file-utils'

const FILE_NAME = 'input/input.txt'

let ranges = readFile(FILE_NAME)
  .map((line) => line.split('-').map((n) => parseInt(n)))
  .sort((a, b) => {
    if (a[0] > b[0] || (a[0] === b[0] && a[1] > b[1])) {
      return 1
    }
    return -1
  })

for (let i = 0; i < ranges.length - 1; i++) {
  const range = ranges[i]
  const nextRange = ranges[i + 1]
  if (range[1] + 1 >= nextRange[0]) {
    range[1] = Math.max(range[1], nextRange[1])
    ranges.splice(i + 1, 1)
    i--
  }
}

const MAX_IP = 2 ** 32
let result = 0
for (let i = 0; i < ranges.length - 1; i++) {
  const range = ranges[i]
  if (range[0] >= MAX_IP) {
    break
  }
  const nextRange = ranges[i + 1]
  result += nextRange[0] - range[1] - 1
}

console.log(result)
