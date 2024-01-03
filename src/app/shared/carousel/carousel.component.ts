import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  carouselItems: any[] = [];

  ngOnInit(): void {
    console.log('CAROUSEL');
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
        src: 'https://media.istockphoto.com/id/1148762903/photo/cook-preparing-bacon-slices-with-garlic-and-hot-pepper-and-broccoli-in-a-pan.jpg?s=2048x2048&w=is&k=20&c=qgum4MoinLkn-pijmXsQGfG4ERiXfbfMGU9-ToofZ_s=',
        alt: 'Image 1',
      },
    ];
    console.log('this', this.carouselItems);
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
