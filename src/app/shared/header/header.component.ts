import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor() {}
  todayDate: string = '';

  ngOnInit(): void {
    this.todayDate = new Date().toISOString().split('T')[0];
  }
  scrollToFooter(): void {
    const footer = document.getElementById('footerSection');
    if (footer) {
      footer.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
  }
}
