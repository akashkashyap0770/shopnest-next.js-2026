// 📝 Sign Up Page — Clerk ka ready-made registration form
// Clerk khud sara UI aur logic handle karta hai
// Hum sirf center mein dikhate hain

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    // Page ke beechon-beech form dikhao
    <div className="flex justify-center items-center min-h-screen bg-stone-50">
      {/* afterSignUpUrl: Register hone ke baad kahan jao */}
      <SignUp afterSignUpUrl="/" />
    </div>
  );
}
