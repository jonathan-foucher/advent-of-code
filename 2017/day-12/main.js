import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const INITIAL_ID = 0

const PROGRAMS = readFile(FILE_NAME).map((line) => {
  const extracted = line.split(' <-> ')
  return {
    id: parseInt(extracted[0]),
    pipes: extracted[1].split(', ').map((char) => parseInt(char)),
  }
})

const getConnectedPrograms = (programId, connectedPrograms) => {
  const program = PROGRAMS.find((program) => program.id === programId)

  for (const pipe of program.pipes) {
    if (!connectedPrograms.includes(pipe)) {
      connectedPrograms.push(pipe)
      getConnectedPrograms(pipe, connectedPrograms)
    }
  }

  return connectedPrograms
}

const result = getConnectedPrograms(INITIAL_ID, []).length

console.log(result)
