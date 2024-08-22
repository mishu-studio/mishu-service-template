import chalk from 'chalk'
import figlet from 'figlet'

export function printBanner() {
  console.log(chalk.green(figlet.textSync('Mishu CLI', { horizontalLayout: 'full' })))
}
