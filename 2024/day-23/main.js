import { readFile } from '../../utils/javascript/file-utils'

const FILE_NAME ='input/input.txt'

const lines = readFile(FILE_NAME)

const connectionsMap = new Map()

for (let i = 0; i < lines.length; i++) {
  const firstComputerId = lines[i].split('-')[0]
  const secondComputerId = lines[i].split('-')[1]

  const firstComputer = connectionsMap.get(firstComputerId)
  if (firstComputer) {
    firstComputer.push(secondComputerId)
  } else {
    connectionsMap.set(firstComputerId, [ secondComputerId ])
  }

  const secondComputer = connectionsMap.get(secondComputerId)
  if (secondComputer) {
    secondComputer.push(firstComputerId)
  } else {
    connectionsMap.set(secondComputerId, [ firstComputerId ])
  }
}

const computersConnections = Array.from(connectionsMap.entries())
const threeConnections = []
let result = 0
for (let i = 0; i < computersConnections.length; i++) {
  const connection = computersConnections[i]
  const firstId = connection[0]
  
  for (let j = 0; j < connection[1].length; j++) {
    const secondId = connection[1][j]

    for (let k = 0; k < connection[1].length; k++) {
      if (j !== k) {
        const thirdId = connection[1][k]
        if (firstId[0] === 't' || secondId[0] === 't' || thirdId[0] === 't') {
          const key = [firstId, secondId, thirdId].sort().join('-')
          if (!threeConnections.includes(key)
            && connectionsMap.get(secondId).includes(thirdId)
          ) {
              threeConnections.push(key)
              result++
            }
          }
      }
    }
  }
}

console.log(result)
