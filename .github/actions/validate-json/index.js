'use strict'

const core = require('@actions/core')
const { promisify } = require('util')
const fs = require('fs')

;(async () => {
  try {
    core.setOutput('message', 'Success')
  } catch(error) {
    core.setFailed(error.message)
  }
})()
