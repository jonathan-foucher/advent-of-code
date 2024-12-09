import fs from 'fs'

export const readFile = (filePath) => {
  return fs.readFileSync(filePath, 'utf8').split(/\r?\n/)
}

export const writeFile = (filePath, lines) => {
  const data = lines.join('\n')
  fs.writeFile(filePath, data, (err) => {
    if (err) {
      return console.error(err)
    }
    console.info(filePath + ' was written')
  })
}
