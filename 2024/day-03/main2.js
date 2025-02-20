import { readFile } from '../../utils/javascript/file-utils'

const FILE_NAME = 'input/input.txt'

const MUL_REGEX = /mul\([0-9]{1,3},[0-9]{1,3}\)/g

const result = readFile(FILE_NAME)
  .join('').split('do()')
  .flatMap(line => line.split('don\'t()')[0])
  .flatMap(line => line.match(MUL_REGEX))
  .map(str => {
    const res = str.replace('mul(', '').replace(')', '').split(',')
    return parseInt(res[0]) * parseInt(res[1])
  })
  .reduce((acc, val) => acc + val, 0)

console.log(result)
