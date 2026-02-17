import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ListingService {

    private draft: any;
    private readonly key = 'listings';

    constructor() {
        this.seedSampleData();
    }

    getAll() {
        return JSON.parse(localStorage.getItem('listings') || '[]');
    }

    add(post: any) {
        const posts = this.getAll();
        posts.push({ ...post, id: Date.now() });
        localStorage.setItem('listings', JSON.stringify(posts));
    }

    getById(id: string) {
        return this.getAll().find((x: any) => x.id === id);
    }

    setDraft(data: any) {
        this.draft = data;
    }

    getDraft() {
        return this.draft;
    }

    create(data: any) {
        const all = this.getAll();
        all.push(data);
        localStorage.setItem(this.key, JSON.stringify(all));
    }

    update(id: string, data: any) {
        const all = this.getAll().map((x: any) =>
            x.id === id ? { ...x, ...data } : x
        );
        localStorage.setItem(this.key, JSON.stringify(all));
    }

    delete(id: string) {
        const all = this.getAll().filter((x: any) => x.id !== id);
        localStorage.setItem(this.key, JSON.stringify(all));
    }

    toggleFavourite(id: string) {
        let fav = JSON.parse(localStorage.getItem('favourites') || '[]');
        fav = fav.includes(id) ? fav.filter((x: any) => x !== id) : [...fav, id];
        localStorage.setItem('favourites', JSON.stringify(fav));
    }

    getFavourites(): any[] {
        const fav = JSON.parse(localStorage.getItem('favourites') || '[]');
        return this.getAll().filter((x: any) => fav.includes(x.id));
    }

    addComment(id: string, text: string, user: string) {
        const all = this.getAll();
        const item = all.find((x: any) => x.id === id);

        if (!item.comments) item.comments = [];

        item.comments.push({
            user,
            text,
            date: new Date()
        });

        localStorage.setItem(this.key, JSON.stringify(all));
    }

    public seedSampleData() {
        if (!localStorage.getItem(this.key)) {
            const sample = [
                {
                    id: crypto.randomUUID(),
                    title: 'Luxury Sea View Apartment',
                    description: '2BHK fully furnished apartment near beach',
                    price: 12000,
                    image: 'https://picsum.photos/600/400?random=1',
                    owner: 'demo@user.com',
                    comments: []
                },
                {
                    id: crypto.randomUUID(),
                    title: 'Budget PG Accommodation',
                    description: 'Affordable stay for students',
                    price: 3500,
                    image: 'https://picsum.photos/600/400?random=2',
                    owner: 'demo@user.com',
                    comments: []
                }
            ];
            localStorage.setItem(this.key, JSON.stringify(sample));
        }
    }
}