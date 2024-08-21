import fs from 'fs'
import path from 'path'

export function handleMongo(targetDir) {
  const indexTsPath = path.join(targetDir, 'src/index.ts')
  const indexContent = fs.readFileSync(indexTsPath, 'utf-8')
  const mongoImport = `import { connectToMongo } from '@/libs/mongo'\nconnectToMongo()\n`
  const updatedContent = indexContent.replace(/(const app = new Elysia)/, `${mongoImport}$1`)
  fs.writeFileSync(indexTsPath, updatedContent)
}
