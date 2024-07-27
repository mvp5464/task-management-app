"use client";
import EyeIcon from "@/components/icons/EyeIcon";
import Link from "next/link";
import { useState } from "react";

const AuthPage = ({ role }: { role: "login" | "signup" }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState: any) => !prevState);
  }
  return (
    <div className=" h-screen pt-20 bg-gradient-to-b from-[#FFFFFF] to-[#AFA3FF]">
      <div className=" max-w-[37rem] mx-auto y-20 flex flex-col justify-center items-center p-14 rounded-2xl bg-gradient-to-b from-[#F7F7F7] to-[#F0F0F0] border-[#CECECE] border">
        <div>
          <h2 className=" text-4xl text-[#2D2D2D] mb-5 font-bold text-center">
            Welcome to <span className=" text-[#4534AC]">Workflo</span>!
          </h2>
        </div>
        <div className="relative flex flex-col gap-4 w-full mb-5">
          {role === "signup" && (
            <input
              className=" py-3 px-2 rounded-lg bg-[#EBEBEB] placeholder-[#999999] focus:outline-[#999999] focus:outline "
              type="text"
              placeholder="Full name"
            />
          )}
          <input
            className=" py-3 px-2 rounded-lg bg-[#EBEBEB] placeholder-[#999999] focus:outline-[#999999] focus:outline "
            type="text"
            placeholder="Your email"
          />
          <input
            className=" py-3 px-2 rounded-lg bg-[#EBEBEB] placeholder-[#999999] focus:outline-[#999999] focus:outline "
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Password"
          />
          <button
            className="absolute bottom-0 right-0 flex h-10 items-center px-4 text-gray-600"
            onClick={togglePasswordVisibility}
          >
            <EyeIcon />
          </button>
        </div>
        <div className=" flex flex-col gap-4 w-full mb-5">
          <button className=" text-white py-3 rounded-lg bg-gradient-to-b from-[#8c80ce] to-[#7066b0] ">
            {role === "signup" ? "Sign up" : "Login"}
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
      </div>
    </div>
  );
};

export default AuthPage;
