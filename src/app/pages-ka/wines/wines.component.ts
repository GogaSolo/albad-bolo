// src/app/pages/wines/wines.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Wine {
  id: number;
  name: string;
  type: WineType;
  image: string;
  description: string;
  region: string;
  year: number;
  alcohol: number;
  volume: string;
  grapes: string[];
  tastingNotes: string;
  servingTemp: string;
  price: number;
}

export enum WineType {
  DESSERT = 'საამერტო',
  KVEVRI = 'ქვევრის',
  CLASSIC = 'კლასიკური',
  SPARKLING = 'ცქრიალა'
}

@Component({
  selector: 'app-wines',
  standalone: true,  // ეს ხაზი დაამატე!
  imports: [CommonModule, FormsModule],  // და ეს!
  templateUrl: './wines.component.html',
  styleUrls: ['./wines.component.scss']
})



export class WinesComponent implements OnInit {
  wines: Wine[] = [];
  filteredWines: Wine[] = [];
  selectedType: string = '';
  selectedWine: Wine | null = null;
  isDetailView: boolean = false;

  constructor(private router: Router) {
    this.initializeWines();
  }

  ngOnInit() {
    this.filteredWines = this.wines;
    // Debug info
    console.log('WinesComponent initialized');
    console.log('Initial wines count:', this.wines.length);
  }

     initializeWines() {
        this.wines = [
          {
            id: 1,
            name: 'რქაწითელი',
            type: WineType.KVEVRI,
            image: '/assets/wines/ქვევრი/Qvevri_Rkatsiteli.png',
            description: 'ქვევრში დადუღებული ქარვისფერი მშრალი ღვინო',
            region: 'კახეთი, სოფ. ბაბანეური, ახმეტის მიკროზონა',
            year: 2022,
            alcohol: 13,
            volume: '750 მლ',
            grapes: ['რქაწითელი'],
            tastingNotes: 'გარგრის ჩირი, ნუში და ტკბილი სანელებლები',
            servingTemp: '10-12°C',
            price: 45
          },
          {
            id: 2,
            name: 'შარდონე',
            type: WineType.SPARKLING,
            image: '/assets/wines/ცქრიალა/chps.png',
            description: 'ცქრიალა ღვინო შარდონე',
            region: 'კახეთი, სოფ. კონდოლი',
            year: 2021,
            alcohol: 12,
            volume: '750 მლ',
            grapes: ['შარდონე'],
            tastingNotes: 'ელეგანტური ცქრიალა ღვინო, ციტრუსოვანი ნოტებით',
            servingTemp: '6-8°C',
            price: 85
          },
          {
            id: 3,
            name: 'პეტნატი მწვანე',
            type: WineType.SPARKLING,
            image: '/assets/wines/ცქრიალა/Petnat Mtsvane.png',
            description: 'ნატურალური ცქრიალა ღვინო (მაჭარი)',
            region: 'კახეთი, სოფ. კონდოლი',
            year: 2023,
            alcohol: 11,
            volume: '750 მლ',
            grapes: ['მწვანე'],
            tastingNotes: 'მწიფე ყვითელი და თეთრი ხილის მდიდარი არომატებითა და ცქრიალა საფუარის ტონების სასიამოვნო დაგემოვნებით',
            servingTemp: '8-10°C',
            price: 75
          },
          {
            id: 4,
            name: 'ქისი',
            type: WineType.KVEVRI,
            image: '/assets/wines/ქვევრი/Qvevri_Kisi.png',
            description: 'ქვევრში დადუღებული ქარვისფერი მშრალი ღვინო',
            region: 'კახეთი, სოფ. ბაბანეური, ახმეტის მიკროზონა',
            year: 2024,
            alcohol: 13,
            volume: '750 მლ',
            grapes: ['ქისი'],
            tastingNotes: 'გარგრის ჩირი, ნუში და ტკბილი სანელებლები',
            servingTemp: '10-12°C',
            price: 50
          },
          {
            id: 5,
            name: 'მწვანე',
            type: WineType.CLASSIC,
            image: '/assets/wines/კლასიკური/Mtsvane.png',
            description: 'კლასიკური თეთრი მშრალი ღვინო',
            region: 'კახეთი, ახმეტა',
            year: 2024,
            alcohol: 12.5,
            volume: '750 მლ',
            grapes: ['მწვანე'],
            tastingNotes: 'კომპლექსური არომატი, ღია ნაყოფების და ყვავილების ნოტებით',
            servingTemp: '10-12°C',
            price: 55
          },
          {
            id: 6,
            name: 'მწვანე-შარდონე',
            type: WineType.CLASSIC,
            image: '/assets/wines/კლასიკური/Classic_Mtsvane Chardonnay.png',
            description: 'კლასიკური თეთრი მშრალი ღვინო',
            region: 'კახეთი, სოფ. კურდღელაური, წინანდლის მიკროზონა',
            year: 2024,
            alcohol: 13,
            volume: '750 მლ',
            grapes: ['მწვანე', 'შარდონე'],
            tastingNotes: 'მწიფე მსხლისა და ტროპიკული არომატებით',
            servingTemp: '8-10°C',
            price: 60
          },
          {
            id: 7,
            name: 'საფერავი',
            type: WineType.KVEVRI,
            image: '/assets/wines/ქვევრი/Qvevri_Saperavi.png',
            description: 'ქვევრში დადუღებული წითელი მშრალი ღვინო',
            region: 'კახეთი, სოფ. კონდოლი, წინანდლის მიკროზონა',
            year: 2024,
            alcohol: 14,
            volume: '750 მლ',
            grapes: ['საფერავი'],
            tastingNotes: 'გამოირჩევა მუქი ბროწეული ფერით, მწიფე ხილისა და ყავის არომატებით, დახვეწილი ტანინებითა და ხანგრძლივი დაგემოვნებით',
            servingTemp: '16-18°C',
            price: 65
          },
          {
            id: 8,
            name: 'ქიუვე ქარვისფერი',
            type: WineType.KVEVRI,
            image: '/assets/wines/ქვევრი/Qvevri_Cuvee Amber.png',
            description: 'ქარვისფერი მშრალი ღვინო',
            region: 'კახეთი, სოფ. ბაბანეური, ახმეტის მიკროზონა',
            year: 2021,
            alcohol: 13.5,
            volume: '750 მლ',
            grapes: ['ქისი', 'რქაწითელი', 'მწვანე' ],
            tastingNotes: 'გამოირჩევა თეთრი და ყვითელი ხილის ჩირის არომატებით, მოხალული ნუშისა და ტკბილი სანელებლების დაგემოვნებით',
            servingTemp: '12-14°C',
            price: 85
          },
          {
            id: 9,
            name: 'საფერავი',
            type: WineType.CLASSIC,
            image: '/assets/wines/კლასიკური/Classic_Saperavi.png',
            description: 'კლასიკური წითელი მშრალი ღვინო',
            region: 'კახეთი, სოფ. ბაბანეური, ახმეტის მიკროზონა',
            year: 2022,
            alcohol: 14.5,
            volume: '750 მლ',
            grapes: ['საფერავი'],
            tastingNotes: 'გამოირჩევა ცინცხალი, წვნიანი წითელი კენკრის არომატებით',
            servingTemp: '16-18°C',
            price: 70
          },
          {
            id: 10,
            name: 'ქისი',
            type: WineType.CLASSIC,
            image: '/assets/wines/კლასიკური/Classic_Kisi.png',
            description: 'კლასიკური თეთრი მშრალი ღვინო',
            region: 'კახეთი, სოფ. ბაბანეური, ახმეტის მიკროზონა',
            year: 2023,
            alcohol: 13,
            volume: '750 მლ',
            grapes: ['ქისი'],
            tastingNotes: 'გამოირჩევა ტროპიკული ხილისა და ჩაშაქრული მსხლის არომატებით',
            servingTemp: '10-12°C',
            price: 60
          },
          {
            id: 11,
            name: 'ქიუვე წითელი',
            type: WineType.KVEVRI,
            image: '/assets/wines/ქვევრი/Qvevri_Cuvee Red.png',
            description: 'ქვევრში დადუღებული წითელი მშრალი ღვინო',
            region: 'კახეთი, სოფ. კონდოლი',
            year: 2021,
            alcohol: 13.5,
            volume: '750 მლ',
            grapes: ['საფერავი', 'კაბერნე-სოვინიონი'],
            tastingNotes: 'გამოირჩევა ალუბლისა და მაყვლის მდიდარი არომატით, შოკოლადისა და მოხალული ყავის მარცვლების დაგემოვნებით',
            servingTemp: '12-14°C',
            price: 95
          },
          {
            id: 13,
            name: 'შარდონე',
            type: WineType.CLASSIC,
            image: '/assets/wines/კლასიკური/chardonnay.png',
            description: 'კლასიკური თეთრი მშრალი ღვინო',
            region: 'კახეთი, სოფ. კონდოლი',
            year: 2022,
            alcohol: 13,
            volume: '750 მლ',
            grapes: ['შარდონე'],
            tastingNotes: 'კლასიკური შარდონე, ვანილისა და მუხის არომატით',
            servingTemp: '10-12°C',
            price: 65
          },
          {
            id: 14,
            name: 'პინო ნუარი',
            type: WineType.CLASSIC,
            image: '/assets/wines/კლასიკური/pinowine.png',
            description: 'კლასიკური ვარდისფერი მშრალი ღვინო',
            region: 'კახეთი, სოფ. აკურა',
            year: 2021,
            alcohol: 12.5,
            volume: '750 მლ',
            grapes: ['პინო ნუარი'],
            tastingNotes: 'ნესვის, მარწყვისა და ყვავილოვანი არომატებით',
            servingTemp: '8-10°C',
            price: 80
          },
          {
            id: 15,
            name: 'პეტნატი ქისი',
            type: WineType.SPARKLING,
            image: '/assets/wines/ცქრიალა/petkisi.png',
            description: 'პეტნატი ცქრიალა ღვინო (მაჭარი)',
            region: 'კახეთი, სოფ. ბაბანეური, ახმეტის მიკროზონა',
            year: 2022,
            alcohol: 12,
            volume: '750 მლ',
            grapes: ['ქისი'],
            tastingNotes: 'მწიფე თეთრი და ყვითელი ხილისა და ყვავილოვანი არომატებით',
            servingTemp: '6-8°C',
            price: 70
          },
          {
            id: 16,
            name: 'პეტნატი შარდონე',
            type: WineType.SPARKLING,
            image: '/assets/wines/ცქრიალა/petchar.png',
            description: 'პეტნატი ცქრიალა ღვინო (მაჭარი)',
            region: 'კახეთი, სოფ. კონდოლი',
            year: 2023,
            alcohol: 11.5,
            volume: '750 მლ',
            grapes: ['მწვანე'],
            tastingNotes: 'ტროპიკული და ყვავილოვანი არომატებით',
            servingTemp: '6-8°C',
            price: 75
          },
          {
            id: 17,
            name: 'პინო ნუარი',
            type: WineType.SPARKLING,
            image: '/assets/wines/ცქრიალა/pinospark.png',
            description: 'ცქრიალა ღვინო პინო ნუარი',
            region: 'კახეთი, სოფ. აკურა',
            year: 2022,
            alcohol: 12,
            volume: '750 მლ',
            grapes: ['პინო ნუარი'],
            tastingNotes: 'ველური მარწყისა და ყვავილოვანი არომატებით',
            servingTemp: '6-8°C',
            price: 85
          },
          {
            id: 18,
            name: 'ჩიტისთვალა',
            type: WineType.DESSERT,
            image: '/assets/wines/სადესერტო/chiti.png',
            description: 'სადესერტო ქარვისფერი ღვინო',
            region: 'კახეთი, სოფ. კონდოლი',
            year: 2021,
            alcohol: 16,
            volume: '500ml',
            grapes: ['ჩიტისთვალა'],
            tastingNotes: 'ტკბილი ღვინო, თაფლისა და ტკბილი სანელებლების არომატით',
            servingTemp: '10-12°C',
            price: 110
          },
          {
            id: 19,
            name: 'საფერავი',
            type: WineType.DESSERT,
            image: '/assets/wines/სადესერტო/საფერავი სადესერტო.png',
            description: 'სადესერტო წითელი ღვინო',
            region: 'კახეთი, სოფ. კონდოლი',
            year: 2020,
            alcohol: 18,
            volume: '375ml',
            grapes: ['საფერავი'],
            tastingNotes: 'მოხალული ყავის მარცვლებისა და წითელი კენკრის არომატებით',
            servingTemp: '12-14°C',
            price: 150
          },
          {
            id: 20,
            name: 'ქისი',
            type: WineType.DESSERT,
            image: '/assets/wines/სადესერტო/ქისი სადესერტო.png',
            description: 'სადესერტო ქარვისფერი ღვინო',
            region: 'კახეთი, სოფ. ბაბანეური, ახმეტის მიკროზონა',
            year: 2021,
            alcohol: 17,
            volume: '375ml',
            grapes: ['ქისი'],
            tastingNotes: 'თაფლისა და მწიფე ყვითელი ხილის არომატებით',
            servingTemp: '10-12°C',
            price: 130
          }
        ];
      } 
  filterWines() {
    if (this.selectedType === '') {
      this.filteredWines = this.wines;
    } else {
      this.filteredWines = this.wines.filter(wine => wine.type === this.selectedType);
    }
  }

  selectWine(wine: Wine) {
    this.selectedWine = wine;
    this.isDetailView = true;
    console.log('Selected wine:', wine.name);
    console.log('Detail view:', this.isDetailView);
  }

  goBackToGallery() {
    this.isDetailView = false;
    this.selectedWine = null;
    console.log('Going back to gallery');
  }

  onImageError(event: any) {
    event.target.src = '/assets/wines/default-wine.jpg';
  }
}