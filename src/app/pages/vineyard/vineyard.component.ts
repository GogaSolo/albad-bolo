import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { vineyardssliderComponent } from "../../components/vineyardsslider/vineyardsslider.component";


@Component({
  selector: 'app-vineyard',
  standalone: true,
  imports: [CommonModule, vineyardssliderComponent],
  templateUrl: './vineyard.component.html',
  styleUrl: './vineyard.component.scss'
})
export class VineyardComponent  {
    @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
  
  videoSource = 'assets/WINES FROM DAKISHVILI FAMILY 2020 - Copy.mp4';

  ngAfterViewInit() {
    if (this.videoPlayer) {
      const video = this.videoPlayer.nativeElement;
      video.muted = true; // uech muted unda iyos
      video.play().catch(error => {
        document.addEventListener('click', () => {
          video.play();
        }, { once: true });
      });
    }
  }
}
