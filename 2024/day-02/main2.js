import { readFile } from '../../utils/javascript/file-utils'

const FILE_NAME = 'input/input.txt'

const isSafe = (report) => {
    return report.every((val, i) => i === report.length - 1 || val - report[i + 1] <= 3 && val - report[i + 1] >= 1)
      || report.every((val, i) => i === report.length - 1 || val - report[i + 1] <= -1 && val - report[i + 1] >= -3)
}

const getAllPossibleReports = (report) => {
  const res = []
  for (let i = 0; i < report.length; i++) {
    res.push(report.toSpliced(i, 1))
  }
  return res
}

const result = readFile(FILE_NAME)
  .map(line => line.split(' ').map(str => parseInt(str)))
  .map(report => getAllPossibleReports(report))
  .filter(possibilities => possibilities.some(report => isSafe(report)))
  .length

console.log(result)
