"use client"

import { createProductAction } from "@/actions/product-actions";
import { useAuth } from "@/context/auth-context";
import { useCategories } from "@/context/categories-context";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Loader2 } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";

export function AddProductDialog() {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const { categories } = useCategories()
    const { isAuthenticated, getAccessToken } = useAuth();
    const { toast } = useToast();
    const router = useRouter()
    const formRef = useRef<HTMLFormElement>(null);
    const [selectedCategory, setSelectedCategory] = useState("");

    const handleAddProduct = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isAuthenticated) {
            router.push('/auth/login');
            return;
        }

        try {
            setLoading(true)
            const accessToken = await getAccessToken();
            if (!accessToken) {
                return;
            }

            const formData = new FormData(formRef.current!);
            const imageFile = (formRef.current?.querySelector('input[type="file"]') as HTMLInputElement)?.files?.[0];
            if (!imageFile) {
                throw new Error("Image file is required");
            }

            const productData = {
                name: formData.get('name') as string,
                image: imageFile,
                description: formData.get('description') as string,
                price: parseFloat(formData.get('price') as string),
                quantity: parseInt(formData.get('quantity') as string),
                category_id: selectedCategory,
            };

            await createProductAction(productData, accessToken);

            toast({
                title: "Product added successfully",
                description: "Your product has been added successfully",
            })

            formRef.current?.reset();
            setSelectedCategory("")
            setLoading(false)
            setOpen(false)
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong",
                variant: "destructive"
            })
        } finally {
            setLoading(false)
        }
    }    
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Add Product</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form ref={formRef} onSubmit={handleAddProduct}>
                    <DialogHeader>
                        <DialogTitle>Add Product</DialogTitle>
                        <DialogDescription>
                            Add your product here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="image" className="text-right">
                                Image
                            </Label>
                            <Input
                                id="picture" 
                                name="picture" 
                                type="file" 
                                accept="image/*"
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                Description
                            </Label>
                            <Textarea
                                id="description"
                                name="description"
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="price" className="text-right">
                                Price (USD)
                            </Label>
                            <Input
                                id="price"
                                name="price"
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="quantity" className="text-right">
                                Quantity
                            </Label>
                            <Input
                                id="quantity"
                                name="quantity"
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="select" className="text-right">
                                Select
                            </Label>
                            <Select
                                name="category_id"
                                value={selectedCategory}
                                onValueChange={setSelectedCategory}
                            >
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectGroup key={category.id}>
                                            <SelectLabel>{category.name}</SelectLabel>
                                            {category.childs.map((child) => (
                                                <SelectItem key={child.id} value={child.id}>
                                                    {child.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button 
                            type="submit" 
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                </>
                            ) : (
                                "Add Product"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}