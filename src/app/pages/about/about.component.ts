// pages/about/about.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  teamMembers = [
    { name: 'გიორგი', position: 'CEO', image: 'assets/images/team1.jpg' },
    { name: 'ნინო', position: 'CTO', image: 'assets/images/team2.jpg' },
    { name: 'დავითი', position: 'Designer', image: 'assets/images/team3.jpg' },
  ];
}
