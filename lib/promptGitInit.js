import inquirer from 'inquirer'
import chalk from 'chalk'

export async function promptGitInit() {
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
