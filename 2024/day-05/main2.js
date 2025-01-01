import { readFile } from '../../utils/javascript/file-utils'

const FILE_NAME = 'input/input.txt'

const rules = readFile(FILE_NAME)
  .filter(line => line.includes('|'))
  .map(line => line.split('|').map(n => parseInt(n)))

const updates = readFile(FILE_NAME)
  .filter(line => line.includes(','))
  .map(line => line.split(',').map(n => parseInt(n)))

const isRespectingRules = (update) => rules.every(rule => !update.includes(rule[0]) || !update.includes(rule[1])
  || update.indexOf(rule[0]) < update.indexOf(rule[1]))

let result = updates.filter(update => !isRespectingRules(update))
  .map(update => update.sort((a, b) => {
    const rule = rules.find(r => r.includes(a) && r.includes(b))
    if (rule) {
      if (rule[0] === a) {
          return -1
        } else {
          return 1
      }
    }
    return 0
  }))
  .map(update => update[(update.length + 1) / 2 - 1])
  .reduce((acc, val) => acc + val, 0)

console.log(result)
