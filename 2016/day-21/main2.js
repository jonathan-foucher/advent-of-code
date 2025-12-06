import { readFile } from '../../utils/javascript/file-utils'

const FILE_NAME = 'input/input.txt'
const REGEXES = [
  /(swap position) (\d+) with position (\d+)/,
  /(swap letter) ([a-z]) with letter ([a-z])/,
  /(rotate left) (\d+) step/,
  /(rotate right) (\d+) step/,
  /(rotate based on position) of letter ([a-z])/,
  /(reverse) positions (\d+) through (\d+)/,
  /(move) position (\d+) to position (\d+)/,
]

const OPERATIONS = readFile(FILE_NAME).map((line) => {
  let i = 0
  let match
  do {
    match = line.match(REGEXES[i])
    i++
  } while (!match)

  const params = [match[2], match[3]]
    .filter((param) => param)
    .map((param) => {
      const number = parseInt(param)
      if (isNaN(number)) {
        return param
      }
      return number
    })

  return { action: match[1], params }
})

let password = 'fbgdceah'.split('')
for (let i = OPERATIONS.length - 1; i >= 0; i--) {
  const op = OPERATIONS[i]
  let temp, shift
  switch (op.action) {
    case 'swap position':
      temp = password[op.params[0]]
      password[op.params[0]] = password[op.params[1]]
      password[op.params[1]] = temp
      break

    case 'swap letter':
      const index1 = password.indexOf(op.params[0])
      const index2 = password.indexOf(op.params[1])
      temp = password[index1]
      password[index1] = password[index2]
      password[index2] = temp
      break

    case 'rotate left':
      shift = password.length - (op.params[0] % password.length)
      password = [...password.slice(shift, password.length), ...password.slice(0, shift)]
      break

    case 'rotate right':
      shift = op.params[0] % password.length
      password = [...password.slice(shift, password.length), ...password.slice(0, shift)]
      break

    case 'rotate based on position':
      let index = password.indexOf(op.params[0])

      if (index % 2 === 1) {
        shift = (index + 1) / 2
      } else {
        if (index === 0) {
          index = password.length
        }
        shift = (index / 2 + 5) % password.length
      }

      password = [...password.slice(shift, password.length), ...password.slice(0, shift)]
      break

    case 'reverse':
      password = [
        ...password.slice(0, op.params[0]),
        ...password.slice(op.params[0], op.params[1] + 1).reverse(),
        ...password.slice(op.params[1] + 1, password.length),
      ]
      break

    case 'move':
      temp = password.splice(op.params[1], 1)[0]
      password.splice(op.params[0], 0, temp)
      break
  }
}

console.log(password.join(''))
