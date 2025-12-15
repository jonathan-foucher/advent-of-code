import { readFile } from '../../utils/file-utils.js'
import { OPERATORS, branchSimplexMin } from '../../utils/solver-simplex-utils.js'

const FILE_NAME = 'input/input.txt'

const extractData = (line) => {
  const regexResult = /^\[[.|#]+\]\s((?:\([\d|,]+\)\s)+)\{([\d|,]+)\}$/g.exec(line)

  const buttons = regexResult[1]
    .replaceAll('(', '')
    .replaceAll(')', '')
    .split(' ')
    .slice(0, -1)
    .map((b) => b.split(',').map((n) => parseInt(n)))

  const joltages = regexResult[2].split(',').map((n) => parseInt(n))
  return { buttons, joltages }
}

const initConstraints = (buttons, joltages) => {
  const constraints = []
  for (let i = 0; i < joltages.length; i++) {
    const variables = []
    for (let j = 0; j < buttons.length; j++) {
      variables.push(buttons[j].includes(i) ? 1 : 0)
    }
    constraints.push({ value: joltages[i], variables, operator: OPERATORS.EQUAL })
  }
  return constraints
}

let result = 0
for (const line of readFile(FILE_NAME)) {
  const { buttons, joltages } = extractData(line)
  const constraints = initConstraints(buttons, joltages)
  result += branchSimplexMin(constraints)
}

console.log(result)
