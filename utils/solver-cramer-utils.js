import { transpose, getDeterminant } from './matrix-utils.js'

export const cramer = (matrix, vector) => {
  if (
    matrix.length !== matrix[0].length
    || matrix.length !== vector.length
    || matrix.some((row) => row.length !== vector.length)
  ) {
    return null
  }

  const transposed = transpose(matrix)
  const determinant = getDeterminant(transposed)
  if (determinant === 0) {
    return null
  }

  const solutions = []
  for (let x = 0; x < vector.length; x++) {
    const swappedMatrix = [...transposed.slice(0, x), vector, ...transposed.slice(x + 1)]
    const swappedDeterminant = getDeterminant(swappedMatrix)
    solutions.push(swappedDeterminant / determinant)
  }
  return solutions
}
