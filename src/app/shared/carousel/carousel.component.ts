import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  carouselItems: any[] = [];

  ngOnInit(): void {
    this.carouselItems = [
      {
        src: 'https://img.freepik.com/free-vector/flat-international-tea-day-background_23-2149346995.jpg',
        alt: 'Image 1',
      },
      {
        src: 'https://images.template.net/108159/food-clipart-background-1q5e4.png',
        alt: 'Image 1',
      },
      {
        src: 'https://images.template.net/113398/world-food-day-cartoon-background-h6xy8.png',
        alt: 'Image 1',
      },
      {
        src: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQBhIgqH6xbpMa9NmBo_AYKoGC8EEmsWneFi6sPwABFXpz38MjI',
        alt: 'Image 1',
      },
    ];
  }

  customOptions: any = {
    loop: true,
    mouseDrag: false,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 3000,
    navText: ['TEST', 'XAXAXA'],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
  };
}
