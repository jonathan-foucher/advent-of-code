import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const SVR = 'svr'
const DAC = 'dac'
const FFT = 'fft'
const OUT = 'out'

const CHILD_DEPTH_EXCLUSION = 5

const OUTPUTS_MAP = new Map()

readFile(FILE_NAME).forEach((line) => {
  const name = line.split(': ')[0]
  const outputs = line.split(': ')[1].split(' ')
  OUTPUTS_MAP.set(name, outputs)
})

let cache

const countPaths = (path, name, end, exclusions) => {
  if (name === end) {
    return 1
  }

  const outputs = OUTPUTS_MAP.get(name)

  const cachedResult = cache.get(name)
  if (cachedResult) {
    return cachedResult
  }

  let counter = 0
  for (let i = 0; i < outputs.length; i++) {
    const next = outputs[i]
    if (!exclusions.includes(next)) {
      counter += countPaths(`${path}-${next}`, next, end, exclusions)
    }
  }

  cache.set(name, counter)
  return counter
}

const getChildren = (name, depth) => {
  if (depth === 0) {
    return []
  }

  const outputs = OUTPUTS_MAP.get(name)
  if (!outputs) {
    return []
  }
  return outputs.flatMap((output) => [output, ...getChildren(output, depth - 1)])
}

const execSubPath = (path, name, end, exclusions) => {
  cache = new Map()

  const totalExlcusion = [...exclusions, ...getChildren(end, CHILD_DEPTH_EXCLUSION)].reduce((acc, val) => {
    if (!acc.includes(val)) {
      acc.push(val)
    }
    return acc
  }, [])

  return countPaths(path, name, end, [...exclusions, ...totalExlcusion])
}

const svr_dac = execSubPath(SVR, SVR, DAC, [FFT, OUT])
const dac_fft = execSubPath(DAC, DAC, FFT, [SVR, OUT])
const fft_out = execSubPath(FFT, FFT, OUT, [SVR, DAC])

const svr_fft = execSubPath(SVR, SVR, FFT, [DAC, OUT])
const fft_dac = execSubPath(FFT, FFT, DAC, [SVR, OUT])
const dac_out = execSubPath(DAC, DAC, OUT, [SVR, FFT])

console.log(svr_dac * dac_fft * fft_out + svr_fft * fft_dac * dac_out)
