import { useState, type ReactNode } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  Activity,
  Bell,
  ChevronsLeft,
  Compass,
  Download,
  HelpCircle,
  Home,
  LayoutGrid,
  Layers,
  LogOut,
  Menu,
  MessageSquareQuote,
  PanelsTopLeft,
  Search,
  Settings,
  Sparkles,
  Target,
  User,
  X,
} from "lucide-react";
import { BrandLogo } from "./primitives";
import { DateSlicer } from "./date-slicer";
import { ThemeToggle } from "./theme";
import { useWorkspace } from "./workspace";
import { ConfirmDialog } from "./confirm-dialog";

type NavItem = { to: string; label: string; icon: ReactNode };
type NavGroup = { group: string; items: NavItem[] };

const NAV: NavGroup[] = [
  {
    group: "Brand Impact",
    items: [
      { to: "/dashboard/overview", label: "Overview", icon: <LayoutGrid className="size-4" /> },
      {
        to: "/dashboard/competitive-context",
        label: "Competitive Context",
        icon: <Target className="size-4" />,
      },
    ],
  },
  {
    group: "Brand Deep Dive",
    items: [
      {
        to: "/dashboard/positioning-messaging",
        label: "Positioning & Messaging",
        icon: <MessageSquareQuote className="size-4" />,
      },
    ],
  },
  {
    group: "Digital Activity",
    items: [
      { to: "/dashboard/campaign-themes", label: "Campaign Themes", icon: <Sparkles className="size-4" /> },
      { to: "/dashboard/creative-formats", label: "Creative Formats", icon: <Layers className="size-4" /> },
      { to: "/dashboard/platforms", label: "Platforms", icon: <PanelsTopLeft className="size-4" /> },
    ],
  },
  {
    group: "Future Focus",
    items: [{ to: "/dashboard/future-focus", label: "Future Focus", icon: <Compass className="size-4" /> }],
  },
];

const BOTTOM: NavItem[] = [
  { to: "/landing", label: "Home", icon: <Home className="size-4" /> },
  { to: "/dashboard/settings", label: "Settings", icon: <Settings className="size-4" /> },
  { to: "/dashboard/profile", label: "Profile", icon: <User className="size-4" /> },
];

function NavLink({
  item,
  collapsed,
  onNavigate,
}: {
  item: NavItem;
  collapsed: boolean;
  onNavigate?: () => void;
}) {
  return (
    <li className="relative">
      <Link
        to={item.to}
        activeProps={{ "data-active": "true" }}
        onClick={onNavigate}
        className="group/nav relative flex h-10 items-center gap-3 rounded-[12px] px-3 text-[13.5px] text-muted-foreground transition-colors hover:bg-surface-elevated hover:text-foreground data-[active=true]:bg-[color-mix(in_srgb,var(--gold)_9%,transparent)] data-[active=true]:text-foreground"
      >
        <span className="absolute top-2 bottom-2 left-0 w-[2px] rounded-full bg-gold opacity-0 transition-opacity group-data-[active=true]/nav:opacity-100" />
        <span className="grid size-5 shrink-0 place-items-center text-current group-data-[active=true]/nav:text-gold">
          {item.icon}
        </span>
        {!collapsed && <span className="truncate">{item.label}</span>}
        {collapsed && (
          <span
            role="tooltip"
            className="pointer-events-none absolute left-[calc(100%+10px)] z-50 hidden whitespace-nowrap rounded-[10px] border border-border-strong bg-surface-elevated px-2.5 py-1.5 text-[12px] text-foreground group-hover/nav:block"
            style={{ boxShadow: "var(--shadow-panel)" }}
          >
            {item.label}
          </span>
        )}
      </Link>
    </li>
  );
}

function SidebarContent({
  collapsed,
  onNavigate,
  onSignOut,
}: {
  collapsed: boolean;
  onNavigate?: () => void;
  onSignOut: () => void;
}) {
  return (
    <>
      <div className="flex h-20 items-center px-5">
        <Link to="/landing" aria-label="Marinkai home" onClick={onNavigate}>
          <BrandLogo showWordmark={!collapsed} size={collapsed ? 34 : 32} />
        </Link>
      </div>

      <nav aria-label="Primary" className="flex-1 overflow-y-auto px-3 py-2">
        {NAV.map((g) => (
          <div key={g.group} className="mb-5">
            {!collapsed ? (
              <p className="label-caps px-3 pb-2">{g.group}</p>
            ) : (
              <div aria-hidden className="mx-3 mb-2 h-px bg-border" />
            )}
            <ul className="space-y-1">
              {g.items.map((i) => (
                <NavLink key={i.to} item={i} collapsed={collapsed} onNavigate={onNavigate} />
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-border px-3 py-3">
        <ul className="space-y-1">
          {BOTTOM.map((i) => (
            <NavLink key={i.to} item={i} collapsed={collapsed} onNavigate={onNavigate} />
          ))}
          <li>
            <button
              type="button"
              onClick={onSignOut}
              className="flex h-10 w-full items-center gap-3 rounded-[12px] px-3 text-[13.5px] text-muted-foreground transition-colors hover:bg-surface-elevated hover:text-foreground"
            >
              <span className="grid size-5 shrink-0 place-items-center">
                <LogOut className="size-4" />
              </span>
              {!collapsed && <span>Sign out</span>}
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}

export function DashboardShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const navigate = useNavigate();
  const { brand, period, set } = useWorkspace();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const current =
    [...NAV.flatMap((g) => g.items), ...BOTTOM].find((i) => i.to === pathname)?.label ?? "Overview";

  function handlePrint() {
    window.print();
  }

  function handleHelp() {
    window.open("/user-guide.pdf", "_blank", "noopener,noreferrer");
  }

  function confirmSignOut() {
    setLogoutOpen(false);
    setMobileOpen(false);
    navigate({ to: "/login" });
  }

  return (
    <div className="flex min-h-screen bg-canvas">
      {/* Desktop sidebar */}
      <aside
        className="relative sticky top-0 hidden h-screen shrink-0 flex-col border-r border-border bg-sidebar transition-[width] duration-300 ease-out lg:flex"
        style={{ width: collapsed ? 84 : 260 }}
      >
        <SidebarContent collapsed={collapsed} onSignOut={() => setLogoutOpen(true)} />
        <button
          type="button"
          onClick={() => setCollapsed((c) => !c)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="absolute -right-3 top-24 grid size-6 place-items-center rounded-full border border-border bg-surface-elevated"
        >
          <ChevronsLeft className={`size-3.5 transition-transform ${collapsed ? "rotate-180" : ""}`} />
        </button>
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation"
            className="absolute inset-0 bg-black/45"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative flex h-full w-[280px] flex-col border-r border-border bg-sidebar shadow-xl">
            <button
              type="button"
              aria-label="Close menu"
              className="absolute top-5 right-4 grid size-9 place-items-center rounded-[10px] border border-border"
              onClick={() => setMobileOpen(false)}
            >
              <X className="size-4" />
            </button>
            <SidebarContent
              collapsed={false}
              onNavigate={() => setMobileOpen(false)}
              onSignOut={() => setLogoutOpen(true)}
            />
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 flex h-20 items-center gap-4 border-b border-border bg-canvas/85 px-6 backdrop-blur-xl xl:px-12 print:hidden">
          <button
            type="button"
            aria-label="Open navigation menu"
            className="control-base grid size-10 place-items-center px-0 lg:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="size-4" />
          </button>

          <nav aria-label="Breadcrumb" className="min-w-0">
            <ol className="flex items-center gap-2 text-[13px]">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Activity className="size-3.5 text-gold" />
                Intelligence
              </li>
              <li aria-hidden className="text-subtle">
                /
              </li>
              <li className="truncate font-medium text-foreground">{current}</li>
            </ol>
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <label className="control-base hidden items-center gap-2 px-3.5 md:flex">
              <Search className="size-4 text-subtle" />
              <span className="sr-only">Search intelligence</span>
              <input
                type="search"
                placeholder="Search brands, themes…"
                className="w-[150px] bg-transparent text-[13px] outline-none placeholder:text-subtle xl:w-[190px]"
              />
            </label>
            <DateSlicer value={period} onChange={(p) => set({ period: p })} />
            <button
              type="button"
              aria-label="Download or print this page"
              title="Print page"
              className="control-base hidden grid w-10 place-items-center px-0 text-muted-foreground hover:text-foreground sm:grid"
              onClick={handlePrint}
            >
              <Download className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Open user guide"
              title="Help"
              className="control-base hidden grid w-10 place-items-center px-0 text-muted-foreground hover:text-foreground sm:grid"
              onClick={handleHelp}
            >
              <HelpCircle className="size-4" />
            </button>
            <ThemeToggle />
            <button
              type="button"
              aria-label="Notifications"
              className="control-base relative grid w-10 place-items-center px-0 text-muted-foreground hover:text-foreground"
            >
              <Bell className="size-4" />
              <span
                aria-hidden
                className="absolute top-2.5 right-2.5 size-1.5 rounded-full bg-gold"
              />
            </button>
            <Link
              to="/dashboard/profile"
              className="control-base flex items-center gap-2.5 pr-3.5 pl-2"
              aria-label="Open profile"
            >
              <span
                className="grid size-7 place-items-center rounded-[9px] text-[11px] font-semibold"
                style={{ background: "var(--gold)", color: "var(--gold-foreground)" }}
              >
                SS
              </span>
              <span className="hidden text-left leading-tight xl:block">
                <span className="block text-[12.5px] font-medium">Sanjay S</span>
                <span className="block text-[10.5px] text-subtle">Brand Director</span>
              </span>
            </Link>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1680px] flex-1 px-6 py-8 xl:px-12 print:py-4">
          <div key={pathname + brand} className="rise">
            {children}
          </div>
        </main>
      </div>

      <ConfirmDialog
        open={logoutOpen}
        title="Sign out?"
        description="Are you sure you want to log out? You will need to sign in again to access your workspace."
        confirmLabel="Sign out"
        cancelLabel="Stay signed in"
        onConfirm={confirmSignOut}
        onCancel={() => setLogoutOpen(false)}
      />
    </div>
  );
}

export function PageHeader({
  title,
  subtitleBrand,
  description,
  actions,
}: {
  title: string;
  subtitleBrand?: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
      <div className="min-w-0">
        <h1 className="text-[32px] leading-[1.15]">{title}</h1>
        {(subtitleBrand || description) && (
          <p className="mt-2 text-[14px] text-muted-foreground">
            {subtitleBrand && <span className="font-medium text-gold">{subtitleBrand}</span>}
            {subtitleBrand && description && <span className="mx-2 text-subtle">·</span>}
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-3 print:hidden">{actions}</div>}
    </div>
  );
}
