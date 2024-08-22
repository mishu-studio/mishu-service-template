import { printBanner } from './printBanner.js'
import { promptUser } from './promptUser.js'
import { getDependencies } from './getDependencies.js'
import { generateFiles } from './generateFiles.js'
import { installDependencies } from './installDependencies.js'
import { promptGitInit } from './promptGitInit.js'
import chalk from 'chalk'

export async function initProject() {
  printBanner()

  const answers = await promptUser()
  const { baseDependencies, devDependencies } = getDependencies(answers)

  generateFiles(answers)
  installDependencies(baseDependencies, devDependencies, answers)
  await promptGitInit(answers)

  console.log(chalk.magentaBright('🚀 Project setup completed! Have fun coding! 👾'))
}
