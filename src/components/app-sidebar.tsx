"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  Box,
  Car,
  Container,
  CreditCard,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  Warehouse,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "admin",
    email: "admin@eshop.com",
    avatar: "/avatars/ido.jpg",
  },
  teams: [
    {
      name: "Eshop",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Products",
      url: "#",
      icon: Car,
      isActive: true,
      items: [
        {
          title: "List",
          url: "#",
        },
        {
          title: "Categories",
          url: "#",
        },
      ],
    },
    {
      title: "Order",
      url: "#",
      icon: Container,
      items: [
        {
          title: "List",
          url: "#",
        },
      ],
    },
    {
      title: "Payment",
      url: "#",
      icon: CreditCard,
      items: [
        {
          title: "List",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Warehouse",
      url: "#",
      icon: Warehouse,
    },
    {
      name: "Sales",
      url: "#",
      icon: PieChart,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
