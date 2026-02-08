import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const claims = readFile(FILE_NAME).map((line) => {
  const regexResult = /#(?<id>\d+) @ (?<x>\d+),(?<y>\d+): (?<width>\d+)x(?<height>\d+)/.exec(line)
  return {
    id: parseInt(regexResult.groups['id']),
    x: parseInt(regexResult.groups['x']),
    y: parseInt(regexResult.groups['y']),
    width: parseInt(regexResult.groups['width']),
    height: parseInt(regexResult.groups['height']),
  }
})

const counts = {}
for (const claim of claims) {
  for (let i = 0; i < claim.width; i++) {
    for (let j = 0; j < claim.height; j++) {
      const x = claim.x + i
      const y = claim.y + j
      const key = `${x}-${y}`
      counts[key] = (counts[key] ?? 0) + 1
    }
  }
}

let result = null
mainloop: for (const claim of claims) {
  for (let i = 0; i < claim.width; i++) {
    for (let j = 0; j < claim.height; j++) {
      const x = claim.x + i
      const y = claim.y + j
      const key = `${x}-${y}`
      if (counts[key] > 1) {
        continue mainloop
      }
    }
  }
  result = claim.id
  break
}

console.log(result)
