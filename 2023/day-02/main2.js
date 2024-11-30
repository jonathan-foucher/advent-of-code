import { readFile } from './file-utils'

const FILE_NAME = 'input/input.txt'

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

const result = readFile(FILE_NAME)
  .map(line => extractGameInfo(line))
  .map(game => game.subsets.reduce((acc, val) => {
    if (val.red && val.red > acc.red) {
      acc.red = val.red
    }
    if (val.green && val.green > acc.green) {
      acc.green = val.green
    }
    if (val.blue && val.blue > acc.blue) {
      acc.blue = val.blue
    }
    return acc
  }, { red: 0, green: 0, blue: 0 }))
  .map(colors => colors.red * colors.green * colors.blue)
  .reduce((acc, val) => acc + val, 0)

console.log(result)
