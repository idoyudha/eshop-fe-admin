export interface ParentCategory {
    id: string;
    name: string;
    childs: ChildCategory[];
}

export interface ChildCategory {
    id: string;
    name: string;
}