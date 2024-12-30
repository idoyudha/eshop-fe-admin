"use client"
 
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { useCategories } from "@/context/categories-context"
import { Product } from "@/models/product"
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
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
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const product = row.original
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            }
        }
    ]

    return columns
}