export interface Post {
    id: string;
    author_name: string;
    title: string;
    body: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

export interface PostData {
    title: string;
    body: string;
    author_name: string;
}