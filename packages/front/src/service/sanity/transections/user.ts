import { User } from "@/model";
import { sanity } from "@/service/sanity";

export async function addUser(user: User) {
  try {
    const { id, name, email, image } = user;
    return await sanity.client.createIfNotExists({
      _id: id,
      _type: "yoloUser",
      name,
      email,
      image,
    });
  } catch (error) {
    console.error(error);
  }
}
