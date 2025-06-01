import { Routes } from '@angular/router';
import { LandingHeroComponent } from './landing-hero/landing-hero.component';
import { ProduktlisteComponent } from './produktliste/produktliste.component';


export const routes: Routes = [
    { path: '', component: LandingHeroComponent },
    { path: 'products', component: ProduktlisteComponent}
];