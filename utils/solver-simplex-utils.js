export const OPERATORS = Object.freeze({
  EQUAL: 0,
  GREATER_THAN_EQUAL: 1,
  LESS_THAN_EQUAL: 2,
})

const TOLERANCE = 1e-8

const createSimplexMinTableau = (constraints) => {
  const tableau = []
  const slacks = []
  const artificials = []

  for (let i = 0; i < constraints.length; i++) {
    const constraint = constraints[i]
    if (constraint.operator === OPERATORS.EQUAL) {
      artificials.push(i)
    } else if (constraint.operator === OPERATORS.GREATER_THAN_EQUAL) {
      slacks.push({ constraintId: i, isSurplus: true })
      artificials.push(i)
    } else {
      slacks.push({ constraintId: i, isSurplus: false })
    }
  }

  for (let i = 0; i < constraints.length; i++) {
    tableau.push([...constraints[i].variables])
  }

  for (let i = 0; i < slacks.length; i++) {
    const value = slacks[i].isSurplus ? -1 : 1
    for (let j = 0; j < tableau.length; j++) {
      tableau[j].push(slacks[i].constraintId === j ? value : 0)
    }
  }

  for (let i = 0; i < artificials.length; i++) {
    for (let j = 0; j < tableau.length; j++) {
      tableau[j].push(artificials[i] === j ? 1 : 0)
    }
  }

  for (let i = 0; i < constraints.length; i++) {
    let idx = -1
    for (let j = 0; j < tableau[i].length; j++) {
      if (tableau[i][j] === 1 && tableau.every((line, lineIdx) => lineIdx === i || line[j] === 0)) {
        idx = j
        break
      }
    }

    tableau[i].push(constraints[i].value)
    tableau[i].push(idx)
  }

  const coefficients = []
  for (let _ = 0; _ < constraints[0].variables.length; _++) {
    coefficients.push({ m: 0, c: -1 })
  }

  for (let _ = 0; _ < slacks.length; _++) {
    coefficients.push({ m: 0, c: 0 })
  }

  for (let _ = 0; _ < artificials.length; _++) {
    coefficients.push({ m: -1, c: 0 })
  }

  coefficients.push({ m: 0, c: 0 })

  tableau.push(coefficients)
  return tableau
}

const simplexMin = (constraints) => {
  const nVariables = constraints[0].variables.length
  const nSlacks = constraints.filter((c) => c.operator !== OPERATORS.EQUAL).length
  const tableau = createSimplexMinTableau(constraints)
  const height = tableau.length - 1
  const width = tableau[0].length - 2

  for (let y = 0; y < height; y++) {
    const idxBase = tableau[y][width + 1]
    if (idxBase === -1) {
      continue
    }

    const m = tableau[height][idxBase].m
    const c = tableau[height][idxBase].c
    if (m !== 0 || c !== 0) {
      for (let x = 0; x < width + 1; x++) {
        tableau[height][x].m -= tableau[y][x] * m
        tableau[height][x].c -= tableau[y][x] * c
      }
    }
  }

  while (tableau[height].slice(0, width).some((coefficient) => coefficient.m > 0 || coefficient.c > 0)) {
    let pivotX = -1
    let mostPositive = { m: 0, c: 0 }
    for (let x = 0; x < width; x++) {
      const coefficient = tableau[height][x]
      if (coefficient.m < TOLERANCE && coefficient.c < TOLERANCE) {
        continue
      }

      if (
        coefficient.m > mostPositive.m
        || (Math.abs(coefficient.m - mostPositive.m) < TOLERANCE && coefficient.c > mostPositive.c)
      ) {
        pivotX = x
        mostPositive = { m: coefficient.m, c: coefficient.c }
      }
    }

    if (pivotX === -1) {
      break
    }

    let pivotY = -1
    let minRatio = Infinity
    for (let y = 0; y < height; y++) {
      const value = tableau[y][pivotX]
      const ratio = tableau[y][width] / value
      if (value > TOLERANCE && minRatio > ratio) {
        pivotY = y
        minRatio = ratio
      }
    }

    if (pivotY === -1) {
      return null
    }

    tableau[height][width].m -= tableau[height][pivotX].m * minRatio
    tableau[height][width].c -= tableau[height][pivotX].c * minRatio

    tableau[pivotY][width + 1] = pivotX

    const pivotElement = tableau[pivotY][pivotX]
    tableau[pivotY][width] = tableau[pivotY][width] / pivotElement
    for (let x = 0; x < width; x++) {
      tableau[pivotY][x] = tableau[pivotY][x] / pivotElement
    }

    const pivot = { m: tableau[height][pivotX].m, c: tableau[height][pivotX].c }
    for (let x = 0; x < width; x++) {
      tableau[height][x].m -= tableau[pivotY][x] * pivot.m
      tableau[height][x].c -= tableau[pivotY][x] * pivot.c
    }

    for (let y = 0; y < height; y++) {
      if (y !== pivotY) {
        const factor = tableau[y][pivotX]
        tableau[y][width] -= factor * tableau[pivotY][width]

        for (let x = 0; x < width; x++) {
          tableau[y][x] -= factor * tableau[pivotY][x]
        }
      }
    }
  }

  const solution = []
  const unorderedSolution = tableau.slice(0, -1).map((r) => r[width])
  for (let x = 0; x < width; x++) {
    let rowIdx = -1
    for (let y = 0; y < height; y++) {
      if (tableau[y][width + 1] === x) {
        rowIdx = y
        break
      }
    }
    solution.push(rowIdx !== -1 ? unorderedSolution[rowIdx] : 0)
  }

  if (solution.slice(nVariables + nSlacks).some((s) => Math.abs(s) > TOLERANCE)) {
    return null
  }
  return solution.slice(0, nVariables)
}

const addConstraint = (constraints, idx, value, operator) => {
  const newConstraints = []
  for (let i = 0; i < constraints.length; i++) {
    const constraint = constraints[i]

    const variables = []
    for (let j = 0; j < constraint.variables.length; j++) {
      variables.push(constraint.variables[j])
    }

    const cpy = {
      value: constraint.value,
      variables,
      operator: constraint.operator,
    }
    newConstraints.push(cpy)
  }

  const newVariables = []
  for (let i = 0; i < constraints[0].variables.length; i++) {
    newVariables.push(i === idx ? 1 : 0)
  }

  for (let i = 0; i < newConstraints.length; i++) {
    const constraint = newConstraints[i]
    if (
      constraint.operator !== OPERATORS.EQUAL
      && constraint.operator === operator
      && constraint.variables.every((v, i) => v === newVariables[i])
    ) {
      if (operator === OPERATORS.LESS_THAN_EQUAL) {
        constraint.value = Math.min(constraint.value, value)
      } else {
        constraint.value = Math.max(constraint.value, value)
      }
      return newConstraints
    }
  }

  newConstraints.push({
    value,
    variables: newVariables,
    operator,
  })

  return newConstraints
}

const isValidSolution = (solution, constraints) => {
  for (let i = 0; i < constraints.length; i++) {
    const constraint = constraints[i]
    let sum = 0
    for (let j = 0; j < constraint.variables.length; j++) {
      sum += constraint.variables[j] * Math.round(solution[j])
    }

    if (constraint.operator === OPERATORS.EQUAL) {
      if (Math.abs(sum - constraint.value) > TOLERANCE) {
        return false
      }
    } else if (constraint.operator === OPERATORS.GREATER_THAN_EQUAL) {
      if (sum < constraint.value - TOLERANCE) {
        return false
      }
    } else {
      if (sum > constraint.value + TOLERANCE) {
        return false
      }
    }
  }
  return true
}

export const branchSimplexMin = (
  constraints,
  best = { result: Infinity, solution: null },
  originalConstraints = null
) => {
  if (originalConstraints === null) {
    originalConstraints = constraints
  }

  const solution = simplexMin(constraints)
  if (!solution) {
    return best
  }

  const result = solution.reduce((sum, val) => sum + val, 0)

  let idx = -1
  let value = 0
  let maxDelta = 0
  for (let i = 0; i < solution.length; i++) {
    const delta = Math.abs(solution[i] - Math.round(solution[i]))
    if (delta > TOLERANCE && delta > maxDelta) {
      idx = i
      value = solution[i]
      maxDelta = delta
    }
  }

  if (idx === -1) {
    const roundedSolution = solution.map((s) => Math.round(s))
    const roundedResult = roundedSolution.reduce((sum, val) => sum + val, 0)
    if (isValidSolution(solution, originalConstraints) && roundedResult < best.result) {
      return { result: roundedResult, solution: roundedSolution }
    }
    return best
  }

  if (result >= best.result) {
    return best
  }

  const leftConstraints = addConstraint(constraints, idx, Math.floor(value), OPERATORS.LESS_THAN_EQUAL)
  const leftResult = branchSimplexMin(leftConstraints, best, originalConstraints)
  if (leftResult.result < best.result) {
    best = leftResult
  }

  const rightConstraints = addConstraint(constraints, idx, Math.ceil(value), OPERATORS.GREATER_THAN_EQUAL)
  const rightResult = branchSimplexMin(rightConstraints, best, originalConstraints)
  if (rightResult.result < best.result) {
    best = rightResult
  }

  return best
}
