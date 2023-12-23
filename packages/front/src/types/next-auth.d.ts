import { User } from "@/model";

declare module "next-auth" {
  interface Session {
    user: User;
  }
}
