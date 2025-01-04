"use client"

import { getAllWarehousesAction } from "@/actions/warehouse-actions";
import { useAuth } from "@/context/auth-context";
import { useToast } from "@/hooks/use-toast";
import { Warehouse } from "@/models/warehouse";
import { useEffect, useState } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ClientDataTable } from "./data-table-warehouse-client";

export default function WarehousePage() {
    const { getAccessToken } = useAuth()
    const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
    const { toast } = useToast()

    const fetchWarehouses = async () => {
        try {
            const accessToken = await getAccessToken();
            if (accessToken) {
                const fetchedWarehouses = await getAllWarehousesAction(accessToken);
                setWarehouses(fetchedWarehouses);
            }
        } catch (error) {
            console.error("Error fetching warehouses:", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Error fetching warehouses",
            })
            console.error('Error fetching warehouses:', error);
        }
    };

    useEffect(() => {
        fetchWarehouses();
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
                            Order
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
                <ClientDataTable warehouses={warehouses} />
            </div>
        </>
    )
}