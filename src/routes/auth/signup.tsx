import { Button } from "@/components/ui/button";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/auth/signup")({
  component: RouteComponent,
});

const handleSignup = async (
  email: string,
  password: string,
  confirmPassword: string
) => {
  const response = await fetch("http://localhost:8000/api/v1/auth/register/", {
    method: "POST",
    body: JSON.stringify({
      username: email,
      email,
      password1: password,
      password2: confirmPassword,
    }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to signup");
  }
};

function RouteComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div>
      <h1>Signup</h1>
      <span>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button
          onClick={async () => {
            await handleSignup(email, password, confirmPassword);
            navigate({ to: "/auth/login" });
          }}
        >
          Signup
        </Button>
      </span>
    </div>
  );
}
