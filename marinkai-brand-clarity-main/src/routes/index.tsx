import { createFileRoute } from "@tanstack/react-router";
import { LoginScreen } from "@/components/marinkai/login-screen";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Marinkai — Enterprise Brand Intelligence" },
      {
        name: "description",
        content:
          "Marinkai turns millions of digital signals into confident marketing decisions for brand and marketing leaders.",
      },
      { property: "og:title", content: "Marinkai — Clarity in the Noise" },
      {
        property: "og:description",
        content: "Enterprise brand intelligence for confident marketing decisions.",
      },
    ],
  }),
  component: LoginScreen,
});
