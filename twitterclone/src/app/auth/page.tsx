import { getUserSession } from "@/actions/auth/getUserSession";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import SignoutCard from "./SignoutCard";

export default async function AuthPage() {
  const user = await getUserSession();

  return (
    <div className="mx-auto pt-16">
      <div className="grid grid-cols-2 gap-4">
        {user ? (
          <SignoutCard userInfo={user} />
        ) : (
          <>
            <LoginForm />
            <RegisterForm />
          </>
        )}
      </div>
    </div>
  );
}
