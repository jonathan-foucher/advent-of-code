import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

let guardId = null
const logs = readFile(FILE_NAME)
  .sort()
  .map((line) => {
    const regexResult = /Guard #(?<id>\d+) begins shift$/.exec(line)
    if (regexResult !== null) {
      guardId = parseInt(regexResult.groups['id'])
      return null
    }

    return {
      minute: parseInt(/^\[.+:(?<minute>\d\d)\]/.exec(line).groups['minute']),
      guardId,
    }
  })
  .filter((log) => log !== null)

const totalSleepingTime = []
for (let i = 0; i < logs.length; i += 2) {
  const logFallAsleep = logs[i]
  const logWakingUp = logs[i + 1]
  totalSleepingTime[logFallAsleep.guardId] =
    (totalSleepingTime[logFallAsleep.guardId] ?? 0) + logWakingUp.minute - logFallAsleep.minute
}

const maxTotalSleepingTime = Math.max(...totalSleepingTime.filter((value) => value))
const maxSleepingGuardId = totalSleepingTime.findIndex((value) => value === maxTotalSleepingTime)

let guardLogs = logs.filter((log) => log.guardId === maxSleepingGuardId)
let totalSleepingTimeByMinute = []
for (let i = 0; i < guardLogs.length; i += 2) {
  const logFallAsleep = guardLogs[i]
  const logWakingUp = guardLogs[i + 1]
  for (let j = logFallAsleep.minute; j < logWakingUp.minute; j++) {
    totalSleepingTimeByMinute[j] = (totalSleepingTimeByMinute[j] ?? 0) + 1
  }
}

const maxSleepingTimeByMinute = Math.max(...totalSleepingTimeByMinute.filter((value) => value))
const maxSleepingTimeMinute = totalSleepingTimeByMinute.findIndex((value) => value === maxSleepingTimeByMinute)
const result = maxSleepingTimeMinute * maxSleepingGuardId

console.log(result)
