"use client"

import { getAllPaymentsAction } from "@/actions/payment-actions";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/context/auth-context";
import { Payment } from "@/models/payment";
import { useEffect, useState } from "react";
import { ClientDataTable } from "./data-table-payment-client";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function PaymentPage() {
    const { getAccessToken } = useAuth()
    const [payments, setPayments] = useState<Payment[]>([]);
    const [loading, setLoading] = useState(false)
    const { toast } = useToast();

    const fetchPayments = async () => {
        try {
            setLoading(true)
            const accessToken = await getAccessToken();
            if (accessToken) {
                const paymentData = await getAllPaymentsAction(accessToken);
                setPayments(paymentData || []);
            }
        } catch (error) {
            setPayments([]);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Error fetching payments",
            })
            console.error('Error fetching payments:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPayments();
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
                            Payment
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
                {
                    loading ? (
                        <div className="flex items-center justify-center">
                            <Loader2 className="animate-spin" />
                        </div>
                    ) : (
                        <ClientDataTable payments={payments} />
                    )
                }
            </div>
        </>
    )
}