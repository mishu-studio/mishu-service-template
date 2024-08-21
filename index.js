#!/usr/bin/env node

import inquirer from 'inquirer'
import { execSync } from 'child_process'
import { generateFiles } from './lib/generateFiles.js'

async function propmptUser() {
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

async function run() {
  const answers = await propmptUser()
  generateFiles(answers)

  const { installDeps } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'installDeps',
      message: 'Do you want to install dependencies?',
      default: true
    }
  ])

  if (installDeps) {
    execSync('bun install', { stdio: 'inherit', cwd: `./${answers.projectName}` })
  }

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
  }

  console.log('Project setup completed!👾')
}

run()
