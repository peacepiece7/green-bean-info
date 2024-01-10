import { PluginOptions, defineConfig } from 'sanity'

import { deskTool } from 'sanity/desk'
import { schemaTypes } from './schemas'
// import {structure} from './desk'

import { visionTool } from '@sanity/vision'
// import {colorInput} from '@sanity/color-input'
// import {imageHotspotArrayPlugin} from 'sanity-plugin-hotspot-array'
// import {media, mediaAssetSource} from 'sanity-plugin-media'
// import {customDocumentActions} from './plugins/customDocumentActions'
// const devOnlyPlugins = [visionTool()]
export default defineConfig({
  name: 'default',
  title: process.env.SANITY_STUDIO_TITLE,
  projectId: process.env.SANITY_STUDIO_PROJECT_ID as string,
  dataset: process.env.SANITY_STUDIO_DATASET as string,

  schema: {
    types: schemaTypes
  },
  plugins: [deskTool(), visionTool() as PluginOptions]
  // form: {
  //   file: {
  //     assetSources: (previousAssetSources) => {
  //       return previousAssetSources.filter((assetSource) => assetSource !== mediaAssetSource)
  //     },
  //   },
  //   image: {
  //     assetSources: (previousAssetSources) => {
  //       return previousAssetSources.filter((assetSource) => assetSource === mediaAssetSource)
  //     },
  //   },
  // },
})
