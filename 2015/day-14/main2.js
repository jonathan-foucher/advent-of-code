import { readFile } from '../../utils/javascript/file-utils'

const FILE_NAME = 'input/input.txt'

const TIME_LIMIT = 2503

const reindeers = readFile(FILE_NAME).map((line) => {
  const name = /^[a-zA-Z]+(?= )/.exec(line)[0]
  const speed = parseInt(/(?<= can fly )\d+(?= km\/s)/.exec(line)[0])
  const flyingTime = parseInt(/(?<= can fly \d+ km\/s for )\d+(?= seconds)/.exec(line)[0])
  const restingTime = parseInt(/(?<= must rest for )\d+(?= seconds)/.exec(line)[0])
  return {
    name,
    speed,
    flyingTime,
    restingTime,
    score: 0,
    distance: 0,
    flyingTimeLeft: flyingTime,
    restingTimeLeft: restingTime,
  }
})

for (let _ = 0; _ < TIME_LIMIT; _++) {
  for (let i = 0; i < reindeers.length; i++) {
    const reindeer = reindeers[i]
    if (reindeer.flyingTimeLeft > 0) {
      reindeer.distance += reindeer.speed
      reindeer.flyingTimeLeft--
      continue
    }
    if (reindeer.restingTimeLeft > 0) {
      reindeer.restingTimeLeft--
      if (reindeer.restingTimeLeft === 0) {
        reindeer.flyingTimeLeft = reindeer.flyingTime
        reindeer.restingTimeLeft = reindeer.restingTime
      }
    }
  }

  let maxDistance = Math.max(...reindeers.map((reindeer) => reindeer.distance))
  reindeers.filter((reindeer) => reindeer.distance === maxDistance).forEach((reindeer) => reindeer.score++)
}

let result = Math.max(...reindeers.map((reindeer) => reindeer.score))

console.log(result)
