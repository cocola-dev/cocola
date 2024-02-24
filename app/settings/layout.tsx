"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import Header from "./components/Header";
import {
  Bell,
  BookMarked,
  Bot,
  Brush,
  Building,
  Building2,
  Clock4,
  Code,
  Computer,
  CornerUpLeft,
  CreditCard,
  Globe,
  KeyRound,
  LayoutGrid,
  Mail,
  MessageSquareWarning,
  Package,
  PanelTop,
  PersonStanding,
  Radio,
  ScrollText,
  Settings,
  Shield,
  ShieldCheck,
  User,
} from "lucide-react";
import { redirect, usePathname } from "next/navigation";
import Link from "next/link";
import SidebarMaper from "./components/SidebarMaper";
import { Separator } from "@/components/ui/separator";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const user = useCurrentUser();
  const path = usePathname();

  if (!user) return redirect("/login");

  const sections = [
    {
      path: "/settings" || "/settings/profile",
      icon: <User size={18} />,
      text: "Public profile",
    },
    {
      path: "/settings/account",
      icon: <Settings size={18} />,
      text: "Account",
    },
    {
      path: "/settings/appearance",
      icon: <Brush size={18} />,
      text: "Appearance",
    },
    {
      path: "/settings/accessibility",
      icon: <PersonStanding size={18} />,
      text: "Accessibility",
    },
    {
      path: "/settings/notifications",
      icon: <Bell size={18} />,
      text: "Notifications",
    },
  ];

  const sections_Access = [
    {
      path: "/settings/billing",
      icon: <CreditCard size={18} />,
      text: "Billing and plans",
    },
    {
      path: "/settings/emails",
      icon: <Mail size={18} />,
      text: "Emails",
    },
    {
      path: "/settings/security",
      icon: <Shield size={18} />,
      text: "Password and authentication",
    },
    {
      path: "/settings/sessions",
      icon: <Radio size={18} />,
      text: "Sessions",
    },
    {
      path: "/settings/keys",
      icon: <KeyRound size={18} />,
      text: "SSH and GPG Keys ",
    },
    {
      path: "/settings/organizations",
      icon: <Building2 size={18} />,
      text: "Organizations ",
    },
    {
      path: "/settings/enterprises",
      icon: <Globe size={18} />,
      text: "Enterprises ",
    },
    {
      path: "/settings/moderation",
      icon: <MessageSquareWarning size={18} />,
      text: "Moderation",
    },
  ];

  const sections_CodePlanningAutomation = [
    {
      path: "/settings/repositories",
      icon: <BookMarked size={18} />,
      text: "Repositories",
    },

    {
      path: "/settings/codespaces",
      icon: <Computer size={18} />,
      text: "Codespaces",
    },
    {
      path: "/settings/Packages",
      icon: <Package size={18} />,
      text: "Packages",
    },
    {
      path: "/settings/copilot",
      icon: <Bot size={18} />,
      text: "copilot",
    },
    {
      path: "/settings/Pages",
      icon: <PanelTop size={18} />,
      text: "Pages",
    },
    {
      path: "/settings/Pages",
      icon: <CornerUpLeft size={18} />,
      text: "Saved replies",
    },
  ];

  const sections_Security = [
    {
      path: "/settings/security_analysis",
      icon: <ShieldCheck size={18} />,
      text: "Code security and analsis",
    },
  ];

  const sections_Integrations = [
    {
      path: "/settings/installations",
      icon: <LayoutGrid size={18} />,
      text: "Applicatons",
    },
    {
      path: "/settings/reminders",
      icon: <Clock4 size={18} />,
      text: "Scheduled reminders",
    },
  ];

  const sections_Archives = [
    {
      path: "/settings/security-log",
      icon: <ScrollText size={18} />,
      text: "Security log",
    },
    {
      path: "/settings/sponsors-log",
      icon: <ScrollText size={18} />,
      text: "Sponsors log",
    },
  ];

  const sections_devapps = [
    {
      path: "/settings/apps",
      icon: <Code size={18} />,
      text: "Developer Settings",
    },
  ];

  return (
    <div className="mx-40 mt-7">
      <Header user={user} />
      <div className="mt-5 flex w-full">
        <div className="w-64 ">
          <SidebarMaper sections={sections} path={path} />
          <Separator className="my-4" />
          <div className="text-xs text-muted-foreground ml-4 my-2">Access</div>
          <SidebarMaper sections={sections_Access} path={path} />
          <Separator className="my-4" />
          <div className="text-xs text-muted-foreground ml-4 my-2">
            Code, planning, and automation
          </div>
          <SidebarMaper
            sections={sections_CodePlanningAutomation}
            path={path}
          />
          <Separator className="my-4" />
          <div className="text-xs text-muted-foreground ml-4 my-2">
            Security
          </div>
          <SidebarMaper sections={sections_Security} path={path} />
          <Separator className="my-4" />
          <div className="text-xs text-muted-foreground ml-4 my-2">
            Integrations
          </div>
          <SidebarMaper sections={sections_Integrations} path={path} />
          <Separator className="my-4" />
          <div className="text-xs text-muted-foreground ml-4 my-2">
            Archives
          </div>
          <SidebarMaper sections={sections_Archives} path={path} />
          <Separator className="my-4" />
          <SidebarMaper sections={sections_devapps} path={path} />
        </div>

        {children}
      </div>
    </div>
  );
};

export default Layout;
