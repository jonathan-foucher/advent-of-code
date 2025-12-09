import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

let coordinates = readFile(FILE_NAME).map((line) => {
  const x = parseInt(line.split(',')[0])
  const y = parseInt(line.split(',')[1])
  return { x, y }
})

const height = Math.max(...coordinates.map((coordinate) => coordinate.y)) + 1

let lines = []
for (let i = 0; i < height; i++) {
  lines.push([])
}

for (let i = 0; i < coordinates.length; i++) {
  const current = coordinates[i]
  const next = coordinates[(i + 1) % coordinates.length]

  const minY = Math.min(current.y, next.y)
  const maxY = Math.max(current.y, next.y)
  const minX = Math.min(current.x, next.x)
  const maxX = Math.max(current.x, next.x)

  if (minX === maxX) {
    for (let j = minY + 1; j < maxY; j++) {
      lines[j].push({ min: minX, max: maxX })
    }
  } else {
    lines[minY].push({ min: minX, max: maxX })
  }
}

for (let i = 1; i < lines.length; i++) {
  const prevLine = lines[i - 1]
  const line = lines[i]

  lines[i] = line.sort((a, b) => a.min - b.min)

  const newRanges = []
  for (let j = 0; j < line.length; j++) {
    const curRange = line[j]
    const newRange = { min: curRange.min, max: curRange.max }
    while (
      j + 1 < line.length
      && prevLine.some(
        (prevRange) =>
          prevRange.min <= newRange.max + 1
          && prevRange.max >= newRange.max + 1
          && prevRange.min <= line[j + 1].min - 1
          && prevRange.max >= line[j + 1].min - 1
      )
    ) {
      newRange.max = line[j + 1].max
      j++
    }

    newRanges.push(newRange)
  }
  lines[i] = newRanges
}

let result = 0

for (let i = 0; i < coordinates.length - 1; i++) {
  const coordinate1 = coordinates[i]
  for (let j = i + 1; j < coordinates.length; j++) {
    const coordinate2 = coordinates[j]

    const minX = Math.min(coordinate1.x, coordinate2.x)
    const maxX = Math.max(coordinate1.x, coordinate2.x)
    const minY = Math.min(coordinate1.y, coordinate2.y)
    const maxY = Math.max(coordinate1.y, coordinate2.y)

    let isPerimeterActive = true

    for (let k = minX; k <= maxX; k++) {
      if (!isPerimeterActive) {
        break
      }
      if (!lines[minY].some((range) => range.max >= k && range.min <= k)) {
        isPerimeterActive = false
      }

      if (!isPerimeterActive) {
        break
      }
      if (!lines[maxY].some((range) => range.max >= k && range.min <= k)) {
        isPerimeterActive = false
      }
    }

    for (let k = minY + 1; k < maxY; k++) {
      if (!isPerimeterActive) {
        break
      }
      if (!lines[k].some((range) => range.max >= minX && range.min <= minX)) {
        isPerimeterActive = false
      }

      if (!isPerimeterActive) {
        break
      }
      if (!lines[k].some((range) => range.max >= maxX && range.min <= maxX)) {
        isPerimeterActive = false
      }
    }

    const area = (maxX - minX + 1) * (maxY - minY + 1)
    if (isPerimeterActive && area > result) {
      result = area
    }
  }
}

console.log(result)
