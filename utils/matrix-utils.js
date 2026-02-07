export const transpose = (matrix) => {
  if (!matrix || matrix.length === 0) {
    return []
  }
  return matrix[0].map((_, i) => matrix.map((row) => row[i]))
}

export const getDeterminant = (matrix) => {
  if (matrix.length !== matrix[0].length) {
    return null
  }

  const size = matrix.length
  if (size === 1) {
    return matrix[0][0]
  }

  if (size === 2) {
    return matrix[0][0] * matrix[1][1] - matrix[1][0] * matrix[0][1]
  }

  let determinant = 0
  for (let x = 0; x < size; x++) {
    const subMatrix = []
    for (let i = 0; i < size; i++) {
      if (i !== x) {
        subMatrix.push(matrix[i].slice(1))
      }
    }
    const sign = x % 2 === 0 ? 1 : -1
    determinant += sign * matrix[x][0] * getDeterminant(subMatrix)
  }
  return determinant
}

export const print = (matrix) => {
  for (const row of matrix) {
    console.log(row.join(''))
  }
}

export const flipHorizontal = (matrix) => {
  const flippedMatrix = []
  for (let y = 0; y < matrix.length; y++) {
    flippedMatrix.push([])
    for (let x = matrix[0].length - 1; x >= 0; x--) {
      flippedMatrix[y].push(matrix[y][x])
    }
  }

  return flippedMatrix
}

export const flipVertical = (matrix) => {
  const flippedMatrix = []
  for (let y = matrix.length - 1; y >= 0; y--) {
    flippedMatrix.push([])
    for (let x = 0; x < matrix[0].length; x++) {
      flippedMatrix[matrix.length - 1 - y].push(matrix[y][x])
    }
  }

  return flippedMatrix
}

export const rotateRight = (matrix) => {
  const rotatedMatrix = []
  for (let y = 0; y < matrix[0].length; y++) {
    rotatedMatrix.push([])
    for (let x = matrix.length - 1; x >= 0; x--) {
      rotatedMatrix[y].push(matrix[x][y])
    }
  }

  return rotatedMatrix
}

export const rotateLeft = (matrix) => {
  const rotatedMatrix = []
  for (let y = matrix[0].length - 1; y >= 0; y--) {
    rotatedMatrix.push([])
    for (let x = 0; x < matrix.length; x++) {
      rotatedMatrix[matrix[0].length - 1 - y].push(matrix[x][y])
    }
  }

  return rotatedMatrix
}
