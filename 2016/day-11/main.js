import { readFile } from '../../utils/javascript/file-utils'

const FILE_NAME = 'input/input.txt'

const inputs = readFile(FILE_NAME)
const NUMBER_OF_FLOORS = inputs.length

const GENERATORS_REGEX = /([a-z]+) generator/g
const MICROCHIP_REGEX = /([a-z]+)-compatible microchip/g
const MAX_STEPS = 100

const ELEMENTS = []
const MICROCHIPS = []
const GENERATORS = []
for (let i = 0; i < NUMBER_OF_FLOORS; i++) {
  MICROCHIPS.push(0)
  GENERATORS.push(0)

  inputs[i].matchAll(GENERATORS_REGEX)
    .map(match => match[1])
    .forEach(generator => {
      let index = ELEMENTS.indexOf(generator)
      if (index === -1) {
        index = ELEMENTS.length
        ELEMENTS.push(generator)
      }
      GENERATORS[i] += 2 ** index
    })

  inputs[i].matchAll(MICROCHIP_REGEX)
    .map(match => match[1])
    .forEach(generator => {
      let index = ELEMENTS.indexOf(generator)
      if (index === -1) {
        index = ELEMENTS.length
        ELEMENTS.push(generator)
      }
      MICROCHIPS[i] += 2 ** index
    })
}

const NB_ELEMENTS = ELEMENTS.length

const getUpdatedElements = (elements, floorId, nextFloorId, value) => {
  const copy = [...elements]
  copy[floorId] -= value
  copy[nextFloorId] += value
  return copy
}

const cache = new Map()
let best = MAX_STEPS
const getLowestSteps = (generators, microchips, floorId, steps) => {
  if (steps >= best) {
    return undefined
  }

  const key = [floorId, ...generators, ...microchips].join(',')
  const cachedValue = cache.get(key)
  if (cachedValue !== undefined && cachedValue <= steps) {
      return undefined
  }
  cache.set(key, steps)

  if (floorId ===  NUMBER_OF_FLOORS - 1
    && generators.slice(0, NUMBER_OF_FLOORS - 1).every(g => g === 0)
    && microchips.slice(0, NUMBER_OF_FLOORS - 1).every(m => m === 0)
  ) {
    best = steps
    return steps
  }

  let results = []
  const currentGenerators = generators[floorId]
  const currentMicrochips = microchips[floorId]
  const nextFloorIds = [floorId + 1, floorId - 1]
    .filter(id => id >= 0 && id < NUMBER_OF_FLOORS)

  for (const nextFloorId of nextFloorIds) {
    const nextGenerators = generators[nextFloorId]
    const nextMicrochips = microchips[nextFloorId]

    for (let i = 0; i < NB_ELEMENTS; i++) {
      if (currentMicrochips >>> i === 0) {
        break
      }
      if (((currentMicrochips >>> i) % 2) === 1) {
        const firstMicrochip = 2 ** i
        if (nextGenerators === 0 || (firstMicrochip - (firstMicrochip & nextGenerators)) === 0) {
          const updatedMicrochips = getUpdatedElements(microchips, floorId, nextFloorId, firstMicrochip)
          results.push(getLowestSteps(generators, updatedMicrochips, nextFloorId, steps + 1))

          for (let j = i + 1; j < NB_ELEMENTS; j++) {
            if (currentMicrochips >>> j === 0) {
              break
            }
            if (((currentMicrochips >>> j) % 2) === 1) {
              const secondMicrochip = 2 ** j
              if (nextGenerators === 0 || (secondMicrochip - (secondMicrochip & nextGenerators)) === 0) {
                const updatedMicrochips = getUpdatedElements(microchips, floorId, nextFloorId, firstMicrochip + secondMicrochip)
                results.push(getLowestSteps(generators, updatedMicrochips, nextFloorId, steps + 1))
              }
            }
          }
        }
      }
    }


    for (let i = 0; i < NB_ELEMENTS; i++) {
      if (currentGenerators >>> i === 0) {
        break
      }
      if (((currentGenerators >>> i) % 2) === 1) {
        const firstGenerator = 2 ** i
        if ((nextMicrochips - (nextMicrochips & (nextGenerators + firstGenerator)) === 0)
          && ((firstGenerator & currentMicrochips) === 0 || firstGenerator === currentGenerators)
        ) {
          const updatedGenerators = getUpdatedElements(generators, floorId, nextFloorId, firstGenerator)
          results.push(getLowestSteps(updatedGenerators, microchips, nextFloorId, steps + 1))
        }

        for (let j = i + 1; j < NB_ELEMENTS; j++) {
          if (currentGenerators >>> j === 0) {
            break
          }
          if (((currentGenerators >>> j) % 2) === 1) {
            const secondGenerator = 2 ** j
            if ((nextMicrochips - (nextMicrochips & (nextGenerators + firstGenerator + secondGenerator)) === 0)
              && (((firstGenerator & currentMicrochips) === 0 && (secondGenerator & currentMicrochips) === 0)
                || (firstGenerator + secondGenerator) === currentGenerators)
            ) {
              const updatedGenerators = getUpdatedElements(generators, floorId, nextFloorId, firstGenerator + secondGenerator)
              results.push(getLowestSteps(updatedGenerators, microchips, nextFloorId, steps + 1))
            }
          }
        }
      }
    }


    const couples = currentGenerators & currentMicrochips
    if (couples > 0 && (nextMicrochips - (nextMicrochips & nextGenerators)) === 0) {
      let counter = 0
      while ((couples >>> counter) % 2 === 0) {
        counter++
      }

      const value = 2 ** counter
      const updatedGenerators = getUpdatedElements(generators, floorId, nextFloorId, value)
      const updatedMicrochips = getUpdatedElements(microchips, floorId, nextFloorId, value)
      results.push(getLowestSteps(updatedGenerators, updatedMicrochips, nextFloorId, steps + 1))
    }
  }

  results = results.filter(e => e)
  return Math.min(...results)
}

const result = getLowestSteps(GENERATORS, MICROCHIPS, 0, 0)

console.log(result)
