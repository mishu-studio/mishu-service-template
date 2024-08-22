export function getDependencies(answers) {
  const baseDependencies = ['@elysiajs/cors', '@prisma/client', 'argon2', 'elysia', 'jose', 'zod']

  const devDependencies = ['bun-types', 'prisma']

  if (answers.database === 'MongoDB') {
    baseDependencies.push('mongodb')
  }

  if (answers.features.includes('GraphQL')) {
    baseDependencies.push(
      '@elysiajs/graphql-yoga',
      'graphql',
      '@graphql-tools/merge',
      '@elysiajs/yoga'
    )
  }

  return { baseDependencies, devDependencies }
}
