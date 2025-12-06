import { readFile } from '../../utils/javascript/file-utils'

const FILE_NAME = 'input/input.txt'

const inputs = readFile(FILE_NAME)

let result = 0
for (let i = 0; i < inputs.length; i++) {
  const input = inputs[i]
  const split = input.split(/\[|\]/)

  const outBrackets = []
  const inBrackets = []
  for (let j = 0; j < split.length; j++) {
    if (j % 2 === 0) {
      outBrackets.push(split[j])
    } else {
      inBrackets.push(split[j])
    }
  }

  let hasMatch = false
  for (let j = 0; j < outBrackets.length; j++) {
    const str = outBrackets[j]
    for (let k = 0; k < str.length - 2; k++) {
      const aba = str.slice(k, k + 3)
      if (aba[0] !== aba[2] || aba[0] === aba[1]) {
        continue
      }

      const bab = aba[1] + aba[0] + aba[1]
      if (inBrackets.every((s) => !s.includes(bab))) {
        continue
      }
      hasMatch = true
    }
    if (hasMatch) {
      break
    }
  }

  if (hasMatch) {
    result++
  }
}

console.log(result)
