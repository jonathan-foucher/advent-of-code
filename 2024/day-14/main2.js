import { readFile } from '../../utils/file-utils.js'

const isExample = false

const FILE_NAME = isExample ? 'input/example.txt' : 'input/input.txt'

const MAX_WIDTH = isExample ? 11 : 101
const MAX_HEIGHT = isExample ? 7 : 103

const robots = readFile(FILE_NAME).map((line) => {
  const info = line.split(' ')
  const p = info[0].split('=')[1].split(',')
  const v = info[1].split('=')[1].split(',')
  return { px: parseInt(p[0]), py: parseInt(p[1]), vx: parseInt(v[0]), vy: parseInt(v[1]) }
})

for (let i = 1; i < 10000; i++) {
  for (let j = 0; j < robots.length; j++) {
    const robot = robots[j]
    robot.px = (robot.px + robot.vx) % MAX_WIDTH
    robot.py = (robot.py + robot.vy) % MAX_HEIGHT

    if (robot.px < 0) {
      robot.px += MAX_WIDTH
    }
    if (robot.py < 0) {
      robot.py += MAX_HEIGHT
    }
  }
  const matrix = []
  for (let y = 0; y < MAX_HEIGHT; y++) {
    matrix[y] = []
    for (let x = 0; x < MAX_WIDTH; x++) {
      matrix[y][x] = ' '
    }
  }
  for (let j = 0; j < robots.length; j++) {
    matrix[robots[j].py][robots[j].px] = '*'
  }
  // noticed soemthing weird at 38, 139, 240...
  if (i % 101 === 38) {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log(i)
    console.log(matrix.map((row) => row.join('')))
  }
}
