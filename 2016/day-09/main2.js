import { readFile } from '../../utils/javascript/file-utils'

const FILE_NAME = 'input/input.txt'

const input = readFile(FILE_NAME)[0]
const REGEX_MARKER = /\(\d+x\d+\)/

const getStrValue = (str, mult) => {
  if (str === '') {
    return 0
  }

  const marker = str.match(REGEX_MARKER)
  if (!marker) {
    return str.length * mult
  }

  if (marker.index !== 0) {
    return marker.index * mult + getStrValue(str.slice(marker.index), mult)
  }

  const [nChar, nTime] = marker[0].replaceAll(/\(|\)/g, '')
      .split('x')
      .map(n => parseInt(n))

  const markerLength = marker[0].length

  let result = getStrValue(str.slice(markerLength, markerLength + nChar), mult * nTime)
  result += getStrValue(str.slice(markerLength + nChar), mult)
  return result
}

const result = getStrValue(input, 1)

console.log(result)
