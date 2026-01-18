import { readFile } from '../../utils/file-utils'

const FILE_NAME = 'input/input.txt'
const REGEX_EXTRACT = /^\/dev\/grid\/node-x(\d+)-y(\d+) +(\d+)T +(\d+)T +(\d+)T +(\d+)%$/

const nodes = readFile(FILE_NAME)
  .map((line) => {
    const match = line.match(REGEX_EXTRACT)
    if (!match) {
      return
    }
    return {
      x: parseInt(match[1]),
      y: parseInt(match[2]),
      size: parseInt(match[3]),
      used: parseInt(match[4]),
      available: parseInt(match[5]),
      percentUsed: parseInt(match[6]),
    }
  })
  .filter((e) => e)

let result = 0
for (let i = 0; i < nodes.length; i++) {
  const nodeA = nodes[i]
  for (let j = 0; j < nodes.length; j++) {
    if (i !== j) {
      const nodeB = nodes[j]
      if (nodeA.used !== 0 && nodeA.used <= nodeB.available) {
        result++
      }
    }
  }
}

console.log(result)
