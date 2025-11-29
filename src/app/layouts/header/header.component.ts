// layouts/header/header.component.ts
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { StorageService } from '../../storage.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  searchQuery: string = '';
  isMenuOpen: boolean = false;
  currentLanguage: 'ENG' | 'ქარ' = 'ENG';
  private languageSubscription?: Subscription;
  private routerSubscription?: Subscription;

  leftMenuItems = [
    { label: 'Home', route: '/home' },
    { label: 'About', route: '/about' },
    { label: 'Wines', route: '/wines' },
  ];

  rightMenuItems = [
    { label: 'Vineyard', route: '/vineyard' },
    { label: 'Boutique', route: '/boutique' },
    { label: 'Cellar', route: '/cellar' },
  ];

  // ეკრანის ზომის თვალყურის დევნება
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    // თუ ეკრანი 1115px-ზე მეტია და მენიუ გახსნილია, დავხუროთ
    if (window.innerWidth > 1115 && this.isMenuOpen) {
      this.isMenuOpen = false;
    }
  }

  // დინამიურად გენერირებული routerLink
  getRoute(route: string): string {
    return this.currentLanguage === 'ქარ' ? '/ka' + route : route;
  }

  constructor(
    private router: Router,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    // პირველი ჩატვირთვისას ენის სინქრონიზაცია URL-თან
    this.syncLanguageWithRoute();

    // ენის გამოწერა
    this.languageSubscription = this.storageService.languageChange.subscribe(
      (lang) => {
        this.currentLanguage = lang;
      }
    );

    // როუტის ცვლილებებზე დაკვირვება
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.syncLanguageWithRoute();
        // როუტის ცვლილებისას დავხუროთ მობილური მენიუ
        this.isMenuOpen = false;
      });
  }

  ngOnDestroy() {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  private syncLanguageWithRoute() {
    const currentUrl = this.router.url;
    const savedLanguage = this.storageService.getCurrentLanguage();

    if (currentUrl.startsWith('/ka/') && savedLanguage === 'ENG') {
      this.storageService.setLanguage('ქარ');
    } else if (!currentUrl.startsWith('/ka/') && savedLanguage === 'ქარ') {
      this.storageService.setLanguage('ENG');
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  switchLanguage(language: 'ENG' | 'ქარ') {
    this.storageService.setLanguage(language);

    const currentUrl = this.router.url;
    const segments = currentUrl.split('/').filter((s) => s);

    let targetUrl = '';

    if (language === 'ქარ') {
      // თუ უკვე არ არის /ka/ პრეფიქსი, დავამატოთ
      if (segments[0] !== 'ka') {
        targetUrl = '/ka/' + segments.join('/');
      } else {
        targetUrl = currentUrl;
      }
    } else {
      // თუ არის /ka/ პრეფიქსი, წავშალოთ
      if (segments[0] === 'ka') {
        targetUrl = '/' + segments.slice(1).join('/');
      } else {
        targetUrl = currentUrl;
      }
    }

    this.router.navigateByUrl(targetUrl);
  }

  translateLabelKa(label: string): string {
    const translations: { [key: string]: string } = {
      Home: 'მთავარი',
      About: 'ჩვენს შესახებ',
      Wines: 'ღვინოები',
      Vineyard: 'ვენახები',
      Boutique: 'ბუტიკი',
      Cellar: 'ღვინის მარანი',
    };
    return translations[label] || label;
  }
}