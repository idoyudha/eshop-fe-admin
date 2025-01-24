"use client"

import { useState } from "react"
import { SortingState } from "@tanstack/react-table"
import { useOrderColumns } from "./columns"
import { DataTable } from "@/components/data-table"
import { OrderView } from "@/models/order"

export function ClientDataTable({ orders }: { orders: OrderView[] }) {
    const [sorting, setSorting] = useState<SortingState>([])
    const columns = useOrderColumns()

    return (
        <DataTable 
            columns={columns} 
            data={orders}
            sorting={sorting}
            onSortingChange={setSorting}
        />
    )
}