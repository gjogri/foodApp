import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private renderer: Renderer2) {}
  todayDate: string = '';
  isMenuOpen: boolean = false;
  @HostListener('window:resize', ['$event'])
  ngOnInit(): void {
    this.todayDate = new Date().toISOString().split('T')[0];
    this.isMenuOpen = false;
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

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  onResize(event: any): void {
    if (event.target.innerWidth > 750) {
      this.closeMenu();
    }
  }
}
