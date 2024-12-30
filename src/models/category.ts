export interface ParentCategory {
    id: string;
    name: string;
    childs: ChildCategory[];
}

interface ChildCategory {
    id: string;
    name: string;
}