import { readFile } from '../../utils/javascript/file-utils'

const FILE_NAME = 'input/input.txt'

const LITERS = 150

const inputs = readFile(FILE_NAME)
const containers = []
const possibilities = new Set()

for (let i = 0; i <= inputs.length; i++) {
  containers.push({ id: i, value: parseInt(inputs[i]) })
}

const runPossibilities = (containers, filledContainerIds, remainingLiters) => {
  if (remainingLiters === 0) {
    possibilities.add(filledContainerIds.sort().join('-'))
    return
  }

  containers
    .filter(
      (container) =>
        container.value <= remainingLiters
        && (filledContainerIds.length === 0 || container.id > filledContainerIds[filledContainerIds.length - 1])
    )
    .map((container) =>
      runPossibilities(
        containers.filter((c) => c.id !== container.id),
        [...filledContainerIds, container.id],
        remainingLiters - container.value
      )
    )
}

runPossibilities(containers, [], LITERS)

console.log(possibilities.size)
