import { createFileRoute } from "@tanstack/react-router";
import { LoginScreen } from "@/components/marinkai/login-screen";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — Marinkai Brand Intelligence" },
      {
        name: "description",
        content: "Sign in to your Marinkai intelligence workspace to review brand impact signals.",
      },
      { property: "og:title", content: "Sign in — Marinkai" },
      { property: "og:description", content: "Access your Marinkai intelligence workspace." },
    ],
  }),
  component: LoginScreen,
});
