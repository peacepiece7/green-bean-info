import { SanityClient, createClient } from '@sanity/client'

class Sanity {
  public client: SanityClient
  constructor() {
    this.client = createClient({
      projectId: process.env.PROJECT_ID,
      dataset: process.env.DATASET,
      apiVersion: process.env.API_VERSION,
      token: process.env.SECRET_TOKEN,
      useCdn: false
    })
  }
}

export const sanity = new Sanity()
