"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/"); // redirect to app after login
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-bg" aria-hidden="true" />

      <form onSubmit={handleLogin} className="auth-card">
        <div className="auth-header">
          <h2 className="auth-title">Admin Login</h2>
          <p className="auth-subtitle">Sign in to continue to IntelliPay AI</p>
        </div>

        <div className="auth-field">
          <label className="auth-label" htmlFor="login-email">
            Email
          </label>
          <input
            id="login-email"
            className="auth-input"
            type="email"
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>

        <div className="auth-field">
          <label className="auth-label" htmlFor="login-password">
            Password
          </label>
          <input
            id="login-password"
            className="auth-input"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>

        {error && (
          <div className="auth-error" role="alert" aria-live="polite">
            {error}
          </div>
        )}

        <button className="auth-button" type="submit">
          Login
        </button>

        <p className="auth-footnote">Use your admin email and password to access the dashboard.</p>
      </form>
    </div>
  );
}