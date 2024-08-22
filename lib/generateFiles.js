import fs from 'fs'
import path from 'path'
import ejs from 'ejs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

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

  if (answers.features.includes('GraphQL')) {
    directories.push('src/graphql')
    directories.push('src/graphql/resolvers')
    directories.push('src/graphql/typeDefs')
  }

  directories.forEach((dir) => {
    fs.mkdirSync(path.join(targetDir, dir), { recursive: true })
  })

  const filesToCreate = [
    { template: 'package.json.ejs', target: 'package.json' },
    { template: '.env.ejs', target: '.env' },
    { template: 'mishu.json.ejs', target: 'mishu.json' },
    { template: 'README.md.ejs', target: 'README.md' },
    { template: 'tsconfig.json.ejs', target: 'tsconfig.json' },
    { template: 'src/index.ts.ejs', target: 'src/index.ts' },
    { template: 'src/libs/auth.ts.ejs', target: 'src/libs/auth.ts' },
    { template: 'src/libs/prisma.ts.ejs', target: 'src/libs/prisma.ts' },
    { template: 'src/validation/authSchema.ts.ejs', target: 'src/validation/authSchema.ts' },
    { template: 'src/types/jwt.ts.ejs', target: 'src/types/jwt.ts' },
    { template: 'src/types/context.ts.ejs', target: 'src/types/context.ts' },
    { template: 'src/middleware/auth.ts.ejs', target: 'src/middleware/auth.ts' },
    {
      template: 'src/validation/authSchema.ts.ejs',
      target: 'src/validation/authSchema.ts'
    },
    {
      template: 'src/controllers/authController.ts.ejs',
      target: 'src/controllers/authController.ts'
    }
  ]

  if (answers.database === 'MongoDB') {
    filesToCreate.push(
      { template: 'src/libs/mongo.ts.ejs', target: 'src/libs/mongo.ts' },
      { template: 'src/database/mongo.schema.prisma.ejs', target: 'prisma/schema.prisma' }
    )
  }

  if (answers.database === 'PostgreSQL') {
    filesToCreate.push({
      template: 'src/database/pgsql.schema.prisma.ejs',
      target: 'prisma/schema.prisma'
    })
  }

  if (answers.features.includes('GraphQL')) {
    filesToCreate.push(
      { template: 'src/graphql/index.ts.ejs', target: 'src/graphql/index.ts' },
      {
        template: 'src/graphql/resolvers/userResolvers.ts.ejs',
        target: 'src/graphql/resolvers/userResolvers.ts'
      },
      {
        template: 'src/graphql/typeDefs/userTypeDefs.ts.ejs',
        target: 'src/graphql/typeDefs/userTypeDefs.ts'
      }
    )
  }

  filesToCreate.forEach((file) => {
    const templatePath = path.join(templateDir, file.template)
    const targetPath = path.join(targetDir, file.target)
    const content = ejs.render(fs.readFileSync(templatePath, 'utf-8'), answers)
    fs.writeFileSync(targetPath, content)
  })

  console.log('Project created successfully!')
}
