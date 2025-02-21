"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle email/password login via the Credentials provider
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setFeedback("");
    const res = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    if (res?.error) {
      setFeedback(`Login failed: ${res.error}`);
    } else {
      setFeedback("Login successful!");
    }
  };

  // Handle OAuth sign-ins (Google, GitHub)
  const handleOAuthSignIn = async (provider: string) => {
    setLoading(true);
    setFeedback("");
    const res = await signIn(provider, { redirect: false });
    setLoading(false);
    if (res?.error) {
      setFeedback(`Login with ${provider} failed: ${res.error}`);
    } else {
      setFeedback(`Login with ${provider} successful!`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login with Email"}
        </button>
      </form>
      {feedback && <p>{feedback}</p>}
      <hr />
      <div>
        <button onClick={() => handleOAuthSignIn("google")} disabled={loading}>
          {loading ? "Processing..." : "Login with Google"}
        </button>
      </div>
      <div>
        <button onClick={() => handleOAuthSignIn("github")} disabled={loading}>
          {loading ? "Processing..." : "Login with GitHub"}
        </button>
      </div>
    </div>
  );
}
