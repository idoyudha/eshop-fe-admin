import "@/app/globals.css";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { CategoriesProvider } from "@/context/categories-context";

export default async function EshopLayout({ children }: Readonly<{children: React.ReactNode}>) {
    return (
        <CategoriesProvider>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    {children}
                </SidebarInset>
            </SidebarProvider>
        </CategoriesProvider>
    )
}