import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { PostData } from '../models/post.model';

@Injectable({
    providedIn: 'root'
})
export class Api {
    private http = inject(HttpClient);

    private baseUrl = 'http://127.0.0.1:8000/api';

    getPosts(): Observable<Post[]> {
        return this.http.get<Post[]>(`${this.baseUrl}/posts`);
    }

    addPost(data: PostData): Observable<Post> {
        return this.http.post<Post>(`${this.baseUrl}/posts/add`, data);
    }

    editPost(id: number, data: PostData): Observable<Post> {
        return this.http.post<Post>(`${this.baseUrl}/posts/edit/${id}`, data);
    }

    deletePost(id: number): Observable<any> {
        return this.http.delete<any>(`${this.baseUrl}/posts/delete/${id}`);
    }

    restorePost(id: number): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/posts/restore/${id}`, {});
    }

    forceDeletePost(id: number): Observable<any> {
        return this.http.delete<any>(`${this.baseUrl}/posts/forceDelete/${id}`);
    }
}
