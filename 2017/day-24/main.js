import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

let id = 0
const components = readFile(FILE_NAME).map((line) => {
  return {
    id: id++,
    ports: line.split('/').map((port) => parseInt(port)),
  }
})

const getMaximumStrength = (bridge, components, port) => {
  const compatibles = components.filter((component) => component.ports.includes(port))

  if (compatibles.length === 0) {
    let strength = 0
    for (const ports of bridge) {
      strength += ports[0] + ports[1]
    }
    return strength
  }

  const maximumStrength = [-Infinity]
  for (const compatible of compatibles) {
    maximumStrength.push(
      getMaximumStrength(
        [...bridge, compatible.ports],
        components.filter((component) => component.id !== compatible.id),
        compatible.ports[0] === port ? compatible.ports[1] : compatible.ports[0]
      )
    )
  }
  return Math.max(...maximumStrength)
}

const result = getMaximumStrength([], components, 0)
console.log(result)
