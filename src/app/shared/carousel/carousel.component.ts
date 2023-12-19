import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  slides: any[] = new Array(3).fill({
    id: -1,
    src: '',
    title: '',
    subtitle: '',
  });

  constructor() {}

  ngOnInit(): void {
    this.slides[0] = {
      src: 'https://scontent.fskp4-1.fna.fbcdn.net/v/t1.6435-9/120291304_166913655078444_5202734340586219777_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=300f58&_nc_ohc=cP9Kqs7Z7DYAX8NNvMw&_nc_ht=scontent.fskp4-1.fna&oh=00_AfCLlnq_9V46PN0yEvdEeN-zlIhgBdoE5P0xAaLCuvcuTA&oe=659FB59D',
    };
    this.slides[1] = {
      src: 'https://timelinecovers.pro/facebook-cover/download/burger-with-french-fries-facebook-cover.jpg',
    };
    this.slides[2] = {
      src: 'https://img.freepik.com/photos-premium/hamburger-laitue-tomate-laitue-fond-sombre_896360-4273.jpg',
    };

    console.log(this.slides);
  }
}
