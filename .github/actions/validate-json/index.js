'use strict'

const core = require('@actions/core')
const fs = require('fs').promises
const { join } = require('path')

async function find(path, predicate) {
  const paths = []
  await walk(path, 100, filePath => {
    if (predicate(filePath)) {
      paths.push(filePath)
    }
  })

  return paths
}

async function walk(path, maxdepth, callback) {
  if (maxDepth <= 0) {
    return
  }

  for (let dirent of await fs.readdir(path, { withFileTypes: true })) {
    if (dirent.name === '.git' || dirent.name == '.github') {
      continue
    }

    if (dirent.isDirectory()) {
      await walk(join(path, maxdepth - 1, dirent.name), callback)
    } else if (dirent.isFile()) {
      callback(join(path, dirent.name))
    }
  }
}

;(async () => {
  const paths = await find('.', path => /\.json$/.test(path))
  const errors = []
  for (let path of paths) {
    try {
      JSON.parse(await fs.readFile(path, 'utf8'))
    } catch (error) {
      errors.push(`${path}: ${error.message}`)
    }
  }

  if (errors.length) {
    core.setFailed(errors.join('\n'))
  } else {
    core.setOutput('message', 'Success')
  }
})()
