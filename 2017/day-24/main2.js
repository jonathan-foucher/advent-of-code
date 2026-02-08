import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

let id = 0
const components = readFile(FILE_NAME).map((line) => {
  return {
    id: id++,
    ports: line.split('/').map((port) => parseInt(port)),
  }
})

const getLongestBridgeWithMaximumStrength = (bridge, components, port) => {
  const compatibles = components.filter((component) => component.ports.includes(port))

  if (compatibles.length === 0) {
    return bridge
  }

  const bridges = []
  for (const compatible of compatibles) {
    bridges.push(
      getLongestBridgeWithMaximumStrength(
        [...bridge, compatible.ports],
        components.filter((component) => component.id !== compatible.id),
        compatible.ports[0] === port ? compatible.ports[1] : compatible.ports[0]
      )
    )
  }

  let longestBridge = []
  for (const bridge of bridges) {
    if (bridge.length > longestBridge.length) {
      longestBridge = bridge
    } else if (bridge.length === longestBridge.length) {
      let actualStrengh = 0
      for (const ports of longestBridge) {
        actualStrengh += ports[0] + ports[1]
      }

      let strength = 0
      for (const ports of bridge) {
        strength += ports[0] + ports[1]
      }

      if (strength > actualStrengh) {
        longestBridge = bridge
      }
    }
  }
  return longestBridge
}

const bridge = getLongestBridgeWithMaximumStrength([], components, 0)
let result = 0
for (const ports of bridge) {
  result += ports[0] + ports[1]
}
console.log(result)
