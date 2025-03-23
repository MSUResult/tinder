import { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700 p-6">
      <div className="w-full max-w-md">
        <h2 className="text-center text-3xl font-bold text-white mb-8 drop-shadow-md">
          {isLogin ? "Sign in to Swipe" : "Create a Swipe account"}
        </h2>

        <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-8 transition-all duration-300">
          {isLogin ? <LoginForm /> : <SignUpForm />}

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-300">
              {isLogin ? "New to Swipe?" : "Already have an account?"}
            </p>

            <button
              onClick={() => setIsLogin((prevIsLogin) => !prevIsLogin)}
              className="mt-3 text-blue-400 hover:text-blue-200 font-medium transition-all duration-300"
            >
              {isLogin ? "Create a new account" : "Sign in to your account"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
