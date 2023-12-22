import { defineConfig } from "sanity";

import { deskTool } from "sanity/desk";
import { schemaTypes } from "./schemas";
// import {structure} from './desk'

import { visionTool } from "@sanity/vision";
// import {colorInput} from '@sanity/color-input'
// import {imageHotspotArrayPlugin} from 'sanity-plugin-hotspot-array'
// import {media, mediaAssetSource} from 'sanity-plugin-media'
// import {customDocumentActions} from './plugins/customDocumentActions'

// const devOnlyPlugins = [visionTool()]

export default defineConfig({
  name: "default",
  title: "greenbean-info",

  projectId: "opjc2k1k",
  dataset: "production",

  schema: {
    types: schemaTypes,
  },

  plugins: [deskTool(), visionTool()],
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
});
