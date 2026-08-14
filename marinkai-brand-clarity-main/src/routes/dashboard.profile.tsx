import { createFileRoute } from "@tanstack/react-router";
import { Mail, Building2, ShieldCheck, Clock } from "lucide-react";
import { Panel } from "@/components/marinkai/primitives";
import { PageHeader } from "@/components/marinkai/shell";
import { useWorkspace } from "@/components/marinkai/workspace";

export const Route = createFileRoute("/dashboard/profile")({
  head: () => ({
    meta: [
      { title: "Profile — Marinkai" },
      {
        name: "description",
        content: "Your Marinkai account details, access level and workspace assignment.",
      },
      { property: "og:title", content: "Profile — Marinkai" },
      { property: "og:description", content: "Account details and access level." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { market, category, brand } = useWorkspace();

  const details = [
    { icon: Mail, label: "Email", value: "director@marinkai.com" },
    { icon: Building2, label: "Organisation", value: "Marinkai Brand Intelligence" },
    { icon: ShieldCheck, label: "Access level", value: "Executive — full category access" },
    { icon: Clock, label: "Last sign-in", value: "Today · 08:42 SGT" },
  ];

  return (
    <>
      <PageHeader title="Profile" description="Account and access overview" />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <Panel title="Account" subtitle="Managed by your organisation administrator">
          <ul className="divide-y divide-border">
            {details.map((d) => (
              <li key={d.label} className="flex items-center gap-4 py-4">
                <span className="glass flex size-9 shrink-0 items-center justify-center rounded-full">
                  <d.icon className="size-4 text-gold" />
                </span>
                <div>
                  <p className="label-caps">{d.label}</p>
                  <p className="mt-1 text-[14px] text-foreground">{d.value}</p>
                </div>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Assigned workspace" subtitle="Default context on sign-in">
          <dl className="space-y-4 text-[13.5px]">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Market</dt>
              <dd className="text-foreground">{market}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Category</dt>
              <dd className="text-foreground">{category}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Brand</dt>
              <dd className="text-foreground">{brand}</dd>
            </div>
          </dl>
        </Panel>
      </div>
    </>
  );
}
