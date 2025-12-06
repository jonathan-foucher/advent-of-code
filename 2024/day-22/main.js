import { readFile } from '../../utils/javascript/file-utils'
import { xor } from '../../utils/javascript/math-utils'

const FILE_NAME = 'input/input.txt'

const N_ITERATIONS = 2000

const secrets = readFile(FILE_NAME).map((line) => parseInt(line))

for (let i = 0; i < N_ITERATIONS; i++) {
  for (let j = 0; j < secrets.length; j++) {
    let secret = secrets[j]
    secret = xor(secret * 64, secret) % 16777216
    secret = xor(secret / 32, secret) % 16777216
    secret = xor(secret * 2048, secret) % 16777216
    secrets[j] = secret
  }
}

let result = 0
for (let i = 0; i < secrets.length; i++) {
  result += secrets[i]
}

console.log(result)
