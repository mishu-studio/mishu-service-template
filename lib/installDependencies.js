import { execSync } from 'child_process'
import ora from 'ora'

/**
 * @typedef {Object} Answers
 * @property {string} projectName - The name of the project.
 * @property {boolean} auth - Indicates whether authentication is needed.
 * @property {string} database - The database selected (e.g., MongoDB, PostgreSQL).
 * @property {string[]} features - A list of selected features (e.g., GraphQL, REST API).

/**
 * @param {string[]} baseDependencies
 * @param {string[]} devDependencies
 * @param {Answers} answers - The answers object containing project details.
 */
export function installDependencies(baseDependencies, devDependencies, answers) {
  const installCommand = `bun add ${baseDependencies.join(' ')}`
  const installDevDependencies = `bun add -D ${devDependencies.join(' ')}`

  const spinner = ora('Installing dependencies...').start()

  try {
    execSync(installCommand, { stdio: 'inherit', cwd: `./${answers.projectName}` })
    execSync(installDevDependencies, { stdio: 'inherit', cwd: `./${answers.projectName}` })

    spinner.succeed('Dependencies installed successfully!')
  } catch (error) {
    spinner.fail('Failed to install dependencies')
    console.error(error)
    process.exit(1)
  }
}
