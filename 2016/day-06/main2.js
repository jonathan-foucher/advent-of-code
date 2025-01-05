import { readFile } from '../../utils/javascript/file-utils'

const FILE_NAME = 'input/input.txt'

const inputs = readFile(FILE_NAME)
const RESULT_SIZE = inputs[0].length

const occurences = []
for (let i = 0; i < RESULT_SIZE; i ++) {
  occurences.push([])
}

for (let i = 0; i < inputs.length; i++) {
  const input = inputs[i]
  for (let j = 0; j < RESULT_SIZE; j++) {
    const char = input[j]
    const charCount = occurences[j].find(c => c.value === char)
    if (charCount) {
      charCount.count++
      continue
    }
    occurences[j].push({ value: char, count: 1 })
  }
}

const result = occurences.map(occurence => {
  return occurence.reduce((acc, val) => {
    if (!acc || val.count < acc.count) {
      return val
    }
    return acc
  }, null)
  .value
})
.join('')

console.log(result)
