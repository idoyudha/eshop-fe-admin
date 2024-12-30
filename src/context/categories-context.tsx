"use client"

import { getAllCategoriesAction } from "@/actions/product-actions";
import { createContext, useContext, useEffect, useState } from "react";

type CategoryMap = {
    [key: string]: string;
}

interface CategoriesContextType {
    categories: CategoryMap;
    isLoading: boolean;
}

const CategoriesContext = createContext<CategoriesContextType>({
    categories: {},
    isLoading: true,
})

export function CategoriesProvider({ children }: { children: React.ReactNode }) {
    const [categoriesMap, setCategoriesMap] = useState<CategoryMap>({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categories = await getAllCategoriesAction()
                const mappedCategories: CategoryMap = {}

                // pap both parent and child categories
                categories.forEach(parent => {
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
        <CategoriesContext.Provider value={{ categories: categoriesMap, isLoading }}>
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