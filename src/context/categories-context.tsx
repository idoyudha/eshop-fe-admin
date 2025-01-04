"use client"

import { getAllCategoriesAction } from "@/actions/product-actions";
import { ParentCategory } from "@/models/category";
import { createContext, useContext, useEffect, useState } from "react";


interface CategoriesContextType {
    categories: ParentCategory[];
    categoriesMap: { [key: string]: string };
    isLoading: boolean;
}

const CategoriesContext = createContext<CategoriesContextType>({
    categories: [],
    categoriesMap: {},
    isLoading: true,
})

export function CategoriesProvider({ children }: { children: React.ReactNode }) {
    const [categories, setCategories] = useState<ParentCategory[]>([])
    const [categoriesMap, setCategoriesMap] = useState<{ [key: string]: string }>({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const fetchedCategories = await getAllCategoriesAction()
                setCategories(fetchedCategories)

                // create the map for id to name mapping
                const mappedCategories: { [key: string]: string } = {}
                fetchedCategories.forEach(parent => {
                    // add parent category
                    mappedCategories[parent.id] = parent.name

                    // add child categories
                    parent.childs?.forEach(child => {
                        mappedCategories[child.id] = child.name
                    })
                })

                setCategoriesMap(mappedCategories)
            } catch (error) {
                console.error('Error fetching categories:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchCategories()
    }, [])

    return (
        <CategoriesContext.Provider value={{ 
            categories, 
            categoriesMap,
            isLoading 
        }}>
            {children}
        </CategoriesContext.Provider>
    )
}

// custom hook
export function useCategories() {
    const context = useContext(CategoriesContext)
    if (context === undefined) {
        throw new Error('useCategories must be used within a CategoriesProvider')
    }
    return context
}