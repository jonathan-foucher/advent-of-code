import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'
const REGEX = /^(?<name>\w+) \(\d+\)($| -> (?<children>[a-z, ]+)$)/

const PROGRAMS = readFile(FILE_NAME).map((line) => {
  const regexResult = REGEX.exec(line)
  return {
    name: regexResult.groups['name'],
    children: regexResult.groups['children']?.split(', '),
  }
})

const getBottomProgram = (programs) => {
  const allChildren = []
  for (const program of programs) {
    for (const child of program.children ?? []) {
      if (!allChildren.includes(child)) {
        allChildren.push(child)
      }
    }
  }

  for (const program of programs) {
    if (!allChildren.includes(program.name)) {
      return program.name
    }
  }
}

const result = getBottomProgram(PROGRAMS)
console.log(result)
