"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login in with:", { email, password });
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/login",
        {
          email,
          password,
        },
      );

      //if login is successfull save token to localstorage
      if (response.data.token) {
        localStorage.setItem("nexus_token", response.data.token);

        //Push user to dashboard
        router.push("/dashboard");
      }
    } catch (err:any) {
      console.log(err);
      setError(
        err.response?.data?.message || "Login failed.Check credentials.",
      );
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-slate-50">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-2xl">Nexus Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="space-y-2">
              <label>Email</label>
              <Input
                type="email"
                value={email}
                placeholder="test@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label>Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            <Button type="submit" className="w-full mt-4">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
