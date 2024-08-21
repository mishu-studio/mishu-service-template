import fs from 'fs'
import path from 'path'
import ejs from 'ejs'
import { fileURLToPath } from 'url'
import { handleMongo } from './handleMongo.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export function generateFiles(answers) {
  const templateDir = path.join(__dirname, '../templates')
  const targetDir = path.join(process.cwd(), answers.projectName)

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir)
  }

  const directories = [
    'src/controllers',
    'src/libs',
    'src/middleware',
    'src/types',
    'src/validation',
    'prisma'
  ]
  directories.forEach((dir) => {
    fs.mkdirSync(path.join(targetDir, dir), { recursive: true })
  })

  const filesToCreate = [
    { template: 'package.json.ejs', target: 'package.json' },
    { template: '.env.ejs', target: '.env' },
    { template: 'tsconfig.json.ejs', target: 'tsconfig.json' },
    { template: 'prisma.schema.prisma.ejs', target: 'prisma/schema.prisma' },
    { template: 'src/index.ts.ejs', target: 'src/index.ts' },
    {
      template: 'src/controllers/authController.ts.ejs',
      target: 'src/controllers/authController.ts'
    }
  ]

  filesToCreate.forEach((file) => {
    const templatePath = path.join(templateDir, file.template)
    const targetPath = path.join(targetDir, file.target)
    const content = ejs.render(fs.readFileSync(templatePath, 'utf-8'), answers)
    fs.writeFileSync(targetPath, content)
  })

  if (answers.database === 'MongoDB') {
    handleMongo(targetDir)
  }

  console.log('Project created successfully!')
}
