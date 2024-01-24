"use client";

import { signoutUser } from "@/actions/user/signoutUser";
import { Button } from "@/components/ui/button";

export default function SignoutButton() {
  const handleClick = async () => {
    const result = await signoutUser();
    console.log(result);
  };
  return (
    <Button
      onClick={() => {
        return handleClick();
      }}
    >
      Sign out
    </Button>
  );
}
