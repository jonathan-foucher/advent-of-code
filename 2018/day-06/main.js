import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const coordinates = readFile(FILE_NAME).map((line) => {
  const [x, y] = line.split(', ').map((str) => parseInt(str))
  return { x, y }
})

let minX = Infinity
let minY = Infinity
let maxX = 0
let maxY = 0
for (const coordinate of coordinates) {
  if (coordinate.x < minX) {
    minX = coordinate.x
  }

  if (coordinate.y < minY) {
    minY = coordinate.y
  }

  if (coordinate.x > maxX) {
    maxX = coordinate.x
  }

  if (coordinate.y > maxY) {
    maxY = coordinate.y
  }
}

const counts = []
for (let _ = 0; _ < coordinates.length; _++) {
  counts.push(0)
}

for (let x = minX - 2; x <= maxX + 2; x++) {
  for (let y = minY - 2; y <= maxY + 2; y++) {
    const distances = []
    for (const coordinate of coordinates) {
      const distance = Math.abs(x - coordinate.x) + Math.abs(y - coordinate.y)
      distances.push(distance)
    }

    const minDistance = Math.min(...distances)
    if (distances.filter((distance) => distance === minDistance).length > 1) {
      continue
    }

    const index = distances.findIndex((distance) => distance === minDistance)
    counts[index]++
  }
}

const countsIncreasedArea = []
for (let _ = 0; _ < coordinates.length; _++) {
  countsIncreasedArea.push(0)
}

for (let x = minX - 1; x <= maxX + 1; x++) {
  for (let y = minY - 1; y <= maxY + 1; y++) {
    const distances = []
    for (const coordinate of coordinates) {
      const distance = Math.abs(x - coordinate.x) + Math.abs(y - coordinate.y)
      distances.push(distance)
    }

    const minDistance = Math.min(...distances)
    if (distances.filter((distance) => distance === minDistance).length > 1) {
      continue
    }

    const index = distances.findIndex((distance) => distance === minDistance)
    countsIncreasedArea[index]++
  }
}

let result = 0
for (let i = 0; i < counts.length; i++) {
  if (counts[i] === countsIncreasedArea[i] && result < counts[i]) {
    result = counts[i]
  }
}

console.log(result)
