import inquirer from 'inquirer'
import chalk from 'chalk'
import { execSync } from 'child_process'

export async function promptGitInit(answers) {
  const { gitInit } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'gitInit',
      message: 'Do you want to initialize a Git repository?',
      default: true
    }
  ])

  if (gitInit) {
    execSync('git init', { stdio: 'inherit', cwd: `./${answers.projectName}` })
    console.log(chalk.green('✔ Git repository initialized!'))
  }
}
