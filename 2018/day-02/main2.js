import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const ids = readFile(FILE_NAME)
const ID_LENGTH = ids[0].length

let result = ''
mainloop: for (let i = 0; i < ids.length - 1; i++) {
  const id1 = ids[i]
  for (let j = i + 1; j < ids.length; j++) {
    const id2 = ids[j]
    let count = 0
    result = ''

    for (let k = 0; k < ID_LENGTH; k++) {
      if (id1[k] !== id2[k]) {
        count++
        if (count > 1) {
          break
        }
      } else {
        result += id1[k]
      }
    }

    if (count === 1) {
      break mainloop
    }
  }
}

console.log(result)
