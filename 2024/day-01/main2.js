import { readFile } from './file-utils'

const FILE_NAME = 'input/input.txt'

const LEFT_LIST = []
const RIGHT_LIST = []

readFile(FILE_NAME)
  .forEach(line =>{
    const numbers = line.split('   ')
    LEFT_LIST.push(parseInt(numbers[0]))
    RIGHT_LIST.push(parseInt(numbers[1]))
  })

const result = LEFT_LIST.map((ln) => ln * RIGHT_LIST.filter(rn => rn === ln).length)
  .reduce((acc, val) => acc + val, 0)

console.log(result)
