import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const LEFT_LIST = []
const RIGHT_LIST = []

readFile(FILE_NAME).forEach((line) => {
  const numbers = line.split('   ')
  LEFT_LIST.push(parseInt(numbers[0]))
  RIGHT_LIST.push(parseInt(numbers[1]))
})

LEFT_LIST.sort()
RIGHT_LIST.sort()

const result = LEFT_LIST.map((n, i) => (n > RIGHT_LIST[i] ? n - RIGHT_LIST[i] : RIGHT_LIST[i] - n)).reduce(
  (acc, val) => acc + val,
  0
)

console.log(result)
