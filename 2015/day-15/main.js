import { readFile } from '../../utils/javascript/file-utils'

const FILE_NAME = 'input/input.txt'

const NUMBER_TEASPOONS = 100

const ingredients = readFile(FILE_NAME).map((line) => {
  const capacity = parseInt(/(?<=capacity )(\d+|-\d+)/.exec(line)[0])
  const durability = parseInt(/(?<=durability )(\d+|-\d+)/.exec(line)[0])
  const flavor = parseInt(/(?<=flavor )(\d+|-\d+)/.exec(line)[0])
  const texture = parseInt(/(?<=texture )(\d+|-\d+)/.exec(line)[0])
  return { capacity, durability, flavor, texture }
})

let result = 0
for (let i = 0; i <= NUMBER_TEASPOONS; i++) {
  for (let j = 0; j <= NUMBER_TEASPOONS - i; j++) {
    for (let k = 0; k <= NUMBER_TEASPOONS - i - j; k++) {
      for (let l = 0; l <= NUMBER_TEASPOONS - i - j - k; l++) {
        if (i + j + k + l === NUMBER_TEASPOONS) {
          const capacity =
            i * ingredients[0].capacity
            + j * ingredients[1].capacity
            + k * ingredients[2].capacity
            + l * ingredients[3].capacity

          const durability =
            i * ingredients[0].durability
            + j * ingredients[1].durability
            + k * ingredients[2].durability
            + l * ingredients[3].durability

          const flavor =
            i * ingredients[0].flavor
            + j * ingredients[1].flavor
            + k * ingredients[2].flavor
            + l * ingredients[3].flavor

          const texture =
            i * ingredients[0].texture
            + j * ingredients[1].texture
            + k * ingredients[2].texture
            + l * ingredients[3].texture

          const score = capacity * durability * flavor * texture
          if (capacity > 0 && durability > 0 && flavor > 0 && texture > 0 && score > result) {
            result = score
          }
        }
      }
    }
  }
}

console.log(result)
