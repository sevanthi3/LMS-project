import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../Redux/Slices/AuthSlice";
import InputBox from "../Components/InputBox/InputBox";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  }

 async function onLogin(event) {
  event.preventDefault();

  if (!loginData.email || !loginData.password) {
    toast.error("Please fill all the details");
    return;
  }

  setIsLoading(true);

  try {
    const response = await dispatch(login(loginData));
    console.log("Login response:", response);

    
    if (response?.payload?.user) {
      toast.success("Login successful");
      setLoginData({ email: "", password: "" });
      navigate("/user/profile");
    } else {
      toast.error(response?.payload?.message || "Login failed");
    }

  } catch (err) {
    toast.error("Something went wrong. Please try again.");
  }

  setIsLoading(false);
}

  return (
    <section className="flex flex-col gap-6 items-center py-8 px-3 min-h-[100vh]">
      <form
        onSubmit={onLogin}
        autoComplete="off"
        noValidate
        className="flex flex-col dark:bg-base-100 gap-4 rounded-lg md:py-5 py-7 md:px-7 px-3 md:w-[500px] w-full shadow-custom dark:shadow-xl"
      >
        <h1 className="text-center dark:text-purple-500 text-4xl font-bold font-inter">
          Login Page
        </h1>

        <InputBox
          label={"Email"}
          name={"email"}
          type={"email"}
          placeholder={"Enter your email..."}
          onChange={handleUserInput}
          value={loginData.email}
        />

        <InputBox
          label={"Password"}
          name={"password"}
          type={"password"}
          placeholder={"Enter your password..."}
          onChange={handleUserInput}
          value={loginData.password}
        />

        <button
          type="submit"
          className="mt-2 bg-yellow-500 text-white dark:text-base-200 transition-all ease-in-out duration-300 rounded-md py-2 font-nunito-sans font-[500] text-lg cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? "Logging..." : "Login"}
        </button>

        <p className="text-center font-inter text-gray-500 dark:text-slate-300">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="link text-blue-600 font-lato cursor-pointer"
          >
            Signup
          </Link>
        </p>
      </form>
    </section>
  );
}
