"use client"

import { Warehouse } from "@/models/warehouse"
import { ColumnDef } from "@tanstack/react-table"

export function useWarehouseColumns() {
    const colums: ColumnDef<Warehouse>[] = [
        {
            accessorKey: "id",
            header: "ID",
        },
        {
            accessorKey: "name",
            header: "Name",
        },
        {
            accessorKey: "street",
            header: "Street",
        },
        {
            accessorKey: "city",
            header: "City",
        },
        {
            accessorKey: "state",
            header: "State",
        },
        {
            accessorKey: "zip_code",
            header: "Zip Code",
        },
        {
            accessorKey: "is_main_warehouse",
            header: "Main Warehouse",
            cell: ({ row }) => {
                const warehouse = row.original
                return <span>{warehouse.is_main_warehouse ? "Yes" : "No"}</span>
            }
        }
    ]
    
    return colums
}