import inquirer from 'inquirer'

/**
 *
 * @returns {Promise<{projectName: string, auth: boolean, database: string, features: string[]}>}
 */
export async function promptUser() {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'What is the name of your project?',
      default: 'my-backend-app'
    },
    {
      type: 'confirm',
      name: 'auth',
      message: 'Do you need authentication?',
      default: true
    },
    {
      type: 'list',
      name: 'database',
      message: 'Which database do you want to use?',
      choices: ['MongoDB', 'PostgreSQL']
    },
    {
      type: 'checkbox',
      name: 'features',
      message: 'Which features do you need?',
      choices: ['GraphQL', 'REST API']
    }
  ])

  return answers
}
