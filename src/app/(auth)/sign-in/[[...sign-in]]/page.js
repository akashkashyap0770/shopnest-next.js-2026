// 🔐 Sign In Page — Clerk ka ready-made login form
// Clerk khud sara UI aur logic handle karta hai
// Hum sirf center mein dikhate hain

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    // Page ke beechon-beech form dikhao
    <div className="flex justify-center items-center min-h-screen bg-stone-50">
      {/* afterSignInUrl: Login hone ke baad kahan jao */}
      <SignIn afterSignInUrl="/" />
    </div>
  );
}
