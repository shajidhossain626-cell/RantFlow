import { SignUp } from "@clerk/nextjs";

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-[#050814] text-white px-6 py-10 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 font-black">
            RF
          </div>
          <h1 className="text-3xl font-black">Create your account</h1>
          <p className="mt-2 text-gray-400">Start optimizing content with your private SEO workspace.</p>
        </div>
        <div className="flex justify-center">
          <SignUp routing="path" path="/signup" signInUrl="/login" afterSignUpUrl="/dashboard" />
        </div>
      </div>
    </main>
  );
}
