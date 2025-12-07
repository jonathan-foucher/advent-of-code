import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const discs = readFile(FILE_NAME).map((line) => {
  const matches = [...line.match(/Disc #(\d+) has (\d+) positions; at time=0, it is at position (\d+)./)]
  return { id: parseInt(matches[1]), nPositions: parseInt(matches[2]), startPosition: parseInt(matches[3]) }
})

let i = -1,
  hasPassed = false
while (!hasPassed) {
  i++
  hasPassed = true
  for (const disc of discs) {
    if ((disc.startPosition + disc.id + i) % disc.nPositions === 0) {
      continue
    }
    hasPassed = false
    break
  }
}

console.log(i)
