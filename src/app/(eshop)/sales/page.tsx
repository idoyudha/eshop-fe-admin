"use client"

import { useAuth } from "@/context/auth-context"
import { useEffect, useState } from "react";
import { Sale } from "@/models/sales";
import { useToast } from "@/hooks/use-toast";
import { getSalesAction, getSalesReportXLSXAction } from "@/actions/sale-actions";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ClientDataTable } from "./data-table-sales-client";
import { DownloadIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SalesPage() {
    const { getAccessToken } = useAuth()
    const [sales, setSales] = useState<Sale[]>([]);
    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(0); // for pagination
    const [limit, setLimit] = useState(30); // for pagination
    const [count, setCount] = useState(0); // for pagination

    const handleDownloadReport = async () => {
        try {
            const accessToken = await getAccessToken();
            if (!accessToken) {
                return
            }
            const blob = await getSalesReportXLSXAction(accessToken);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a'); // create temporary link
            a.href = url; // set url to blob
            a.download = `sales-report-${new Date().toISOString().split('T')[0]}.xlsx`;
            document.body.appendChild(a);
            a.click(); // trigger download
            // clean up
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Error downloading report",
            })
        }
    }

    const fetchSales = async () => {
        try {
            const accessToken = await getAccessToken();
            if (accessToken) {
                const { data, count } = await getSalesAction(accessToken, page, limit);
                setSales(data || []);
                setCount(count);
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
    }, [getAccessToken, page, limit]);

    return (
        <>
            <header className="flex h-16 shrink-0 items-center justify-between transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
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
                <div className="px-4">
                    <Button 
                        variant="outline" 
                        size="icon"
                        onClick={handleDownloadReport}
                    >
                        <DownloadIcon className="h-4 w-4" />
                    </Button>
                </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <ClientDataTable 
                    sales={sales} 
                    loading={isLoading}
                />
            </div>
        </>
    )
}