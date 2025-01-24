"use client"

import { useState } from "react"
import { SortingState } from "@tanstack/react-table"
import { useSalesColumns } from "./columns"
import { DataTable } from "@/components/data-table"
import { Sale } from "@/models/sales"

export function ClientDataTable({ sales, loading }: { sales: Sale[], loading: boolean }) {
    const [sorting, setSorting] = useState<SortingState>([])
    const columns = useSalesColumns()

    return (
        <DataTable 
            columns={columns} 
            data={sales}
            sorting={sorting}
            onSortingChange={setSorting}
            isLoading={loading}
        />
    )
}