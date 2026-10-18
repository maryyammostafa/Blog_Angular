import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PostsComponent } from './pages/posts/posts.component';
import { AddPostComponent } from './pages/posts/components/add-post/add-post.component';
import { EditPostComponent } from './pages/posts/components/edit-post/edit-post.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'posts', component: PostsComponent },
    { path: 'posts/addPost', component: AddPostComponent },
    { path: 'posts/editPost', component: EditPostComponent },
];
