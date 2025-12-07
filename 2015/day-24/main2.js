import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const NUMBER_OF_GROUPS = 4

const PACKAGES = readFile(FILE_NAME)
  .map((n) => parseInt(n))
  .sort((a, b) => b - a)

const TARGET_WEIGHT = PACKAGES.reduce((acc, val) => acc + val, 0) / NUMBER_OF_GROUPS

const getBestArrangement = (packages, group, weight) => {
  if (weight === TARGET_WEIGHT) {
    return group
  }

  let results = []
  const lastPackageAdded = group[group.length - 1]
  for (let i = 0; i < packages.length; i++) {
    const pack = packages[i]
    if ((group.length === 0 || lastPackageAdded > pack) && weight + pack <= TARGET_WEIGHT) {
      results.push(getBestArrangement(packages, [...group, pack], weight + pack))
    }
  }

  results = results.filter((e) => e)
  return results.length === 0
    ? undefined
    : results.sort((a, b) => {
        const sumA = a.reduce((acc, val) => acc + val, 0)
        const sumB = b.reduce((acc, val) => acc + val, 0)
        if (sumA < sumB) {
          return -1
        }

        if (sumA === sumB) {
          const quantumA = a.reduce((acc, val) => acc * val, 1)
          const quandumB = b.reduce((acc, val) => acc * val, 1)
          if (quantumA < quandumB) {
            return -1
          }
        }

        return 1
      })[0]
}

const result = getBestArrangement(PACKAGES, [], 0)

console.log(result.reduce((acc, val) => acc * val, 1))
