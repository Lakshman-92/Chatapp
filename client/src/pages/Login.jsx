import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import assets from "../assets/assets";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [currState, setCurrState] = useState("signup");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { login, signup, authUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser) {
      navigate("/");
    }
  }, [authUser, navigate]);

  const validatePassword = () => {
    const conditions = [
      { valid: password.length >= 8, message: "• At least 8 characters" },
      { valid: /[a-z]/.test(password), message: "• At least one lowercase letter" },
      { valid: /[A-Z]/.test(password), message: "• At least one uppercase letter" },
      { valid: /[!@#$%^&*(),.?\":{}|<>]/.test(password), message: "• At least one special character" },
    ];
    return conditions.filter(c => !c.valid).map(c => c.message);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || (currState === "signup" && !fullName)) {
      toast.error("Please fill all required fields.");
      return;
    }

    if (currState === "signup") {
      if (!agreeTerms) {
        toast.error("Please agree to the Terms and Policy.");
        return;
      }
      if (password !== confirmPassword) {
        toast.error("Passwords do not match.");
        return;
      }
      const errors = validatePassword();
      if (errors.length > 0) {
        toast.error("Password must include:\n" + errors.join("\n"));
        return;
      }

      await signup({ fullName, email, password, bio: "" });
    } else {
      await login({ email, password });
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl px-6">
      <img src={assets.chatlogo} alt="Logo" className="w-[min(30vw,250px)]" />
      <form onSubmit={handleSubmit} className="border-2 bg-white/10 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg min-w-[300px] max-w-[400px]">
        <h2 className="font-medium text-2xl text-center">{currState === "signup" ? "Sign up" : "Login"}</h2>

        {currState === "signup" && (
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="bg-transparent border border-gray-400 px-4 py-2 rounded outline-none"
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-transparent border border-gray-400 px-4 py-2 rounded outline-none"
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-transparent border border-gray-400 px-4 py-2 rounded w-full pr-12 outline-none"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm cursor-pointer text-gray-300"
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>

        {currState === "signup" && (
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-transparent border border-gray-400 px-4 py-2 rounded w-full pr-12 outline-none"
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm cursor-pointer text-gray-300"
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </span>
          </div>
        )}

        {currState === "signup" && (
          <label className="flex items-center gap-2 text-sm text-gray-200">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
            />
            <span>
              I agree to the{" "}
              <span className="underline cursor-pointer text-blue-300">Terms and Policy</span>
            </span>
          </label>
        )}

        <button type="submit" className="bg-blue-600 hover:bg-blue-700 py-2 rounded font-medium">
          {currState === "signup" ? "Sign up" : "Login"}
        </button>

        <p className="text-sm text-center">
          {currState === "signup" ? (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setCurrState("login")}
                className="text-blue-400 cursor-pointer underline"
              >
                Login here
              </span>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <span
                onClick={() => setCurrState("signup")}
                className="text-blue-400 cursor-pointer underline"
              >
                Sign up
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
