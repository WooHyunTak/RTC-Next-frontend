"use client";

import { useState } from "react";
import usersApi from "../api/users";
import { useRouter } from "next/navigation";
import useAuth from "../context/authContext";

function UsersPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [nickname, setNickname] = useState("");
  const { register } = useAuth(false);
  const confirmPassword = () => {
    if (password !== passwordConfirm) {
      alert("Password and Confirm Password do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!confirmPassword()) return;
    try {
      await register(email, password, nickname);
      router.push("/users/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex">
      <main className="login-container">
        <h1>Register</h1>
        <div className="input-set">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-set">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input-set">
          <label htmlFor="password-confirm">Password Confirm</label>
          <input
            type="password"
            id="password-confirm"
            value={passwordConfirm}
            placeholder="Password Confirm"
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </div>
        <div className="input-set">
          <label htmlFor="nickname">Nickname</label>
          <input
            type="text"
            id="nickname"
            value={nickname}
            placeholder="Nickname"
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>
        <button type="submit" onClick={handleSubmit}>
          Register
        </button>
      </main>
    </div>
  );
}

export default UsersPage;
