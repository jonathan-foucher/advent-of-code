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
