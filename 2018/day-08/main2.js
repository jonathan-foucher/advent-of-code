import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const node = readFile(FILE_NAME)[0]
  .split(' ')
  .map((str) => parseInt(str))

const getMetadataSum = (node) => {
  const nNodes = node[0]
  const nMetadata = node[1]
  node = node.slice(2)

  let subSums = [0]
  for (let _ = 0; _ < nNodes; _++) {
    const childResult = getMetadataSum(node)
    subSums.push(childResult.sum)
    node = childResult.node
  }

  let sum = 0
  for (let i = 0; i < nMetadata; i++) {
    if (nNodes === 0) {
      sum += node[i]
    } else {
      const value = subSums[node[i]]
      if (value !== undefined) {
        sum += value
      }
    }
  }
  node = node.slice(nMetadata)
  return { sum, node }
}

const result = getMetadataSum(node).sum

console.log(result)
