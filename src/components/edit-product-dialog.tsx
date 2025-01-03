import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Product } from "@/models/product"
import { DropdownMenuItem } from "./ui/dropdown-menu"
import { useState } from "react"
import { useCategories } from "@/context/categories-context"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select"
import { Textarea } from "./ui/textarea"

export function EditProductDialog(product: Product) {
    const [open, setOpen] = useState(false)
    const { categories, categoriesMap, isLoading } = useCategories()
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => {
                    e.preventDefault()
                    setOpen(true)
                }}>
                    Edit
                </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit product</DialogTitle>
                    <DialogDescription>
                        Make changes to selected product here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input id="name" defaultValue={product.name} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="category" className="text-right">
                            Category
                        </Label>
                        <div className="col-span-3">
                            <Select defaultValue={product.category_id}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a category">
                                        {categoriesMap[product.category_id] || "Select a category"}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {isLoading ? (
                                        <SelectItem value="loading" disabled>
                                            Loading categories...
                                        </SelectItem>
                                    ) : (
                                        categories.map(parent => (
                                            <SelectGroup key={parent.id}>
                                                <SelectLabel>{parent.name}</SelectLabel>
                                                {parent.childs.map(child => (
                                                    <SelectItem 
                                                        key={child.id} 
                                                        value={child.id}
                                                    >
                                                        {child.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        ))
                                    )}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="image" className="text-right">
                            Image
                        </Label>
                        <Input id="image" defaultValue={product.image_url} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                            Description
                        </Label>
                        <Textarea id="description" defaultValue={product.description} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="price" className="text-right">
                            Price
                        </Label>
                        <Input id="price" defaultValue={product.price}  className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
