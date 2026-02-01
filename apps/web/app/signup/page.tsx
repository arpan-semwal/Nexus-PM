"use client";

import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle, Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from "axios";
import  Link  from "next/link"
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await axios.post("http://localhost:3001/api/auth/signup", {
        name,
        email,
        password,
      });
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Sign Up failed");
    }
  };

  return (
    <div className="flex h-screen items-cemter justify-center bg-slate-50">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-2xl">Nexus sign in page</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp}>
            <div>
              <label>Full Name</label>
              <Input
                type="text"
                value={name}
                placeholder="John Doe"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label>Email</label>
              <Input
                type="email"
                value={email}
                placeholder="test@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label>Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button type="submit">Submit</Button>
            <p>Already have an Account <Link href="/login">Login</Link></p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
