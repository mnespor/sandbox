'use strict'

const core = require('@actions/core')
const { promisify } = require('util')
const fs = require('fs')

;(async () => {
  try {
    core.setOutput('message', `Working directory: ${process.cwd()}; File location: ${__filename}`)
    
  } catch(error) {
    core.setFailed(error.message)
  }
})()

async function walk() {
  
}
