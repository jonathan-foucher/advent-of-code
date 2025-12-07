import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const lines = readFile(FILE_NAME)

const connectionsMap = new Map()

for (let i = 0; i < lines.length; i++) {
  const firstComputerId = lines[i].split('-')[0]
  const secondComputerId = lines[i].split('-')[1]

  const firstComputer = connectionsMap.get(firstComputerId)
  if (firstComputer) {
    firstComputer.push(secondComputerId)
  } else {
    connectionsMap.set(firstComputerId, [secondComputerId])
  }

  const secondComputer = connectionsMap.get(secondComputerId)
  if (secondComputer) {
    secondComputer.push(firstComputerId)
  } else {
    connectionsMap.set(secondComputerId, [firstComputerId])
  }
}

const computersConnections = Array.from(connectionsMap.entries())
const connections = []
for (let i = 0; i < computersConnections.length; i++) {
  const connection = computersConnections[i]
  const firstId = connection[0]

  for (let j = 0; j < connection[1].length; j++) {
    const secondId = connection[1][j]
    const currentConnections = [firstId, secondId]

    for (let k = 0; k < connection[1].length; k++) {
      if (j !== k) {
        const thirdId = connection[1][k]
        const thirdConnections = connectionsMap.get(thirdId)
        if (
          currentConnections.every((c) => thirdConnections.includes(c))
          && connectionsMap.get(secondId).includes(thirdId)
        ) {
          currentConnections.push(thirdId)
        }
      }
    }
    const key = currentConnections.sort().join(',')
    if (!connections.includes(key)) {
      connections.push(key)
    }
  }
}

let result = connections[0]
for (let i = 1; i < connections.length; i++) {
  const connection = connections[i]
  if (result.length < connection.length) {
    result = connection
  }
}

console.log(result)
