import chalk from 'chalk'
import figlet from 'figlet'

export function printBanner() {
  console.log(chalk.magentaBright(figlet.textSync('Mishu CLI')))
}
