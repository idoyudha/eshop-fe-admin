"use client"

import { useAuth } from "@/context/auth-context";
import { useToast } from "@/hooks/use-toast";
import { StockMovement, WarehouseProduct } from "@/models/warehouse";
import { useEffect, useState } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar";
import { getAllWarehouseProductsAction } from "@/actions/warehouse-product-actions";
import { getAllStockMovementsAction } from "@/actions/stock-movement";
import { ClientDataTable } from "./data-table-stock-movement-client";

export default function StockMovementPage() {
    const { getAccessToken } = useAuth()
    const [stockMovements, setStockMovements] = useState<StockMovement[]>([]);
    const { toast } = useToast()

    const fetchWarehouseProducts = async () => {
        try {
            const accessToken = await getAccessToken();
            if (accessToken) {
                const fetchedStockMovements = await getAllStockMovementsAction(accessToken);
                setStockMovements(fetchedStockMovements);
            }
        } catch (error) {
            console.error("Error fetching stock movements:", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Error fetching stock movements",
            })
            console.error('Error fetching stock movements:', error);
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
                            Stock Movements
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
                <ClientDataTable stockMovements={stockMovements} />
            </div>
        </>
    )
}