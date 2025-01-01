import { readFile } from '../../utils/javascript/file-utils'

const FILE_NAME = 'input/input.txt'

let result = readFile(FILE_NAME)[0]

const rollPassword = (password) => {
  let i = 0
  while (password[password.length - 1 - i] === 'z') {
    i++
  }

  const charCodeToRoll = password.charCodeAt(password.length - 1 - i)
  let result = password.slice(0, password.length - 1 - i) + String.fromCharCode(charCodeToRoll + 1)
  for (let j = 0; j < i; j++) {
    result += 'a'
  }
  return result
}

let count = 0
while (true) {
  result = rollPassword(result)

  if (/i|l|o/.test(result)) {
    continue
  }

  let pairCount = 0
  for (let i = 0; i < result.length - 1; i++) {
    if (result[i] === result[i + 1]) {
      pairCount++
      i++
      if (pairCount === 2) {
        break
      }
    }
  }
  if (pairCount < 2) {
    continue
  }

  let threeIncreasing = false
  for (let i = 0; i < result.length - 2; i++) {
    if (result.charCodeAt(i) + 1 === result.charCodeAt(i + 1)
      && result.charCodeAt(i) + 2 === result.charCodeAt(i + 2)
    ) {
      threeIncreasing = true
      break
    }
  }
  if (!threeIncreasing) {
    continue
  }

  count++
  if (count === 2) {
    break
  }
}

console.log(result)
