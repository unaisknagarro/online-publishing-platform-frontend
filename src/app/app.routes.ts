import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Authors } from './pages/authors/authors';
import { Tags } from './pages/tags/tags';
import { Callback } from './pages/callback';
import { AuthGuard } from './core/guards/auth-guard';
import { RoleGuard } from './core/guards/role-guard';
//import { Auth } from './core/guards/auth-guard';
export const routes: Routes = [
    { path: '', component: Home },
    {
        path: 'article/:id',
        loadComponent: () =>
            import('./pages/article-detail/article-detail')
                .then(m => m.ArticleDetail)
    },
    {
        path: 'editor',
        canActivate: [AuthGuard, RoleGuard('editor')],
        loadComponent: () =>
            import('./pages/editor/editor')
                .then(m => m.Editor)
    },
    { path: 'authors', component: Authors },
    { path: 'tags', component: Tags },
    { path: 'callback', loadComponent: () => import('./pages/callback').then(m => m.Callback) }
];