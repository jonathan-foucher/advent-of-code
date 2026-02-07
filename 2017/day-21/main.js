import { readFile } from '../../utils/file-utils.js'
import { rotateRight, flipVertical } from '../../utils/matrix-utils.js'

const IS_EXAMPLE = false
const FILE_NAME = IS_EXAMPLE ? 'input/example.txt' : 'input/input.txt'
const NUMBER_OF_ITTERATIONS = IS_EXAMPLE ? 2 : 5

const rules = readFile(FILE_NAME).map((line) => {
  const matrixes = line.split(' => ').map((matrix) => matrix.split('/').map((row) => row.split('')))
  const inputs = []

  let currentMatrix = matrixes[0]
  inputs.push(currentMatrix.map((row) => row.join('')).join('/'))
  inputs.push(
    flipVertical(currentMatrix)
      .map((row) => row.join(''))
      .join('/')
  )

  for (let _ = 0; _ < 3; _++) {
    currentMatrix = rotateRight(currentMatrix)
    inputs.push(currentMatrix.map((row) => row.join('')).join('/'))
    inputs.push(
      flipVertical(currentMatrix)
        .map((row) => row.join(''))
        .join('/')
    )
  }

  return {
    inputs: inputs.reduce((acc, val) => {
      if (!acc.includes(val)) {
        acc.push(val)
      }
      return acc
    }, []),
    output: matrixes[1],
  }
})

let pixels = '.#./..#/###'

for (let _ = 0; _ < NUMBER_OF_ITTERATIONS; _++) {
  const matrix = pixels.split('/').map((row) => row.split(''))
  const shift = matrix.length % 2 === 0 ? 2 : 3
  const nParts = matrix.length / shift

  const subPixels = []
  for (let i = 0; i < nParts; i++) {
    for (let j = 0; j < nParts; j++) {
      const subMatrix = []

      for (let y = 0; y < shift; y++) {
        subMatrix.push([])
        for (let x = 0; x < shift; x++) {
          subMatrix[y].push(matrix[shift * i + y][shift * j + x])
        }
      }
      subPixels.push(subMatrix.map((row) => row.join('')).join('/'))
    }
  }

  for (let i = 0; i < subPixels.length; i++) {
    const subPixel = subPixels[i]
    for (const rule of rules) {
      if (rule.inputs.includes(subPixel)) {
        subPixels[i] = rule.output
        break
      }
    }
  }

  const newMatrix = []
  for (let i = 0; i < nParts; i++) {
    for (let _ = 0; _ < subPixels[0].length; _++) {
      newMatrix.push([])
    }

    for (let j = 0; j < nParts; j++) {
      for (let k = 0; k < subPixels[0].length; k++) {
        newMatrix[(shift + 1) * i + k].push(subPixels[nParts * i + j][k])
      }
    }
  }

  pixels = newMatrix.map((row) => row.map((part) => part.join('')).join('')).join('/')
}

const result = pixels.split('').filter((char) => char === '#').length
console.log(result)
