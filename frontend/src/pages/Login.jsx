import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";

const Login = () => {
  const { loginUser, registerUser } = useContext(ShopContext);

  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      await loginUser({ email, password });
    } else {
      await registerUser({ name, email, password });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <form
        onSubmit={onSubmit}
        className="flex flex-col items-center w-[90%] sm:max-w-96 gap-4 text-gray-800 border border-gray-200 rounded-lg p-8 shadow-sm"
      >
        <h1 className="prata-regular text-3xl mb-2">
          {isLogin ? "Login" : "Sign Up"}
        </h1>

        {!isLogin && (
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded outline-none focus:border-black"
          />
        )}

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded outline-none focus:border-black"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
          className="w-full px-3 py-2 border border-gray-300 rounded outline-none focus:border-black"
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded mt-2 hover:bg-gray-800 transition"
        >
          {isLogin ? "Login" : "Create Account"}
        </button>

        <p className="text-sm text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-black font-medium cursor-pointer underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
