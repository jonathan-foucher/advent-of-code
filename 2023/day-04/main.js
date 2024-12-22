import { readFile } from '../../utils/javascript/file-utils'

const FILE_NAME = 'input/input.txt'

const result = readFile(FILE_NAME)
  .map(line => {
    return {
      id: line.split(':')[0],
      winning_numbers: line.split(':')[1].split('|')[0].split(' ').filter(str => str).map(str => parseInt(str)),
      numbers: line.split(':')[1].split('|')[1].split(' ').filter(str => str).map(str => parseInt(str))
    }
  })
  .map(card => card.numbers.filter(n => card.winning_numbers.some(wn => wn === n)).length)
  .filter(count => count != 0)
  .map(count => Math.pow(2, count - 1))
  .reduce((acc, val) => acc + val, 0)

console.log(result)
