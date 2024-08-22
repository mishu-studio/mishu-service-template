#!/usr/bin/env node

import chalk from 'chalk'

import { generateFiles } from './lib/generateFiles.js'
import { getDependencies } from './lib/getDependancies.js'
import { installDependencies } from './lib/installDependencies.js'
import { printBanner } from './lib/printBanner.js'
import { promptGitInit } from './lib/promptGitInit.js'
import { propmptUser } from './lib/promptUser.js'

async function run() {
  printBanner()

  const answers = await propmptUser()
  const { baseDependencies, devDependencies } = getDependencies(answers)

  generateFiles(answers)
  installDependencies(baseDependencies, devDependencies)
  await promptGitInit()

  console.log(chalk.magentaBright('🚀 Project setup completed! Have fun coding! 👾'))
}

run()
