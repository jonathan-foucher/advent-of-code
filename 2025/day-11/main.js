import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const START = 'you'
const END = 'out'

const DEVICES = readFile(FILE_NAME).map((line) => {
  const name = line.split(': ')[0]
  const outputs = line.split(': ')[1].split(' ')
  return { name, outputs }
})

const countPaths = (path, deviceName) => {
  if (deviceName === END) {
    return 1
  }

  const device = DEVICES.find((d) => deviceName === d.name)

  let counter = 0
  for (let i = 0; i < device.outputs.length; i++) {
    counter += countPaths(path + '-' + device.outputs[i], device.outputs[i])
  }

  return counter
}

console.log(countPaths('', START))
