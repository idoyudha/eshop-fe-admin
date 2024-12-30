"use client"

import * as React from "react"
import {
  Car,
  Container,
  CreditCard,
  GalleryVerticalEnd,
  PieChart,
  Warehouse,
} from "lucide-react"

import { NavItems } from "@/components/nav-items"
import { NavUser } from "@/components/nav-user"
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
    // avatar: "/avatars/ido.jpg",
  },
  customer: [
    {
      name: "Products",
      url: "/product",
      icon: Car,
    },
    {
      name: "Orders",
      url: "/order",
      icon: Container,
    },
    {
      name: "Payments",
      url: "/payment",
      icon: CreditCard,
    },
  ],
  admin: [
    {
      name: "Warehouse",
      url: "/warehouse",
      icon: Warehouse,
    },
    {
      name: "Sales",
      url: "/sales",
      icon: PieChart,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <h2>Dashboard</h2>
      </SidebarHeader>
      <SidebarContent>
        <NavItems items={data.customer} />
        <NavItems items={data.admin} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
