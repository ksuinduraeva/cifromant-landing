import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'

export default defineConfig({
  name: 'cifromant',
  title: 'Цифромант',
  projectId: 'bgot2t5a',
  dataset: 'production',
  basePath: '/studio',
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
})
