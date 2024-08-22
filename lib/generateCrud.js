import path from 'path'
import fs from 'fs'

/**
 * generate crud for graphql or rest api
 * @param {string} model
 */
export async function generateCrud(model) {
  // read config file

  const config = {
    feature: ['graphql', 'rest']
  }

  const schemaPath = path.resolve(process.cwd(), 'prisma/schema.prisma')
  if (!fs.existsSync(schemaPath)) {
    throw new Error('Prisma schema file not found')
  }

  const schemaContent = fs.readFileSync(schemaPath, 'utf-8')

  if (config.feature.includes('graphql')) {
    generateGraphqlCrud(model, schemaContent)
  }

  if (config.feature.includes('rest')) {
    generateRestCrud(model)
  }
}

/**
 *
 * @param {string} model
 * @param {string} schemaContent
 */
async function generateGraphqlCrud(model, schemaContent) {
  // create typeDefs
  // create resolvers
  const fields = parseModel(schemaContent, model)
  const typeDefs = generateTypeDefs(model, fields)

  const outputFilePath = `${model.toLowerCase()}TypeDefs.ts`
  fs.writeFileSync(outputFilePath, typeDefs)
  console.log(`Type definitions created at ${outputFilePath}`)
}

/**
 *
 * @param {string} model
 */
async function generateRestCrud(model) {
  // create controller
  // create routes
}

/**
 *
 * @param {string} schemaContent
 * @param {string} modelName
 * @returns
 */
function parseModel(schemaContent, modelName) {
  const modelPattern = new RegExp(`model\\s+${modelName}\\s+{([\\s\\S]*?)}\\s*$`, 'gm')
  const match = modelPattern.exec(schemaContent)

  if (!match) {
    console.error(chalk.red(`Model "${modelName}" not found in schema.prisma`))
    process.exit(1)
  }

  const modelBlock = match[1].trim()
  const fields = modelBlock.split('\n').map((line) => {
    const [name, type] = line.trim().split(/\s+/)
    return { name, type }
  })

  return fields
}

function generateTypeDefs(modelName, fields) {
  const typeDefsFields = fields.map(({ name, type }) => `  ${name}: ${type}`).join('\n')
  const typeName = modelName.charAt(0).toUpperCase() + modelName.slice(1)

  return `
  export const ${modelName.toLowerCase()}TypeDefs = /* GraphQL */ \`
    type ${typeName} {
      ${typeDefsFields}
    }

    type Query {
      ${modelName.toLowerCase()}s: [${typeName}]
      ${modelName.toLowerCase()}(id: Int!): ${typeName}
    }

    type Mutation {
      create${typeName}(input: Create${typeName}Input!): ${typeName}
      update${typeName}(id: Int!, input: Update${typeName}Input!): ${typeName}
      delete${typeName}(id: Int!): Boolean
    }
  \`
  `.trim()
}
