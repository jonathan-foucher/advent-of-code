import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const rooms = readFile(FILE_NAME).map((line) => {
  const name = /^.+(?=-\d+)/.exec(line)[0]
  const sectorId = parseInt(/(?<=-)\d+(?=\[)/.exec(line)[0])
  const checksum = /(?<=\[)[a-z]+(?=\]$)/.exec(line)[0]
  return { name, sectorId, checksum }
})

let result = 0
for (let i = 0; i < rooms.length; i++) {
  const room = rooms[i]

  const checksum = room.name
    .split('')
    .filter((letter) => letter !== '-')
    .reduce((acc, val) => {
      let found = acc.find((e) => e.letter === val)
      if (found) {
        found.count++
      } else {
        acc.push({ letter: val, count: 1 })
      }
      return acc
    }, [])
    .sort((a, b) => {
      if (a.count > b.count) {
        return -1
      }
      if (a.count < b.count) {
        return 1
      }

      if (a.letter > b.letter) {
        return 1
      }

      return -1
    })
    .map((e) => e.letter)
    .slice(0, 5)
    .join('')

  if (room.checksum === checksum) {
    result += room.sectorId
  }
}

console.log(result)
