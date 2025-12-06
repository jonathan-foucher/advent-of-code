import { readFile } from '../../utils/javascript/file-utils'

const FILE_NAME = 'input/input.txt'

const RANGES = []
const IDS = []

readFile(FILE_NAME).forEach((line) => {
  if (line.includes('-')) {
    RANGES.push([parseInt(line.split('-')[0]), parseInt(line.split('-')[1])])
  } else if (line !== '') {
    IDS.push(parseInt(line))
  }
  return line
})

let result = 0
for (let i = 0; i < IDS.length; i++) {
  const id = IDS[i]

  for (let j = 0; j < RANGES.length; j++) {
    const r0 = RANGES[j][0]
    const r1 = RANGES[j][1]
    if (id >= r0 && id <= r1) {
      result++
      break
    }
  }
}

console.log(result)
