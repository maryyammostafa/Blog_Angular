export interface Post {
    id: number;
    author_name: string;
    title: string;
    body: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

export interface PostData {
    authorName: string;
    title: string;
    body: string;
}

export interface Pagination<T>{
    data: T[];
    current_page: number;
    last_page: number;
    total: number;
}