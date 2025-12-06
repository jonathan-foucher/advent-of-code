const leftBitsRotate = (inputNumber, nRotation) => {
  return (inputNumber << nRotation) | (inputNumber >>> (32 - nRotation))
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

export const md5 = (inputStr) => {
  const length = Math.ceil((inputStr.length + 9) / 64) * 64
  let input = new Uint8Array(length)
  let i = 0

  while (i < inputStr.length) {
    input[i] = inputStr.charCodeAt(i)
    i++
  }

  input[i] = 0x80
  i++

  while (i < length - 8) {
    input[i] = 0x00
    i++
  }

  let bitsLength = (inputStr.length * 8) % 2 ** 64
  for (let _ = 0; _ < 8; _++) {
    input[i] = bitsLength & 0xff
    bitsLength = bitsLength >>> 8
    i++
  }

  let a0 = 0x67452301,
    b0 = 0xefcdab89,
    c0 = 0x98badcfe,
    d0 = 0x10325476

  for (let j = 0; j < input.length; j += 64) {
    const chunk = input.slice(j, j + 64)

    const M = new Uint32Array(16)
    for (let k = 0; k < 64; k += 4) {
      M[k / 4] = chunk[k] | (chunk[k + 1] << 8) | (chunk[k + 2] << 16) | (chunk[k + 3] << 24)
    }

    let A = a0,
      B = b0,
      C = c0,
      D = d0

    for (let i = 0; i < 64; i++) {
      let F, g
      if (0 <= i && i < 16) {
        F = (B & C) | (~B & D)
        g = i
      } else if (16 <= i && i < 32) {
        F = (D & B) | (~D & C)
        g = (5 * i + 1) % 16
      } else if (32 <= i && i < 48) {
        F = B ^ C ^ D
        g = (3 * i + 5) % 16
      } else if (48 <= i && i < 64) {
        F = C ^ (B | ~D)
        g = (7 * i) % 16
      }

      F = (F + A + K[i] + M[g]) >>> 0
      A = D
      D = C
      C = B
      B = (B + leftBitsRotate(F, s[i])) >>> 0
    }

    a0 = (a0 + A) >>> 0
    b0 = (b0 + B) >>> 0
    c0 = (c0 + C) >>> 0
    d0 = (d0 + D) >>> 0
  }

  const result = []
  for (let j = 0; j < 4; j++) {
    result[j] = (a0 & 0xff).toString(16).padStart(2, '0')
    a0 >>>= 8

    result[j + 4] = (b0 & 0xff).toString(16).padStart(2, '0')
    b0 >>>= 8

    result[j + 8] = (c0 & 0xff).toString(16).padStart(2, '0')
    c0 >>>= 8

    result[j + 12] = (d0 & 0xff).toString(16).padStart(2, '0')
    d0 >>>= 8
  }

  return result.join('')
}
