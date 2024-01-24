import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SignoutButton from "./SignoutButton";

type SignoutCardProps = {
  userInfo: {
    name: string;
    email: string;
    id: number;
  };
};

export default function SignoutCard({ userInfo }: SignoutCardProps) {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Signout</CardTitle>
        <CardDescription>
          You are signed in as {userInfo.name}#{userInfo.id}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignoutButton />
      </CardContent>
    </Card>
  );
}
