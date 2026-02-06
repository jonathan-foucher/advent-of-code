import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const MAX_TICKS = 1000

let particles = readFile(FILE_NAME).map((line) => {
  const regex =
    /^p=<(?<posX>-?\d+),(?<posY>-?\d+),(?<posZ>-?\d+)>, v=<(?<velX>-?\d+),(?<velY>-?\d+),(?<velZ>-?\d+)>, a=<(?<accX>-?\d+),(?<accY>-?\d+),(?<accZ>-?\d+)>$/
  const regexResult = regex.exec(line)
  return {
    posX: parseInt(regexResult.groups['posX']),
    posY: parseInt(regexResult.groups['posY']),
    posZ: parseInt(regexResult.groups['posZ']),
    velX: parseInt(regexResult.groups['velX']),
    velY: parseInt(regexResult.groups['velY']),
    velZ: parseInt(regexResult.groups['velZ']),
    accX: parseInt(regexResult.groups['accX']),
    accY: parseInt(regexResult.groups['accY']),
    accZ: parseInt(regexResult.groups['accZ']),
    hasCollided: false,
  }
})

for (let _ = 0; _ < MAX_TICKS; _++) {
  particles = particles.filter((particle) => !particle.hasCollided)
  for (const particle of particles) {
    particle.velX += particle.accX
    particle.velY += particle.accY
    particle.velZ += particle.accZ

    particle.posX += particle.velX
    particle.posY += particle.velY
    particle.posZ += particle.velZ
  }

  for (let i = 0; i < particles.length - 1; i++) {
    const p1 = particles[i]
    for (let j = 1; j < particles.length; j++) {
      const p2 = particles[j]
      if (i !== j && p1.posX === p2.posX && p1.posY === p2.posY && p1.posZ === p2.posZ) {
        p1.hasCollided = true
        p2.hasCollided = true
      }
    }
  }
}

const result = particles.filter((particle) => !particle.hasCollided).length

console.log(result)
