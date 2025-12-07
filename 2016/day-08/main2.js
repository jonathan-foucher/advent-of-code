import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const inputs = readFile(FILE_NAME)
const WIDTH = 50
const HEIGHT = 6

const pixels = []
for (let y = 0; y < HEIGHT; y++) {
  pixels.push([])
  for (let x = 0; x < WIDTH; x++) {
    pixels[y].push(false)
  }
}

for (let i = 0; i < inputs.length; i++) {
  const input = inputs[i]
  if (input.startsWith('rect')) {
    const [A, B] = input
      .split(' ')[1]
      .split('x')
      .map((n) => parseInt(n))
    for (let x = 0; x < A; x++) {
      for (let y = 0; y < B; y++) {
        pixels[y][x] = true
      }
    }
    continue
  }

  if (input.startsWith('rotate row')) {
    const y = parseInt(/(?<=y=)\d+(?= )/.exec(input)[0])
    const n = parseInt(/\d+$/.exec(input)[0])
    pixels[y] = [...pixels[y].slice(WIDTH - n, WIDTH), ...pixels[y].slice(0, WIDTH - n)]
    continue
  }

  if (input.startsWith('rotate column')) {
    const x = parseInt(/(?<=x=)\d+(?= )/.exec(input)[0])
    const n = parseInt(/\d+$/.exec(input)[0])
    for (let j = 0; j < n; j++) {
      const temp = pixels[HEIGHT - 1][x]
      for (let y = HEIGHT - 1; y > 0; y--) {
        pixels[y][x] = pixels[y - 1][x]
      }
      pixels[0][x] = temp
    }
    continue
  }
}

for (let y = 0; y < HEIGHT; y++) {
  console.log(pixels[y].map((b) => (b ? '#' : ' ')).join(''))
}
