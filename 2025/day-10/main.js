import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const machines = readFile(FILE_NAME).map((line) => {
  const regexResult = /^\[([.|#]+)\]\s((?:\([\d|,]+\)\s)+)\{[\d|,]+\}$/g.exec(line)

  const target = parseInt(
    regexResult[1]
      .split('')
      .map((c) => (c === '#' ? 1 : 0))
      .join(''),
    2
  )

  const buttons = regexResult[2]
    .replaceAll('(', '')
    .replaceAll(')', '')
    .split(' ')
    .slice(0, -1)
    .map((b) => {
      const values = b.split(',').map((n) => parseInt(n))
      let temp = ''
      for (let i = 0; i < regexResult[1].length; i++) {
        temp += values.includes(i) ? 1 : 0
      }
      return parseInt(temp, 2)
    })

  return {
    target,
    buttons,
  }
})

let cache
const getMinPressing = (target, lights, buttons, pressed, index) => {
  if (target === lights) {
    return pressed.length
  }

  const key = pressed.sort().join('-')
  const cachedResult = cache.get(key)
  if (cachedResult) {
    return cachedResult
  }

  let min = Infinity
  for (let i = index; i < buttons.length; i++) {
    if (!pressed.includes(i)) {
      const value = getMinPressing(target, lights ^ buttons[i], buttons, [...pressed, i], index + 1)
      if (value < min) {
        min = value
      }
    }
  }

  cache.set(key, min)
  return min
}

let result = 0
for (const machine of machines) {
  cache = new Map()
  result += getMinPressing(machine.target, 0, machine.buttons, [], 0)
}

console.log(result)
