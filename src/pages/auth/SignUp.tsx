import { SignupForm } from "../../modules/auth";

export const SignUp = () => {
  return (
    <div className="bg-black h-screen w-screen flex flex-col items-center justify-center">
      <div className="mb-8 flex items-center gap-3">
        <img 
          src="/butler-logo.svg" 
          alt="Butler Logo" 
          className="w-16 h-16 filter brightness-0 invert"
        />
        <h1 className="text-white text-2xl font-bold">Butler</h1>
      </div>
      <SignupForm />
    </div>
  )
}
