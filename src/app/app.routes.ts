import { Routes } from '@angular/router';

// ინგლისური ვერსიის კომპონენტები
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { WinesComponent } from './pages/wines/wines.component';
import { VineyardComponent } from './pages/vineyard/vineyard.component';
import { BoutiqueComponent } from './pages/boutique/boutique.component';
import { CellarComponent } from './pages/cellar/cellar.component';

// ქართული ვერსიის კომპონენტები
import { HomeComponent as HomeKaComponent } from './pages-ka/home/home.component';
import { AboutComponent as AboutKaComponent } from './pages-ka/about/about.component';
import { WinesComponent as WinesKaComponent } from './pages-ka/wines/wines.component';
import { VineyardComponent as VineyardKaComponent } from './pages-ka/vineyard/vineyard.component';
import { BoutiqueComponent as BoutiqueKaComponent } from './pages-ka/boutique/boutique.component';
import { CellarComponent as CellarKaComponent } from './pages-ka/cellar/cellar.component';

export const routes: Routes = [
  // Default redirect
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // ინგლისური ვერსია
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'wines', component: WinesComponent },
  { path: 'vineyard', component: VineyardComponent },
  { path: 'boutique', component: BoutiqueComponent },
  { path: 'cellar', component: CellarComponent },

  // ქართული ვერსია (ka prefix)
  { path: 'ka/home', component: HomeKaComponent },
  { path: 'ka/about', component: AboutKaComponent },
  { path: 'ka/wines', component: WinesKaComponent },
  { path: 'ka/vineyard', component: VineyardKaComponent },
  { path: 'ka/boutique', component: BoutiqueKaComponent },
  { path: 'ka/cellar', component: CellarKaComponent },

  // 404 redirect
  { path: '**', redirectTo: 'home' }
];
