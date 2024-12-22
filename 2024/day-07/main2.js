import { readFile } from '../../utils/javascript/file-utils'

const FILE_NAME = 'input/input.txt'

const result = readFile(FILE_NAME).map(line => {
  return {
    result: parseInt(line.split(': ')[0]),
    values: line.split(': ')[1].split(' ').map(n => parseInt(n)),
    posibilities: []
  }
})
  .map(eq => {
    eq.values.forEach((value, i) => {
      if (i === 0) {
        eq.posibilities.push(value)
      } else {
        eq.posibilities = eq.posibilities.flatMap(possibility => [
          possibility + value,
          possibility * value,
          parseInt("" + possibility + value)
        ])
      }
    })
    return eq
  })
  .filter(eq => eq.posibilities.includes(eq.result))
  .map(eq => eq.result)
  .reduce((acc , val) => acc + val, 0)

console.log(result)
