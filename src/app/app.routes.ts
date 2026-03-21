import { Routes } from '@angular/router';



export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full' },
    {path: 'home', loadComponent: () => import('../pages/home/home.component').then(m => m.HomeComponent) },
    {path: 'auth', loadComponent: () => import('../pages/auth/auth.component').then(m => m.AuthComponent) },
    {path: 'profile', loadComponent: () => import('../pages/profile/profile.component').then(m => m.ProfileComponent) },
    {path: 'feed', loadComponent: () => import('../pages/feed/feed/feed.component').then(m => m.FeedComponent) },
    {path:'connection', loadComponent: () => import('../pages/connection/connection.component').then(m => m.ConnectionComponent) },
    {path:'friend-requests', loadComponent: () => import('../pages/friend-request/friend-request.component').then(m => m.FriendRequestComponent) },
    {path: '**', loadComponent:()=> import('../pages/pagenotfound/pagenotfound.component').then(m => m.PagenotfoundComponent) }

];
