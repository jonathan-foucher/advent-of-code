import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const TIME_LIMIT = 2503

const reindeers = readFile(FILE_NAME).map((line) => {
  const name = /^[a-zA-Z]+(?= )/.exec(line)[0]
  const speed = parseInt(/(?<= can fly )\d+(?= km\/s)/.exec(line)[0])
  const flyingTime = parseInt(/(?<= can fly \d+ km\/s for )\d+(?= seconds)/.exec(line)[0])
  const restingTime = parseInt(/(?<= must rest for )\d+(?= seconds)/.exec(line)[0])
  return { name, speed, flyingTime, restingTime }
})

let result = 0
for (let i = 0; i < reindeers.length; i++) {
  const reindeer = reindeers[i]
  const distance =
    Math.floor(TIME_LIMIT / (reindeer.flyingTime + reindeer.restingTime)) * reindeer.speed * reindeer.flyingTime
    + Math.min(TIME_LIMIT % (reindeer.flyingTime + reindeer.restingTime), reindeer.flyingTime) * reindeer.speed

  if (distance > result) {
    result = distance
  }
}

console.log(result)
