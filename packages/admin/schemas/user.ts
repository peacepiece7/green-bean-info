import { defineField } from "sanity";

export default defineField({
  title: "User",
  name: "user",
  type: "document",
  fields: [
    {
      title: "Username",
      name: "username",
      type: "string",
    },
    {
      title: "Name",
      name: "name",
      type: "string",
    },
    {
      title: "Email",
      name: "email",
      type: "string",
    },
    {
      title: "Image",
      name: "image",
      type: "string",
    },
  ],
});
