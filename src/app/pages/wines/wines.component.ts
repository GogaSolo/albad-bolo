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
  DESSERT = 'სადესერტო',
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
        name: 'Rkatsiteli',
        type: WineType.KVEVRI,
        image: '/assets/wines/ქვევრი/Qvevri_Rkatsiteli.png',
        description: 'Amber Dry Wine',
        region: 'Kakheti, Village Babaneuri, Akhmeta Appelation',
        year: 2022,
        alcohol: 13,
        volume: '750ml',
        grapes: ['Rkatsiteli'],
        tastingNotes: 'Dried apricot, almond and sweet spices',
        servingTemp: '10-12°C',
        price: 45
      },
      {
        id: 2,
        name: 'Chardonnay',
        type: WineType.SPARKLING,
        image: '/assets/wines/ცქრიალა/chps.png',
        description: 'Chardonnay Sparkling Wine',
        region: 'Kakheti, Village Kondoli',
        year: 2021,
        alcohol: 12,
        volume: '750ml',
        grapes: ['Chardonnay'],
        tastingNotes: 'Elegant wine with tropical notes',
        servingTemp: '6-8°C',
        price: 85
      },
      {
        id: 3,
        name: 'PetNat Mtsvane',
        type: WineType.SPARKLING,
        image: '/assets/wines/ცქრიალა/Petnat Mtsvane.png',
        description: 'Petnat Sparkling Wine (Machari)',
        region: 'Kakheti',
        year: 2023,
        alcohol: 11,
        volume: '750ml',
        grapes: ['Mtsvane'],
        tastingNotes: 'Ripe yellow and white fruits and a taste with a pleasant sparkling yeast touch',
        servingTemp: '8-10°C',
        price: 75
      },
      {
        id: 4,
        name: 'Kisi',
        type: WineType.KVEVRI,
        image: '/assets/wines/ქვევრი/Qvevri_Kisi.png',
        description: 'Amber Dry Wine',
        region: 'Kakheti, Village Babaneuri, Akhmeta Appelation',
        year: 2024,
        alcohol: 13,
        volume: '750ml',
        grapes: ['Kisi'],
        tastingNotes: 'Dried apricot, almond and sweet spices',
        servingTemp: '10-12°C',
        price: 50
      },
      {
        id: 5,
        name: 'Mtsvane',
        type: WineType.CLASSIC,
        image: '/assets/wines/კლასიკური/Mtsvane.png',
        description: 'Classical White Dry Wine',
        region: 'Kakheti, Akhmeta',
        year: 2024,
        alcohol: 12.5,
        volume: '750ml',
        grapes: ['Mtsvane'],
        tastingNotes: 'Ripe exotic fruits and citruses',
        servingTemp: '8-10°C',
        price: 55
      },
      {
        id: 6,
        name: 'Mtsvane-Chardonnay',
        type: WineType.CLASSIC,
        image: '/assets/wines/კლასიკური/Classic_Mtsvane Chardonnay.png',
        description: 'Classical White Wine',
        region: 'Kakheti, Village Kurdgelauri, Tsinandali Apellation',
        year: 2024,
        alcohol: 13,
        volume: '750ml',
        grapes: ['Mtsvane', 'Chardonnay'],
        tastingNotes: 'Ripe pear and exotic fruits',
        servingTemp: '8-10°C',
        price: 60
      },
      {
        id: 7,
        name: 'Saperavi',
        type: WineType.KVEVRI,
        image: '/assets/wines/ქვევრი/Qvevri_Saperavi.png',
        description: 'Red Dry Wine',
        region: 'Kakheti, Village Kondoli, Tsinandali Appelation',
        year: 2024,
        alcohol: 14,
        volume: '750ml',
        grapes: ['Saperavi'],
        tastingNotes: 'Pomegranate color with ripe fruit and coffee aromas',
        servingTemp: '16-18°C',
        price: 65
      },
      {
        id: 8,
        name: 'Cuvee Amber',
        type: WineType.KVEVRI,
        image: '/assets/wines/ქვევრი/Qvevri_Cuvee Amber.png',
        description: 'Amber Dry Wine',
        region: 'Kakheti, Village Babaneuri, Akhmeta Appelation',
        year: 2021,
        alcohol: 13.5,
        volume: '750ml',
        grapes: ['Kisi', 'Rkatsiteli', 'Mtsvane' ],
        tastingNotes: 'Dried white and yellow fruits, roasted almonds and sweet spices',
        servingTemp: '12-14°C',
        price: 85
      },
      {
        id: 9,
        name: 'Saperavi',
        type: WineType.CLASSIC,
        image: '/assets/wines/კლასიკური/Classic_Saperavi.png',
        description: 'Classical Red Dry Wine',
        region: 'Kakheti, Village Babaneuri, Akhmeta Appelation',
        year: 2022,
        alcohol: 14.5,
        volume: '750ml',
        grapes: ['Saperavi'],
        tastingNotes: 'Fresh, ripe, juicy redberry nose',
        servingTemp: '16-18°C',
        price: 70
      },
      {
        id: 10,
        name: 'Kisi',
        type: WineType.CLASSIC,
        image: '/assets/wines/კლასიკური/Classic_Kisi.png',
        description: 'Classical White Dry Wine ',
        region: 'Kakheti, Village Babaneuri, Akhmeta Appelation',
        year: 2023,
        alcohol: 13,
        volume: '750ml',
        grapes: ['Kisi'],
        tastingNotes: ' Grapefruit, tropical fruit, and candied pear',
        servingTemp: '10-12°C',
        price: 60
      },
      {
        id: 11,
        name: 'Cuvee Red',
        type: WineType.KVEVRI,
        image: '/assets/wines/ქვევრი/Qvevri_Cuvee Red.png',
        description: 'Red Dry Wine',
        region: 'Kakheti, Village Kondoli',
        year: 2021,
        alcohol: 13.5,
        volume: '750ml',
        grapes: ['Saperavi', 'Cabernet-Sauvignon'],
        tastingNotes: 'Ripe cherry and blackberry, chocolate and roasted coffee beans',
        servingTemp: '12-14°C',
        price: 95
      },
      {
        id: 13,
        name: 'Chardonnay',
        type: WineType.CLASSIC,
        image: '/assets/wines/კლასიკური/chardonnay.png',
        description: 'Classical White Dry Wine',
        region: 'Kakheti, Village Kondoli',
        year: 2022,
        alcohol: 13,
        volume: '750ml',
        grapes: ['Chardonnay'],
        tastingNotes: 'კლასიკური შარდონე, ვანილისა და მუხის არომატით',
        servingTemp: '10-12°C',
        price: 65
      },
      {
        id: 14,
        name: 'Pinot Noir',
        type: WineType.CLASSIC,
        image: '/assets/wines/კლასიკური/pinowine.png',
        description: 'Rose Dry Wine',
        region: 'Kakheti, Village Akura',
        year: 2021,
        alcohol: 12.5,
        volume: '750ml',
        grapes: ['Pinot Noir'],
        tastingNotes: 'Melon, wild strawberry and floral characters',
        servingTemp: '8-10°C',
        price: 80
      },
      {
        id: 15,
        name: 'PetNat Kisi',
        type: WineType.SPARKLING,
        image: '/assets/wines/ცქრიალა/petkisi.png',
        description: 'Petnat Sparkling Wine (Machari)',
        region: 'Kakheti, Village Babaneuri, Akhmeta Appelation',
        year: 2022,
        alcohol: 12,
        volume: '750ml',
        grapes: ['Kisi'],
        tastingNotes: 'Ripe white and yellow fruits and a taste with a pleasant foral fnish',
        servingTemp: '6-8°C',
        price: 70
      },
      {
        id: 16,
        name: 'PetNat Chardonnay',
        type: WineType.SPARKLING,
        image: '/assets/wines/ცქრიალა/petchar.png',
        description: 'Petnat Sparkling Wine (Machari)',
        region: 'Kakheti, Village Kondoli',
        year: 2023,
        alcohol: 11.5,
        volume: '750ml',
        grapes: ['Chardonnay'],
        tastingNotes: 'Rich foral aromas, citruses, and tropical fruits',
        servingTemp: '6-8°C',
        price: 75
      },
      {
        id: 17,
        name: 'Pinot Noir',
        type: WineType.SPARKLING,
        image: '/assets/wines/ცქრიალა/pinospark.png',
        description: 'Sparkling Wine',
        region: 'Kakheti, Village Akura',
        year: 2022,
        alcohol: 12,
        volume: '750ml',
        grapes: ['Pinot Noir'],
        tastingNotes: 'Melon, winld strawberry and floral characters',
        servingTemp: '6-8°C',
        price: 85
      },
      {
        id: 18,
        name: 'Chitistvala',
        type: WineType.DESSERT,
        image: '/assets/wines/სადესერტო/chiti.png',
        description: 'Dessert Amber Wine',
        region: 'Kakheti, Village Kondoli',
        year: 2021,
        alcohol: 16,
        volume: '500ml',
        grapes: ['Chitistvala'],
        tastingNotes: 'Sweet wine with honey and sweet spices aromas',
        servingTemp: '10-12°C',
        price: 110
      },
      {
        id: 19,
        name: 'Saperavi',
        type: WineType.DESSERT,
        image: '/assets/wines/სადესერტო/საფერავი სადესერტო.png',
        description: 'Dessert Red Wine',
        region: 'Kakheti, Village Kondoli',
        year: 2020,
        alcohol: 18,
        volume: '375ml',
        grapes: ['Saperavi'],
        tastingNotes: 'Sweet wine with roasted coffee beans and ripe red berry aromas',
        servingTemp: '12-14°C',
        price: 150
      },
      {
        id: 20,
        name: 'Kisi',
        type: WineType.DESSERT,
        image: '/assets/wines/სადესერტო/ქისი სადესერტო.png',
        description: 'Dessert Amber Wine',
        region: 'Kakheti, Village Babaneuri, Akhmeta Appelation',
        year: 2021,
        alcohol: 17,
        volume: '375ml',
        grapes: ['Kisi'],
        tastingNotes: 'Sweet wine with honey and ripe yellow fruits aromas',
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