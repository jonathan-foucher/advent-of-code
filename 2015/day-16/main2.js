import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const TARGET = {
  children: 3,
  cats: 7,
  samoyeds: 2,
  pomeranians: 3,
  akitas: 0,
  vizslas: 0,
  goldfish: 5,
  trees: 3,
  cars: 2,
  perfumes: 1,
}

const GREATER_KEYS = ['cats', 'trees']
const LESSER_KEYS = ['pomeranians', 'goldfish']

const aunts = readFile(FILE_NAME).map((line) => {
  const id = parseInt(/(?<=^Sue )\d+(?=:)/.exec(line)[0])
  const list = /(?<=^Sue \d+: ).*/
    .exec(line)[0]
    .split(', ')
    .map((element) => {
      return { key: element.split(': ')[0], value: parseInt(element.split(': ')[1]) }
    })
  return { id, list }
})

let result
for (let i = 0; i < aunts.length; i++) {
  const aunt = aunts[i]
  let isPossible = true
  for (let j = 0; j < aunt.list.length; j++) {
    const element = aunt.list[j]
    if (
      (GREATER_KEYS.includes(element.key) && TARGET[element.key] >= element.value)
      || (LESSER_KEYS.includes(element.key) && TARGET[element.key] <= element.value)
      || (!GREATER_KEYS.includes(element.key)
        && !LESSER_KEYS.includes(element.key)
        && TARGET[element.key] !== element.value)
    ) {
      isPossible = false
      break
    }
  }
  if (isPossible) {
    result = aunt.id
    break
  }
}

console.log(result)
