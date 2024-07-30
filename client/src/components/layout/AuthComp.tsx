"use client";
import EyeIcon from "@/components/icons/EyeIcon";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { LoaderIcon } from "react-hot-toast";

export interface SigningType {
  fullName: string;
  email: string;
  password: string;
}

const AuthComp = ({ role }: { role: "login" | "signup" }) => {
  const router = useRouter();
  const [input, setInput] = useState<SigningType>({
    fullName: "",
    email: "",
    password: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState: any) => !prevState);
  }

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput((val) => ({ ...val, [e.target.name]: e.target.value }));
  };

  async function handleSubmit(e: FormEvent<HTMLButtonElement>) {
    if (e) {
      e.preventDefault();
    }
    setIsPasswordVisible(false);
    setErrorMessage("");
    setIsLoading(true);

    try {
      if (role === "login") {
        const res = await fetch(`http://localhost:8080/api/v1/user/login`, {
          method: "POST",
          body: JSON.stringify(input),
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();

        if (res.ok) {
          localStorage.setItem("app-token", data.msg);
          localStorage.setItem("app-name", data.name);
          router.push("/dashboard");
        } else {
          setErrorMessage(data.msg);
        }
      }

      if (role === "signup") {
        const res = await fetch(`http://localhost:8080/api/v1/user/signup`, {
          method: "POST",
          body: JSON.stringify(input),
          headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();

        if (res.ok) {
          localStorage.setItem("app-token", data.msg);
          router.push("/dashboard");
        } else {
          setErrorMessage(data.msg);
        }
      }
      setIsLoading(false);
    } catch (e) {
      console.log("Error:", e);
      setErrorMessage("Error connecting Database");
      setIsLoading(false);
    }
  }

  return (
    <div className=" h-screen pt-28 bg-gradient-to-b from-[#FFFFFF] to-[#AFA3FF]">
      <div className=" max-w-[37rem] mx-auto flex flex-col justify-center items-center pt-14 pb-2 px-14 rounded-2xl bg-gradient-to-b from-[#F7F7F7] to-[#F0F0F0] border-[#CECECE] border">
        <div>
          <h2 className=" text-[2.3rem] text-[#2D2D2D] mb-5 font-bold text-center">
            Welcome to <span className=" text-[#4534AC]">Workflo</span>!
          </h2>
        </div>
        <div className="relative flex flex-col gap-4 w-full mb-5">
          {role === "signup" && (
            <input
              className=" py-3 px-2 rounded-lg bg-[#EBEBEB] placeholder-[#999999] focus:outline-[#999999] focus:outline "
              type="text"
              value={input.fullName}
              name="fullName"
              placeholder="Full name"
              onChange={handleOnChange}
            />
          )}
          <input
            className=" py-3 px-2 rounded-lg bg-[#EBEBEB] placeholder-[#999999] focus:outline-[#999999] focus:outline "
            type="text"
            value={input.email}
            name="email"
            placeholder="Your email"
            onChange={handleOnChange}
          />
          <input
            className=" py-3 px-2 rounded-lg bg-[#EBEBEB] placeholder-[#999999] focus:outline-[#999999] focus:outline "
            type={isPasswordVisible ? "text" : "password"}
            value={input.password}
            name="password"
            placeholder="Password"
            onChange={handleOnChange}
          />
          <button
            className="absolute bottom-0 right-0 flex h-10 items-center px-4 text-gray-600"
            onClick={togglePasswordVisibility}
          >
            <EyeIcon />
          </button>
        </div>
        <div className=" flex flex-col gap-4 w-full mb-5">
          <button
            className=" flex gap-4 justify-center items-center text-white py-3 rounded-lg bg-gradient-to-b from-[#8c80ce] to-[#7066b0] "
            disabled={isLoading}
            onClick={handleSubmit}
          >
            <span>{role === "signup" ? "Sign up" : "Login"}</span>
            {isLoading && <LoaderIcon />}
          </button>
        </div>
        {role === "signup" ? (
          <div className=" text-[#606060]">
            Already have an account?{" "}
            <Link className="text-[#0054A1]" href={"/login"}>
              Log in
            </Link>
            .
          </div>
        ) : (
          <div className=" text-[#606060]">
            Don't have an account? Create a{" "}
            <Link className="text-[#0054A1]" href={"/signup"}>
              new account
            </Link>
            .
          </div>
        )}
        <div
          className={`my-4 text-red-500 font-semibold text-xl ${
            errorMessage.length > 0 ? "visible" : "invisible"
          }`}
        >
          {`"${errorMessage}"`}
        </div>
      </div>
    </div>
  );
};

export default AuthComp;
