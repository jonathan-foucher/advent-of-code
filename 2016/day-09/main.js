import { readFile } from '../../utils/javascript/file-utils'

const FILE_NAME = 'input/input.txt'

const input = readFile(FILE_NAME)[0]
const REGEX_MARKER = /\(\d+x\d+\)/g
const markers = input.matchAll(REGEX_MARKER).toArray()

let inputIndex = 0
let result = 0
for (let i = 0; i < markers.length; i++) {
  const marker = markers[i]
  if (marker.index < inputIndex) {
    continue
  }

  const [nChar, nTime] = marker[0].replaceAll(/\(|\)/g, '')
    .split('x')
    .map(n => parseInt(n))
  const markerLength = marker[0].length
  result += (nChar * nTime) + marker.index - inputIndex
  inputIndex = marker.index + markerLength + nChar
}
result += input.length - inputIndex

console.log(result)
