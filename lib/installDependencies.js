import { execSync } from 'child_process'
import ora from 'ora'

export function installDependencies(baseDependencies, devDependencies) {
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
