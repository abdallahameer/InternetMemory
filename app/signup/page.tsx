"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/components/common/Header";
import Card from "@/app/components/common/Card";
import TextInput from "@/app/components/common/TextInput";
import EmailInput from "@/app/components/common/EmailInput";
import PasswordInput from "@/app/components/common/PasswordInput";
import Button from "@/app/components/common/Button";
import NavLink from "@/app/components/common/NavLink";
import { usePost } from "@/app/hooks/usePost";
import { toast } from "react-toastify";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { loading, post } = usePost("/auth/register");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      await post({ name, email, password });

      router.push("/dashboard");
      toast.success(
        "we sent you a confermation email. please confirm your email to start using the app.",
      );
    } catch (err: any) {
      setError(err.response?.data?.error || "An error occurred");
    }
  };

  return (
    <div className="min-h-screen flex w-full items-center justify-center px-4 py-8 sm:py-0">
      <div className="flex flex-col items-center justify-center w-full sm:w-auto">
        <Card className="w-full sm:min-w-[420px] md:min-w-[500px]">
          <Header title="Welcome!" subtitle="Create Your Account" />
          <form onSubmit={handleSubmit} className="space-y-6">
            <TextInput
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="w-full px-6 py-3 bg-gray-100! text-gray-900! rounded-full! border-2 border-transparent focus:border-blue-500! focus:outline-none transition placeholder:text-gray-500!"
            />
            <EmailInput
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <PasswordInput
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
            />
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <Button disabled={loading}>Sign Up</Button>
          </form>
          <NavLink
            text="Already have an account?"
            linkText="Log In"
            href="/login"
          />
        </Card>
      </div>
    </div>
  );
}
