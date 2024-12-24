import { readFile } from '../../utils/javascript/file-utils'

const FILE_NAME = 'input/input.txt' 

const lines = readFile(FILE_NAME)
const Z_REGEX = /^z\d\d$/

const outputs = new Map()
const ops = new Map()
let nbGates = 0

for (let i = 0; i < lines.length; i++) {
  const line = lines[i]
  if (line.includes('->')) {
    if (Z_REGEX.test(line.split(' -> ')[1])) {
      nbGates++
    }
    outputs.set(line.split(' -> ')[0], line.split(' -> ')[1])
    ops.set(line.split(' -> ')[1], line.split(' -> ')[0])
  }
}

let swaps = []

const checkBit = (counter, maxDepth, inputs) => {
  if (maxDepth < counter) {
    return
  }
  
  const iStr = ("0" + counter).slice(-2)
  const iPrevStr = ("0" + (counter - 1)).slice(-2)
  
  const inputsAnd = outputs.get(inputs.join(' AND ')) || outputs.get(inputs.reverse().join(' AND '))
  
  const prevAnd = outputs.get(`x${iPrevStr} AND y${iPrevStr}`) || outputs.get(`y${iPrevStr} AND x${iPrevStr}`)
  
  const or = outputs.get([inputsAnd, prevAnd].join(' OR ')) || outputs.get([prevAnd, inputsAnd].join(' OR '))
  
  let xor = outputs.get(`x${iStr} XOR y${iStr}`) || outputs.get(`y${iStr} XOR x${iStr}`)
  
  const xorXor = counter === 0 ? xor
    : counter === 1 ? (outputs.get([xor, prevAnd].join(' XOR ')) || outputs.get([prevAnd, xor].join(' XOR ')))
    : (outputs.get([or, xor].join(' XOR ')) || outputs.get([xor, or].join(' XOR ')))

  if (xorXor && xorXor !== `z${iStr}`) {
    const opXorXor = ops.get(xorXor)
    const opZ = ops.get(`z${iStr}`)
    outputs.set(opXorXor, `z${iStr}`)
    outputs.set(opZ, xorXor)
    
    swaps.push(xorXor)
    swaps.push(`z${iStr}`)
  }
  
  if (counter !== maxDepth && !xorXor && !ops.get(`z${iStr}`).split(' XOR ').includes(xor)) {
    const zPartToSwap = ops.get(`z${iStr}`).split(' XOR ').filter(key => key !== or)[0]
    const opXor = ops.get(xor)
    const opZSwap = ops.get(zPartToSwap)
    outputs.set(opZSwap, xor)
    outputs.set(opXor, zPartToSwap)
    
    swaps.push(xor)
    swaps.push(zPartToSwap)
    xor = zPartToSwap
  }
  
  const nextInputs = counter === 0 ? [ 'x00', 'y00' ]
    : counter === 1 ? [ xor, prevAnd ]
    : [xor, or]
  checkBit(counter + 1, maxDepth, nextInputs)
}

checkBit(0, nbGates - 1, [])

console.log(swaps.sort().join(','))
