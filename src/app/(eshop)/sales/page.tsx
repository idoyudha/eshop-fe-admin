"use client"

import { useAuth } from "@/context/auth-context"
import { useEffect, useState } from "react";
import { Sale } from "@/models/sales";
import { useToast } from "@/hooks/use-toast";
import { getSalesAction } from "@/actions/sale-actions";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ClientDataTable } from "./data-table-sales-client";

export default function SalesPage() {
    const { getAccessToken } = useAuth()
    const [sales, setSales] = useState<Sale[]>([]);
    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState(true);

    const fetchSales = async () => {
        try {
            const accessToken = await getAccessToken();
            if (accessToken) {
                const saleData = await getSalesAction(accessToken);
                setSales(saleData || []);
            }
        } catch (error) {
            setSales([]);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Error fetching sales",
            })
            console.error('Error fetching sales:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSales();
    }, [getAccessToken]);

    return (
        <>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href="#">
                            Sales Report
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                        <BreadcrumbPage>List</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
                </Breadcrumb>
            </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <ClientDataTable sales={sales} loading={isLoading}/>
            </div>
        </>
    )
}