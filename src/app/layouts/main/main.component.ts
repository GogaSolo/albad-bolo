import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class CustomSliderComponent implements OnInit, OnDestroy {
  slideIndex: number = 0;
  private intervalId?: number;

  // Your slide images
  slides = [
    '/assets/fotoebi/PSX_20221110_124933.jpg',
    '/assets/fotoebi/PSX_20221110_125036.jpg',
    '/assets/fotoebi/121686702_3737522102938266_6610487812132594443_n.jpg',
  ];

  constructor() {}

  ngOnInit(): void {
    // Run once at start
    this.showSlides();

    // Then every 7 seconds
    this.intervalId = window.setInterval(() => {
      this.showSlides();
    }, 7000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  // Next slide function (equivalent to plusSlides)
  plusSlides(n: number): void {
    this.slideIndex += n;
    this.showSlidesManual();
  }

  // Previous slide function (equivalent to plusSlidesr)
  plusSlidesr(n: number): void {
    this.slideIndex -= n;
    this.showSlidesManual();
  }

  // Show slides function (auto)
  showSlides(): void {
    this.slideIndex++;
    if (this.slideIndex > this.slides.length) {
      this.slideIndex = 1;
    }
  }

  // Show slides function (manual navigation)
  showSlidesManual(): void {
    if (this.slideIndex > this.slides.length) {
      this.slideIndex = 1;
    }
    if (this.slideIndex < 1) {
      this.slideIndex = this.slides.length;
    }
  }

  // Check if slide is currently active
  isActiveSlide(index: number): boolean {
    return this.slideIndex === index + 1;
  }

  // Get current slide (1-based index)
  getCurrentSlide(): number {
    return this.slideIndex === 0 ? 1 : this.slideIndex;
  }
}
