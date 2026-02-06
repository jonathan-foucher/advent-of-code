import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const particles = readFile(FILE_NAME).map((line) => {
  const regex = /a=<(?<accX>-?\d+),(?<accY>-?\d+),(?<accZ>-?\d+)>$/
  const regexResult = regex.exec(line)
  return {
    accX: parseInt(regexResult.groups['accX']),
    accY: parseInt(regexResult.groups['accY']),
    accZ: parseInt(regexResult.groups['accZ']),
  }
})

let minAcceleration = Infinity
let result = null
for (let i = 0; i < particles.length; i++) {
  const particle = particles[i]
  const totalAcc = Math.abs(particle.accX) + Math.abs(particle.accY) + Math.abs(particle.accZ)
  if (totalAcc < minAcceleration) {
    minAcceleration = totalAcc
    result = i
  }
}

console.log(result)
