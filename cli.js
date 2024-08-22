#!/usr/bin/env node

import chalk from 'chalk'
import { initProject } from './lib/initProject.js'
import { generateCrud } from './lib/generateCrud.js'

async function run() {
  const args = process.argv.slice(2)

  if (args.length === 0) {
    await initProject()
  } else {
    const command = args[0]

    switch (command) {
      case 'gen':
        if (!args[1]) {
          console.log(chalk.red('Please provide a component name'))
          return
        }

        await generateCrud(args[1])
        break
      default:
        break
    }
  }
}

run()
