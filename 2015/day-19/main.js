import { readFile } from '../../utils/javascript/file-utils'

const FILE_NAME = 'input/input.txt'

const lines = readFile(FILE_NAME)

const replacements = []
for (let i = 0; i < lines.length - 2; i++) {
  const input = lines[i].split(' => ')[0]
  const output = lines[i].split(' => ')[1]

  const remplacement = replacements.find(r => r.input === input)
  if (remplacement) {
    remplacement.outputs.push(output)
  } else {
    replacements.push({ input, outputs: [output] })
  }
}

const molecule = [...lines[lines.length - 1].matchAll(/[A-Z][a-z]*/g)].map(match => match[0])

const keys = new Set()
for (let i = 0; i < replacements.length; i++) {
  const replacement = replacements[i]
  for (let k = 0; k < molecule.length; k++) {
    if (replacement.input === molecule[k]) {
      for (let j = 0; j < replacement.outputs.length; j++) {
        const output = replacement.outputs[j]
        keys.add(molecule.slice(0, k).join('') + output + molecule.slice(k + 1, molecule.length).join(''))
      }
    }
  }
}

console.log(keys.size)
