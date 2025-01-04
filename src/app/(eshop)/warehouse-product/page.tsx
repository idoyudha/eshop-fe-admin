"use client"

import { useAuth } from "@/context/auth-context";
import { useToast } from "@/hooks/use-toast";
import { WarehouseProduct } from "@/models/warehouse";
import { useEffect, useState } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ClientDataTable } from "./data-table-warehouse-client";
import { getAllWarehouseProductsAction } from "@/actions/warehouse-product-actions";

export default function WarehouseProductPage() {
    const { getAccessToken } = useAuth()
    const [warehouseProducts, setWarehouseProducts] = useState<WarehouseProduct[]>([]);
    const { toast } = useToast()

    const fetchWarehouseProducts = async () => {
        try {
            const accessToken = await getAccessToken();
            if (accessToken) {
                const fetchedWarehouses = await getAllWarehouseProductsAction(accessToken);
                setWarehouseProducts(fetchedWarehouses);
            }
        } catch (error) {
            console.error("Error fetching warehouse products:", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Error fetching warehouse products",
            })
            console.error('Error fetching warehouse products:', error);
        }
    };

    useEffect(() => {
        fetchWarehouseProducts();
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
                            Warehouse Product
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
                <ClientDataTable warehouseProducts={warehouseProducts} />
            </div>
        </>
    )
}