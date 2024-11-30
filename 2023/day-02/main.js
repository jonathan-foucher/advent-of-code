import { readFile } from './file-utils'

const FILE_NAME = 'input/input.txt'
const MAX_RED = 12
const MAX_GREEN = 13
const MAX_BLUE = 14

const extractGameInfo = (line) => {
  const id = parseInt(line.split(':')[0].replace('Game ', ''))
  const subsets = line.split(': ')[1].split('; ')
    .map(subsetStr => {
      let subset = {}
      subsetStr.split(', ')
        .forEach(colorStr => {
          subset[colorStr.split(' ')[1]] = parseInt(colorStr.split(' ')[0])
        })
      return subset
    })
  return {
    id,
    subsets
  }
}

const hasEnoughCube = (subset) => (!subset.red || subset.red <= MAX_RED)
  && (!subset.green || subset.green <= MAX_GREEN)
  && (!subset.blue || subset.blue <= MAX_BLUE)

const result = readFile(FILE_NAME)
  .map(line => extractGameInfo(line))
  .filter(game => game.subsets.every(subset => hasEnoughCube(subset)))
  .map(game => game.id)
  .reduce((acc, val) => acc + val, 0)

console.log(result)
