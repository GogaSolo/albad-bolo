import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from '../../storage.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit, OnDestroy {
  currentLanguage: 'ENG' | 'ქარ' = 'ENG';
  private languageSubscription?: Subscription;

  // Navigation links
 dakishvilinavsfooter = {
  title:'Dakishvili',
  titleKa:'დაქიშვილი',
  navigationLinks : [
    { name: 'Home', nameKa: 'მთავარი', route: '/home' },
    { name: 'About', nameKa: 'ჩვენს შესახებ', route: '/about' },
    { name: 'Wines', nameKa: 'ღვინოები', route: '/wines' },
    { name: 'Vineyard', nameKa: 'მეღვინეობა', route: '/vineyard' },
    { name: 'Boutique', nameKa: 'ბუტიკი', route: '/boutique' },
    { name: 'Cellar', nameKa: 'ღვინის მარანი', route: '/cellar' },
  ]
 }

  // Wine Cellar contact info
  wineCellarInfo = {
    title: 'Wine Cellar',
    titleKa: 'ღვინის მარანი',
    contacts: [
      { 
        text: 'Village Shalauri, Telavi, Georgia', 
        textKa: 'სოფ. შალაური, თელავი, საქართველო',
        type: 'address' 
      },
      { 
        text: '+995 577508029', 
        textKa: '+995 577508029',
        type: 'phone', 
        href: 'tel:+995577508029' 
      },
      {
        text: 'info@dakishvili.ge',
        textKa: 'info@dakishvili.ge',
        type: 'email',
        href: 'mailto:info@dakishvili.ge',
      },
    ],
  };

  // Wine Boutique contact info
  wineBoutiqueInfo = {
    title: 'Wine Boutique',
    titleKa: 'ღვინის ბუტიკი',
    contacts: [
      { 
        text: 'Erekle II №2, Telavi, Georgia', 
        textKa: 'ერეკლე II №2, თელავი, საქართველო',
        type: 'address' 
      },
      { 
        text: '+995 571162362', 
        textKa: '+995 571162362',
        type: 'phone', 
        href: 'tel:+995571162362' 
      },
      {
        text: 'boutique@dakishvili.ge',
        textKa: 'boutique@dakishvili.ge',
        type: 'email',
        href: 'mailto:boutique@dakishvili.ge',
      },
    ],
  };

  // Social Media label
  socialMediaLabel = {
    title: 'Follow Us',
    titleKa: 'გამოგვყევით'
  };

  // Social media links
  socialLinks = [
    {
      name: 'Facebook',
      icon: 'fa-brands fa-facebook-f',
      url: 'https://www.facebook.com/DakishviliFamilyVineyards',
      ariaLabel: 'Visit our Facebook page',
      ariaLabelKa: 'ეწვიეთ ჩვენს Facebook გვერდს',
    },
    {
      name: 'Instagram',
      icon: 'fa-brands fa-instagram',
      url: 'https://www.instagram.com/dakishvili_family_vineyards/',
      ariaLabel: 'Visit our Instagram page',
      ariaLabelKa: 'ეწვიეთ ჩვენს Instagram გვერდს',
    },
    {
      name: 'YouTube',
      icon: 'fa fa-tripadvisor',
      url: 'https://www.tripadvisor.com/Restaurant_Review-g1596952-d25949303-Reviews-Dakishvili_Wine_Chocolate-Telavi_Kakheti_Region.html',
      ariaLabel: 'Visit our tripadvisor page',
      ariaLabelKa: 'ეწვიეთ ჩვენს YouTube არხს',
    },
  ];

  // Copyright info
  copyrightText = '© 2025 Dakishvili Family Vineyards';
  copyrightTextKa = '© 2025 დაქიშვილების საოჯახო ვენახები';
  currentYear = new Date().getFullYear();

  constructor(
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit() {
    // ენის გამოწერა
    this.currentLanguage = this.storageService.getCurrentLanguage();
    this.languageSubscription = this.storageService.languageChange.subscribe(
      (lang) => {
        this.currentLanguage = lang;
      }
    );
  }

  ngOnDestroy() {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }

  // დინამიური route-ის გენერაცია
  getRoute(route: string): string {
    return this.currentLanguage === 'ქარ' ? '/ka' + route : route;
  }

  // ტექსტის მიღება მიმდინარე ენით
  getText(item: any, field: string): string {
    const kaField = field + 'Ka';
    return this.currentLanguage === 'ქარ' && item[kaField] ? item[kaField] : item[field];
  }

  // Handle contact clicks
  onContactClick(contact: any): void {
    if (contact.href) {
      window.location.href = contact.href;
    }
  }

  // Handle social media clicks
  onSocialClick(socialLink: any): void {
    window.open(socialLink.url, '_blank', 'noopener noreferrer');
  }
}