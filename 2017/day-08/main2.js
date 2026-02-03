import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const REGISTERS = {}

const instructions = readFile(FILE_NAME).map((line) => {
  const elements = line.split(/\s+/)

  const register = elements[0]
  if (REGISTERS[register] === undefined) {
    REGISTERS[register] = 0
  }

  const conditionRegister = elements[4]
  if (REGISTERS[conditionRegister] === undefined) {
    REGISTERS[conditionRegister] = 0
  }

  return {
    register,
    value: parseInt(elements[2]) * (elements[1] === 'inc' ? 1 : -1),
    conditionRegister,
    conditionOperator: elements[5],
    conditionValue: parseInt(elements[6]),
  }
})

const checkCondition = (value1, value2, operator) => {
  switch (operator) {
    case '>':
      return value1 > value2
    case '<':
      return value1 < value2
    case '>=':
      return value1 >= value2
    case '<=':
      return value1 <= value2
    case '==':
      return value1 === value2
    case '!=':
      return value1 !== value2
  }
}

let result = 0
for (const instruction of instructions) {
  const condition = checkCondition(
    REGISTERS[instruction.conditionRegister],
    instruction.conditionValue,
    instruction.conditionOperator
  )

  if (condition) {
    const value = REGISTERS[instruction.register] + instruction.value
    REGISTERS[instruction.register] = value
    if (value > result) {
      result = value
    }
  }
}

console.log(result)
