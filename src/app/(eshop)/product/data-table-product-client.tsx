"use client"

import { Product } from "@/models/product"
import { useProductColumns } from "./columns"
import { DataTable } from "@/components/data-table"

export function ClientDataTable({ products }: { products: Product[] }) {
    const columns = useProductColumns()
    return <DataTable columns={columns} data={products} />
}