import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

let guardId = null
let guards = []
const logs = readFile(FILE_NAME)
  .sort()
  .map((line) => {
    const regexResult = /Guard #(?<id>\d+) begins shift$/.exec(line)
    if (regexResult !== null) {
      guardId = parseInt(regexResult.groups['id'])
      guards[guardId] = []
      return null
    }

    return {
      minute: parseInt(/^\[.+:(?<minute>\d\d)\]/.exec(line).groups['minute']),
      guardId,
    }
  })
  .filter((log) => log !== null)

for (let i = 0; i < logs.length; i += 2) {
  const logFallAsleep = logs[i]
  const logWakingUp = logs[i + 1]
  for (let j = logFallAsleep.minute; j < logWakingUp.minute; j++) {
    guards[logFallAsleep.guardId][j] = (guards[logFallAsleep.guardId][j] ?? 0) + 1
  }
}

guardId = null
let minute = null
let maxValue = 0
for (let i = 0; i < guards.length; i++) {
  const guard = guards[i]
  if (guard === undefined) {
    continue
  }
  for (let j = 0; j < guard.length; j++) {
    if (guard[j] === undefined) {
      continue
    }

    if (guard[j] > maxValue) {
      maxValue = guard[j]
      minute = j
      guardId = i
    }
  }
}

const result = guardId * minute

console.log(result)
