import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const cards = readFile(FILE_NAME).map((line) => {
  const winningNumbers = line
    .split(':')[1]
    .split('|')[0]
    .split(' ')
    .filter((str) => str)
    .map((str) => parseInt(str))
  const numbers = line
    .split(':')[1]
    .split('|')[1]
    .split(' ')
    .filter((str) => str)
    .map((str) => parseInt(str))
  const matchCount = numbers.filter((n) => winningNumbers.some((wn) => wn === n)).length
  return {
    id: line.split(':')[0],
    winning_numbers: winningNumbers,
    numbers,
    match_count: matchCount,
  }
})

let multipliers = []

const result = cards.flatMap((card, i) => {
  const res = []
  const multiplier = multipliers.length
  multipliers = multipliers.map((n) => n - 1).filter((n) => n != 0)
  for (i = 0; i <= multiplier; i++) {
    res.push(card)
    if (card.match_count > 0) {
      multipliers.push(card.match_count)
    }
  }
  return res
}).length

console.log(result)
