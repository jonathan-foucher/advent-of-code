import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const steps = readFile(FILE_NAME)
  .map((line) => {
    const regexResult = /^Step (?<previousStep>[A-Z]) must be finished before step (?<nextStep>[A-Z]) can begin.$/.exec(
      line
    )
    return {
      previousStep: regexResult.groups['previousStep'],
      nextStep: regexResult.groups['nextStep'],
    }
  })
  .reduce((acc, val) => {
    const existing = acc.find((step) => step.id === val.nextStep)
    if (existing !== undefined) {
      existing.previousSteps.push(val.previousStep)
    } else {
      acc.push({
        id: val.nextStep,
        previousSteps: [val.previousStep],
      })
    }

    const existingNext = acc.find((step) => step.id === val.previousStep)
    if (existingNext === undefined) {
      acc.push({
        id: val.previousStep,
        previousSteps: [],
      })
    }

    return acc
  }, [])

let stepsLeft = [...steps]
let result = ''
while (stepsLeft.length > 0) {
  const step = stepsLeft
    .filter((stepLeft) =>
      stepLeft.previousSteps.every((prevStep) => !stepsLeft.map((stepLeft) => stepLeft.id).includes(prevStep))
    )
    .map((step) => step.id)
    .sort()[0]

  result += step
  stepsLeft = stepsLeft.filter((stepLeft) => stepLeft.id !== step)
}

console.log(result)
