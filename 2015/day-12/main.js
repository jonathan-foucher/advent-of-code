import { readFile } from '../../utils/javascript/file-utils'

const FILE_NAME = 'input/input.txt' 

const input = readFile(FILE_NAME)[0]

const NUMBER_REGEX = /(\d+|-\d+)/g

const result = [...input.matchAll(NUMBER_REGEX)].map(match => parseInt(match[0]))
  .reduce((acc, val) => acc + val, 0)

console.log(result)
