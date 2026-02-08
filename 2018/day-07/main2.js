import { readFile } from '../../utils/file-utils.js'

const IS_EXAMPLE = false
const FILE_NAME = IS_EXAMPLE ? 'input/example.txt' : 'input/input.txt'
const NUMBER_OF_WORKERS = IS_EXAMPLE ? 2 : 5
const STEP_TIME = IS_EXAMPLE ? 0 : 60
const ASCII_SHIFT = -64

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
        timer: val.nextStep.charCodeAt(0) + ASCII_SHIFT + STEP_TIME,
        previousSteps: [val.previousStep],
      })
    }

    const existingNext = acc.find((step) => step.id === val.previousStep)
    if (existingNext === undefined) {
      acc.push({
        id: val.previousStep,
        timer: val.previousStep.charCodeAt(0) + ASCII_SHIFT + STEP_TIME,
        previousSteps: [],
      })
    }

    return acc
  }, [])

let stepsLeft = [...steps]
let stepsInProgress = []
let availableWorkers = NUMBER_OF_WORKERS
let result = 0
while (stepsLeft.length > 0 || stepsInProgress.length > 0) {
  while (availableWorkers > 0) {
    const step = stepsLeft
      .filter((stepLeft) =>
        stepLeft.previousSteps.every(
          (prevStep) =>
            !stepsLeft.map((stepLeft) => stepLeft.id).includes(prevStep)
            && !stepsInProgress.map((stepInProgress) => stepInProgress.id).includes(prevStep)
        )
      )
      ?.sort((a, b) => a.id.charCodeAt(0) - b.id.charCodeAt(0))[0]

    if (step === undefined) {
      break
    }

    stepsInProgress.push(step)
    stepsLeft = stepsLeft.filter((stepLeft) => stepLeft.id !== step.id)
    availableWorkers--
  }

  for (const stepInProgress of stepsInProgress) {
    stepInProgress.timer--
    if (stepInProgress.timer === 0) {
      availableWorkers++
    }
  }
  stepsInProgress = stepsInProgress.filter((stepInProgress) => stepInProgress.timer > 0)
  result++
}

console.log(result)
