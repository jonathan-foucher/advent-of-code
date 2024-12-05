import { readFile } from './file-utils'

const FILE_NAME = 'input/input.txt'

const rules = readFile(FILE_NAME)
  .filter(line => line.includes('|'))
  .map(line => line.split('|').map(n => parseInt(n)))

const updates = readFile(FILE_NAME)
  .filter(line => line.includes(','))
  .map(line => line.split(',').map(n => parseInt(n)))

const isRespectingRules = (update) => rules.every(rule => !update.includes(rule[0]) || !update.includes(rule[1]) 
  || update.indexOf(rule[0]) < update.indexOf(rule[1]))

const result = updates.filter(update => isRespectingRules(update))
  .map(update => update[(update.length + 1) / 2 - 1])
  .reduce((acc, val) => acc + val, 0)
  
console.log(result)
