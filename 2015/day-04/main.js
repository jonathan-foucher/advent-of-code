import { readFile } from '../../utils/javascript/file-utils'

const FILE_NAME = 'input/input.txt' 

const input = readFile(FILE_NAME)[0]

const leftBitsRotate = (inputNumber, nRotation, totalBits) => {
  nRotation = nRotation % totalBits;
  const inputBits = inputNumber.toString(2).padStart(totalBits, '0')
  return parseInt(inputBits.slice(nRotation) + inputBits.slice(0, nRotation), 2)
}

const intToHexLittleEndianStr = (n, size = 4) => {
  const nStr = n.toString(16).padStart(2 * size, '0')
  let result = ''
  for (let i = (size - 1) * 2; i >= 0; i = i - 2) {
    result += nStr.slice(i, i + 2)
  }
  return result
}

const s = [
  7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
  5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20,
  4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23,
  6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21
]

const K = [
  0xd76aa478, 0xe8c7b756, 0x242070db, 0xc1bdceee,
  0xf57c0faf, 0x4787c62a, 0xa8304613, 0xfd469501,
  0x698098d8, 0x8b44f7af, 0xffff5bb1, 0x895cd7be,
  0x6b901122, 0xfd987193, 0xa679438e, 0x49b40821,
  
  0xf61e2562, 0xc040b340, 0x265e5a51, 0xe9b6c7aa,
  0xd62f105d, 0x02441453, 0xd8a1e681, 0xe7d3fbc8,
  0x21e1cde6, 0xc33707d6, 0xf4d50d87, 0x455a14ed,
  0xa9e3e905, 0xfcefa3f8, 0x676f02d9, 0x8d2a4c8a,
  
  0xfffa3942, 0x8771f681, 0x6d9d6122, 0xfde5380c,
  0xa4beea44, 0x4bdecfa9, 0xf6bb4b60, 0xbebfbc70,
  0x289b7ec6, 0xeaa127fa, 0xd4ef3085, 0x04881d05,
  0xd9d4d039, 0xe6db99e5, 0x1fa27cf8, 0xc4ac5665,
  
  0xf4292244, 0x432aff97, 0xab9423a7, 0xfc93a039,
  0x655b59c3, 0x8f0ccc92, 0xffeff47d, 0x85845dd1,
  0x6fa87e4f, 0xfe2ce6e0, 0xa3014314, 0x4e0811a1,
  0xf7537e82, 0xbd3af235, 0x2ad7d2bb, 0xeb86d391
]

const md5 = (inputStr) => {
  let inputHex = inputStr.split('')
    .map(char => char.charCodeAt(0)
      .toString(16)
      .padStart(2, '0'))
    .join('')

  const length = inputHex.length * 4
  
  inputHex += "80"
  while (inputHex.length % 128 !== 112) {
    inputHex += "00"
  }
  
  const lengthHex = intToHexLittleEndianStr(length % (2 ** 64), 8)
  inputHex += lengthHex
  
  let a0 = 0x67452301
  let b0 = 0xefcdab89
  let c0 = 0x98badcfe
  let d0 = 0x10325476
  
  for (let j = 0; j < inputHex.length; j += 128) {
    const chunk = inputHex.slice(j, j + 128)
    
    const M = []
    for (let k = 0; k < 128; k += 8) {
      M.push(parseInt(intToHexLittleEndianStr(parseInt(chunk.slice(k, k + 8), 16)), 16))
    }
    
    let A = a0, B = b0, C = c0, D = d0
    
    for (let i = 0; i < 64; i++) {
      let F, g
      if (0 <= i && i < 16) {
        F = (B & C) | ((~B >>> 0) & D)
        g = i
      } else if (16 <= i && i < 32) {
        F = (D & B) | ((~D >>> 0) & C)
        g = (5 * i + 1) % 16
      } else if (32 <= i && i < 48) {
        F = B ^ C ^ D
        g = (3 * i + 5) % 16
      } else if (48 <= i && i < 64) {
        F = C ^ (B | (~D >>> 0))
        g = (7 * i) % 16
      }
      
      F = (F + A + K[i] + M[g]) >>> 0
      A = D
      D = C
      C = B
      B = (B + leftBitsRotate(F, s[i], 32)) >>> 0
    }
    
    a0 = (a0 + A) >>> 0
    b0 = (b0 + B) >>> 0
    c0 = (c0 + C) >>> 0
    d0 = (d0 + D) >>> 0
  }
  
  return intToHexLittleEndianStr(a0) + intToHexLittleEndianStr(b0) 
  + intToHexLittleEndianStr(c0) + intToHexLittleEndianStr(d0)
}

let i = 0
while (!md5(input + i).startsWith('000000')) {
  i++
}

console.log(i)
