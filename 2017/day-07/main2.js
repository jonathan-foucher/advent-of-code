import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'
const REGEX = /^(?<name>\w+) \((?<weight>\d+)\)($| -> (?<children>[a-z, ]+)$)/

const PROGRAMS = readFile(FILE_NAME).map((line) => {
  const regexResult = REGEX.exec(line)
  return {
    name: regexResult.groups['name'],
    children: regexResult.groups['children']?.split(', '),
    weight: parseInt(regexResult.groups['weight']),
    totalWeight: parseInt(regexResult.groups['weight']),
  }
})

let nextChildren = PROGRAMS.filter((program) => program.children === undefined)
let currentChildren
do {
  currentChildren = nextChildren
  nextChildren = []

  for (const child of currentChildren) {
    PROGRAMS.filter((program) => program.children?.includes(child.name)).forEach((program) => {
      program.totalWeight += child.totalWeight

      if (nextChildren.find((child) => child.name === program.name) === undefined) {
        nextChildren.push(program)
      }
    })
  }
} while (nextChildren.length !== 0)

const getUnbalancedProgram = (programs) => {
  for (const program of programs.filter((program) => program.children !== undefined)) {
    const children = program.children

    for (let i = 0; i < children.length; i++) {
      const child = PROGRAMS.find((p) => p.name === children[i])
      const next = PROGRAMS.find((p) => p.name === children[(i + 1) % children.length])
      const nextOfNext = PROGRAMS.find((p) => p.name === children[(i + 2) % children.length])

      if (child.totalWeight !== next.totalWeight && child.totalWeight !== nextOfNext.totalWeight) {
        return child.weight + next.totalWeight - child.totalWeight
      }
    }
  }
}

const result = getUnbalancedProgram(PROGRAMS)
console.log(result)
