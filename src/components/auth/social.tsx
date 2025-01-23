"use client";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";
import { FaGithub } from "react-icons/fa";
import { DEFAULT_LOGIN_REDIRECT } from "../../../routes";
import { useSearchParams } from "next/navigation";
import { handleOAuthCallback } from "../../../lib/authService";
import Home from "@/app/page";

export function Social() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || DEFAULT_LOGIN_REDIRECT;

  const onClick = async (provider: "github" | "google") => {
    try {
      const result = await signIn(provider, {
        callbackUrl,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      const code = new URLSearchParams(window.location.search).get("code");
      if (code) {
        await handleOAuthCallback({ code, provider, redirect_uri: callbackUrl });
      }
    } catch (error) {
      console.error("OAuth sign-in failed:", error);
    }
  };

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onClick("google")}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onClick("github")}
      >
        <FaGithub className="h-5 w-5" />
      </Button>
      <Home/>
    </div>
  );
}