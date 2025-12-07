import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const lines = readFile(FILE_NAME)

const molecule = [...lines[lines.length - 1].matchAll(/[A-Z][a-z]*/g)].map((match) => match[0]).join('')

const TARGET = 'e'

const REPLACEMENTS = []
for (let i = 0; i < lines.length - 2; i++) {
  const input = lines[i].split(' => ')[0]
  const output = lines[i].split(' => ')[1]
  REPLACEMENTS.push({ input, output })
}

const getLowestReplacements = (molecule, n) => {
  if (molecule === TARGET) {
    return n
  }

  for (let i = 0; i < REPLACEMENTS.length; i++) {
    const replacement = REPLACEMENTS[i]
    const matches = [...molecule.matchAll(replacement.output)].filter((match) => match) || []
    for (let j = 0; j < matches.length; j++) {
      const match = matches[j]
      const newStr =
        match.input.slice(0, match.index)
        + match.input.slice(match.index, match.input.length).replace(replacement.output, replacement.input)
      const result = getLowestReplacements(newStr, n + 1)
      if (result > 0) {
        return result
      }
    }
  }
  return -1
}

const result = getLowestReplacements(molecule, 0)

console.log(result)
