"use client";

import { User } from "@/model";
import Image from "next/image";

interface TempProfileProps {
  user: User;
}
export default function TempProfile({ user }: TempProfileProps) {
  console.log("TempProfile :", user);
  return (
    <div>
      <h1>TempProfile</h1>
      <p>{user?.username}</p>
      <p>{user?.email}</p>
      <Image src={user.image} alt={user?.username} width={100} height={100} />
    </div>
  );
}
