"use client"
 
import { useCategories } from "@/context/categories-context"
import { Product } from "@/models/product"
import { ColumnDef } from "@tanstack/react-table"
import Image from "next/image"

export function useProductColumns() {
    const { categories, isLoading } = useCategories()

    const columns: ColumnDef<Product>[] = [
        {
            accessorKey: "sku",
            header: "SKU",
        },
        {
            accessorKey: "name",
            header: "Name",
        },
        {
            accessorKey: "category_id",
            header: "Category",
            cell: ({ row }) => {
                const categoryId = row.getValue("category_id") as string
                return isLoading ? (
                    <span className="text-gray-400">Loading...</span>
                ) : (
                    <span>{categories[categoryId] || 'Unknown Category'}</span>
                )
            }
        },
        {
            accessorKey: "image_url",
            header: "Image",
            cell: ({ row }) => {
                const image_url = row.getValue("image_url") as string
                return (
                    <div className="flex items-center justify-center">
                        {image_url ? (
                            <Image
                                src={image_url}
                                alt={`Product ${row.getValue("name")}`}
                                width={50}
                                height={50}
                                className="object-cover rounded-md"
                                priority={false}
                            />
                        ) : (
                            <div className="w-[50px] h-[50px] bg-gray-100 rounded-md flex items-center justify-center">
                                <span className="text-gray-400 text-xs">No image</span>
                            </div>
                        )}
                    </div>
                )
            },
        },
        {
            accessorKey: "description",
            header: "Description",
        },
        {
            accessorKey: "price",
            header: "Price",
        },
        {
            accessorKey: "quantity",
            header: "Quantity",
        },
    ]

    return columns
}