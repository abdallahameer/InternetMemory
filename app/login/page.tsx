"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/components/common/Header";
import Card from "@/app/components/common/Card";
import EmailInput from "@/app/components/common/EmailInput";
import PasswordInput from "@/app/components/common/PasswordInput";
import Button from "@/app/components/common/Button";
import NavLink from "@/app/components/common/NavLink";
import { usePost } from "@/app/hooks/usePost";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { loading, post } = usePost("/auth/login");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await post({ email, password });
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.error || "An error occurred");
    }
  };

  return (
    <div className="min-h-screen flex w-full items-center justify-center px-4 py-8 sm:py-0">
      <div className="flex flex-col items-center justify-center w-full sm:w-auto">
        <Card className="w-full sm:min-w-[420px] md:min-w-[500px]">
          <Header title="Hello!" subtitle="Sign In to Get Started" />
          <form onSubmit={handleSubmit} className="space-y-6">
            <EmailInput
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <Button disabled={loading}>Login</Button>
          </form>
          <NavLink
            text="Don't have an account?"
            linkText="Sign Up"
            href="/signup"
          />
        </Card>
      </div>
    </div>
  );
}
