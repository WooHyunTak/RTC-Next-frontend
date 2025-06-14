"use client";

import { InputSet } from "@/app/components/Input_set";
import Button from "@/app/components/button";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SignupValidation from "./validation";
import useAuth from "@/app/context/authContext";
interface SignupForm {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
}

interface SignupErrors {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
}

const defaultForm: SignupForm = {
  email: "",
  password: "",
  confirmPassword: "",
  username: "",
};

function SignupPage() {
  const [value, setValue] = useState<SignupForm>(defaultForm);
  const { register } = useAuth(false);
  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...value, [e.target.id]: e.target.value });
  };

  const validate = () => {
    const errors: SignupErrors = SignupValidation.validateSignup(value);
    return errors;
  };

  const handleSignup = async () => {
    const errors: SignupErrors = validate();
    if (Object.values(errors).some((error) => error !== "")) {
      return;
    }
    await register(value.email, value.password, value.username);
    router.push("/users/login");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-[800px] max-w-md">
        <div className="flex flex-col bg-white rounded-lg shadow-md p-8 gap-4">
          <h1 className="text-2xl font-bold">Signup</h1>
          <InputSet
            label="Email"
            type="email"
            id="email"
            value={value.email}
            onChange={handleChange}
            error={validate().email}
          />
          <InputSet
            label="Password"
            type="password"
            id="password"
            value={value.password}
            onChange={handleChange}
            error={validate().password}
          />
          <InputSet
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            value={value.confirmPassword}
            onChange={handleChange}
            error={validate().confirmPassword}
          />
          <InputSet
            label="Username"
            type="text"
            id="username"
            value={value.username}
            onChange={handleChange}
          />
          <Button variant="primary" size="small" onClick={handleSignup}>
            Signup
          </Button>
          <div className="flex justify-center items-center gap-2">
            <p>Already have an account?</p>
            <Link href="/users/login">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
