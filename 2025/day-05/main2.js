import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

let ranges = readFile(FILE_NAME)
  .map((line) => {
    if (line.includes('-')) {
      return [parseInt(line.split('-')[0]), parseInt(line.split('-')[1])]
    }
    return null
  })
  .filter((range) => range)
  .sort((a, b) => a[0] - b[0])

let mergedRanges = []

for (let i = 0; i < ranges.length; i++) {
  const r0 = ranges[i][0]
  let r1 = ranges[i][1]

  while (ranges[i + 1] && r1 + 1 >= ranges[i + 1][0]) {
    i++
    r1 = Math.max(r1, ranges[i][1])
  }
  mergedRanges.push([r0, r1])
}

let result = 0

for (let i = 0; i < mergedRanges.length; i++) {
  result += mergedRanges[i][1] - mergedRanges[i][0] + 1
}

console.log(result)
