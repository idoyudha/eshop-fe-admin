"use client"

import { DataTable } from "@/components/data-table"
import { StockMovement, Warehouse, WarehouseProduct } from "@/models/warehouse"
import { useStockMovementColumns } from "./column"

export function ClientDataTable({ stockMovements }: { stockMovements: StockMovement[] }) {
    const columns = useStockMovementColumns()
    return <DataTable columns={columns} data={stockMovements} />
}