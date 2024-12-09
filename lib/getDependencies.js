/**
 * @typedef {Object} Answers
 * @property {string} projectName - The name of the project.
 * @property {boolean} auth - Indicates whether authentication is needed.
 * @property {string} database - The database selected (e.g., MongoDB, PostgreSQL).
 * @property {string[]} features - A list of selected features (e.g., GraphQL, REST API).

/**
 * 
 * @param {Answers} answers - The answers object containing project details.
 * @returns {{baseDependencies: string[], devDependencies: string[]}}
 */

export function getDependencies(answers) {
  const baseDependencies = ['@elysiajs/cors', '@prisma/client', 'argon2', 'elysia', 'jose', 'zod']

  const devDependencies = ['bun-types', 'prisma', '@mishu-studio/service-template']

  if (answers.database === 'MongoDB') {
    baseDependencies.push('mongodb')
  }

  if (answers.features.includes('GraphQL')) {
    baseDependencies.push('@elysiajs/graphql-yoga', 'graphql', '@graphql-tools/merge')
  }

  return { baseDependencies, devDependencies }
}
