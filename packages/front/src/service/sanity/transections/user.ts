import { User } from '@/model'
import { sanity } from '@/service/sanity'

export async function addUser(user: User) {
  try {
    const { id, username, email, image } = user
    return await sanity.client.createIfNotExists({
      _id: id,
      _type: 'yoloUser',
      name: username,
      email,
      image
    })
  } catch (error) {
    console.error(error)
  }
}
