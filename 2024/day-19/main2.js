import { readFile } from './file-utils'

const FILE_NAME = 'input/input.txt'

const lines = readFile(FILE_NAME)

const cache = new Map()

const patterns = lines[0].split(', ')
const onsens = []
for (let i = 2; i < lines.length; i ++) {
  onsens.push(lines[i])
}

const checkPossibility = (str, possiblePatterns, onsen) => {
  if (str === onsen) {
    return 1
  }

  let sum = 0
  for (let i = 0; i < possiblePatterns.length; i++) {
    const pattern = possiblePatterns[i]
    const newStr = str + pattern
    if (onsen.startsWith(newStr)) {
      const key = `${onsen}-${str + pattern}-${possiblePatterns.join(',')}`
      let res = cache.get(key)
      if (!res) {
        res = checkPossibility(str + pattern, possiblePatterns, onsen)
        cache.set(key, res)
      }
      sum += res
    }
  }
  return sum
}

let result = 0
for (let i = 0; i < onsens.length; i++) {
  const onsen = onsens[i]

  const possiblePatterns = []
  for (let j = 0; j < patterns.length; j++) {
    const pattern = patterns[j]
    if (onsen.includes(pattern)) {
      possiblePatterns.push(pattern)
    }
  }

  for (let j = 0; j < patterns.length; j++) {
    const pattern = possiblePatterns[j]
    result += checkPossibility(pattern, possiblePatterns, onsen)
  }
}

console.log(result)
