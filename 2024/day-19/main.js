import { readFile } from '../../utils/javascript/file-utils'

const FILE_NAME = 'input/input.txt'

const lines = readFile(FILE_NAME)

const patterns = lines[0].split(', ')
const onsens = []
for (let i = 2; i < lines.length; i ++) {
  onsens.push(lines[i])
}

const checkPossibility = (str, possiblePatterns, onsen) => {
  if (str === onsen) {
    return true
  }
  if (!onsen.startsWith(str)) {
    return false
  }
  return possiblePatterns.some(pattern => checkPossibility(str + pattern, possiblePatterns, onsen))
}

let result = 0
for (let i = 0; i < onsens.length; i++) {
  const onsen = onsens[i]
  const possiblePatterns = []
  for (let j = 0; j < patterns.length; j++) {
    const pattern = patterns[j]
    if(onsen.includes(pattern)) {
      possiblePatterns.push(pattern)
    }
  }

  result += possiblePatterns.some(pattern => checkPossibility(pattern, possiblePatterns, onsen)) ? 1 : 0
}

console.log(result)
