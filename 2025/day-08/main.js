import { readFile } from '../../utils/file-utils.js'

const IS_EXAMPLE = false
const FILE_NAME = IS_EXAMPLE ? 'input/example.txt' : 'input/input.txt'
const NUMBER_OF_PAIRS = IS_EXAMPLE ? 10 : 1000

const junctionBoxes = readFile(FILE_NAME).map((line) => {
  const coordinates = line.split(',')
  return { x: parseInt(coordinates[0]), y: parseInt(coordinates[1]), z: parseInt(coordinates[2]) }
})

let distances = []

for (let i = 0; i < junctionBoxes.length - 1; i++) {
  const jb1 = junctionBoxes[i]
  for (let j = i + 1; j < junctionBoxes.length; j++) {
    const jb2 = junctionBoxes[j]
    const distance = Math.sqrt(
      Math.abs(jb1.x - jb2.x) ** 2 + Math.abs(jb1.y - jb2.y) ** 2 + Math.abs(jb1.z - jb2.z) ** 2
    )
    distances.push({ key: `${i}-${j}`, distance })
  }
}

distances = distances.sort((a, b) => a.distance - b.distance)

let circuits = []
for (let i = 0; i < junctionBoxes.length; i++) {
  circuits.push([`${i}`])
}

for (let i = 0; i < NUMBER_OF_PAIRS; i++) {
  const key = distances[i].key
  const jb1 = key.split('-')[0]
  const jb2 = key.split('-')[1]

  const circuit1Idx = circuits.findIndex((circuit) => circuit.includes(jb1))
  const circuit2Idx = circuits.findIndex((circuit) => circuit.includes(jb2))

  if (circuit1Idx === circuit2Idx) {
    continue
  }

  const circuit1 = circuits[circuit1Idx]
  const circuit2 = circuits[circuit2Idx]

  if (circuit1 && circuit2) {
    while (circuit2.length > 0) {
      circuit1.push(circuit2.pop())
    }
  }
}

circuits = circuits.sort((a, b) => b.length - a.length)

const result = circuits[0].length * circuits[1].length * circuits[2].length
console.log(result)
