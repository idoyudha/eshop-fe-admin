"use client"

import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table"
import { Sale } from "@/models/sales"
import { Button } from "@/components/ui/button"
import { format } from "date-fns";
import { formatMoney } from "@/lib/utils";

export function useSalesColumns() {
    const columns: ColumnDef<Sale>[] = [
        // {
        //     accessorKey: "id",
        //     header: "ID",
        // },
        {
            accessorKey: "user_id",
            header: "User ID",
        },
        {
            accessorKey: "order_id",
            header: "Order ID",
        },
        {
            accessorKey: "product_id",
            header: "Product ID",
        },
        {
            accessorKey: "product_quantity",
            header: "Product Quantity",
        },
        {
            accessorKey: "margin_per_product",
            header: "Margin Per Product",
            cell: ({ row }) => {
                const margin = row.original.margin_per_product;
                return formatMoney({ price: margin, currency: "USD" });
            }
        },
        {
            accessorKey: "created_at",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Created At
                        <ArrowUpDown />
                    </Button>
                )
            },
            cell: ({ row }) => {
                const createdAt = row.original.created_at;
                return format(new Date(createdAt), "dd MMM yyyy, hh:mm:ss a");
            },
            enableSorting: true,
            sortingFn: (rowA, rowB, columnId) => {
                const dateA = new Date(rowA.original.created_at);
                const dateB = new Date(rowB.original.created_at);
                return dateA.getTime() - dateB.getTime();
            },
        }
    ]

    return columns
}