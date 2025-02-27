// Language: TSX
"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      // Save the token (e.g., in localStorage or call an auth context)
      localStorage.setItem("token", token);
      // Redirect to the default logged-in page
      router.push("/");
    } else {
      // If no token found, redirect to login or an error page
      router.push("/auth/login");
    }
  }, [searchParams, router]);

  return <div>Loading...</div>;
}