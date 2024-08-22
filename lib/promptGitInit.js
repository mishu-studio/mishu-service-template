import inquirer from 'inquirer'
import chalk from 'chalk'
import { execSync } from 'child_process'

/**
 * @typedef {Object} Answers
 * @property {string} projectName - The name of the project.
 * @property {boolean} auth - Indicates whether authentication is needed.
 * @property {string} database - The database selected (e.g., MongoDB, PostgreSQL).
 * @property {string[]} features - A list of selected features (e.g., GraphQL, REST API).

/**
 * 
 * @param {Answers} answers - The answers object containing project details.
 */
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
