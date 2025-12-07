import { readFile } from '../../utils/file-utils.js'

const isExample = false

const FILE_NAME = isExample ? 'input/example.txt' : 'input/input.txt'

const MAX_WIDTH = isExample ? 11 : 101
const MAX_HEIGHT = isExample ? 7 : 103
const NUMBER_OF_SECONDS = 100

const robots = readFile(FILE_NAME).map((line) => {
  const info = line.split(' ')
  const p = info[0].split('=')[1].split(',')
  const v = info[1].split('=')[1].split(',')
  return { px: parseInt(p[0]), py: parseInt(p[1]), vx: parseInt(v[0]), vy: parseInt(v[1]) }
})

const quadrants = [0, 0, 0, 0]

const MID_WIDTH = Math.floor(MAX_WIDTH / 2)
const MID_HEIGHT = Math.floor(MAX_HEIGHT / 2)

for (let i = 0; i < robots.length; i++) {
  const robot = robots[i]
  robot.px = (robot.px + robot.vx * NUMBER_OF_SECONDS) % MAX_WIDTH
  robot.py = (robot.py + robot.vy * NUMBER_OF_SECONDS) % MAX_HEIGHT

  if (robot.px < 0) {
    robot.px += MAX_WIDTH
  }
  if (robot.py < 0) {
    robot.py += MAX_HEIGHT
  }

  if (robot.px < MID_WIDTH && robot.py < MID_HEIGHT) {
    quadrants[0]++
  }
  if (robot.px < MID_WIDTH && robot.py > MID_HEIGHT) {
    quadrants[1]++
  }
  if (robot.px > MID_WIDTH && robot.py < MID_HEIGHT) {
    quadrants[2]++
  }
  if (robot.px > MID_WIDTH && robot.py > MID_HEIGHT) {
    quadrants[3]++
  }
}

const result = quadrants[0] * quadrants[1] * quadrants[2] * quadrants[3]

console.log(result)
