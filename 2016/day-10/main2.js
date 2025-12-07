import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const values = []
const bots = []

readFile(FILE_NAME).forEach((line) => {
  let match = line.match(/value (\d+) goes to bot (\d+)/)
  if (match) {
    const botId = parseInt(match[2])
    values.push({ value: parseInt(match[1]), botId })
    return
  }

  match = line.match(/bot (\d+) gives low to (bot|output) (\d+) and high to (bot|output) (\d+)/)
  const id = parseInt(match[1])
  const isLowOutput = match[2] === 'output'
  const low = parseInt(match[3])
  const isHighOutput = match[4] === 'output'
  const high = parseInt(match[5])
  bots.push({ id, low, isLowOutput, high, isHighOutput, values: [] })
})

for (let i = 0; i < values.length; i++) {
  const value = values[i]
  const bot = bots.find((b) => b.id === value.botId)
  bot.values.push(value.value)
}

let outputs = []
while (bots.some((bot) => bot.values.length === 2)) {
  for (let i = 0; i < bots.length; i++) {
    const bot = bots[i]
    if (bot.values.length === 2) {
      const values = bot.values.sort((a, b) => a - b)
      const lowBot = !bot.isLowOutput && bots.find((b) => b.id === bot.low)
      const highBot = !bot.isHighOutput && bots.find((b) => b.id === bot.high)

      if (lowBot) {
        lowBot.values.push(values[0])
      } else {
        outputs.push({ id: bot.low, value: values[0] })
      }

      if (highBot) {
        highBot.values.push(values[1])
      } else {
        outputs.push({ id: bot.high, value: values[1] })
      }

      bot.values = []
    }
  }
}

const result = outputs
  .filter((output) => output.id <= 2)
  .map((output) => output.value)
  .reduce((acc, val) => acc * val, 1)

console.log(result)
