"use client"

import { useState } from "react"
import { SortingState } from "@tanstack/react-table"
import { usePaymentColumns } from "./columns"
import { DataTable } from "@/components/data-table"
import { Payment } from "@/models/payment"

export function ClientDataTable({ payments }: { payments: Payment[] }) {
    const [sorting, setSorting] = useState<SortingState>([])
    const columns = usePaymentColumns()
    return (
        <DataTable 
            columns={columns} 
            data={payments}
            sorting={sorting}
            onSortingChange={setSorting}
        />
    )
}