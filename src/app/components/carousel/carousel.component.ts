import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
  cards = [
    { title: 'Card 1', content: 'This is the first card.' },
    { title: 'Card 2', content: 'This is the second card.' },
    { title: 'Card 3', content: 'This is the third card.' },
    { title: 'Card 4', content: 'This is the fourth card.' },
    { title: 'Card 5', content: 'This is the fifth card.' },
    { title: 'Card 6', content: 'This is the sixth card.' }
  ];

  currentIndex = 0;
  cardsPerView = 3;

  ngOnInit(): void {
    this.updateCardsPerView();
  }

  @HostListener('window:resize')
  onResize() {
    this.updateCardsPerView();
  }

  updateCardsPerView() {
    const width = window.innerWidth;
    if (width < 576) {
      this.cardsPerView = 1;
    } else if (width < 992) {
      this.cardsPerView = 2;
    } else {
      this.cardsPerView = 3;
    }

    // Adjust index if overflowed
    if (this.currentIndex > this.cards.length - this.cardsPerView) {
      this.currentIndex = Math.max(0, this.cards.length - this.cardsPerView);
    }
  }

  next() {
    if (this.currentIndex < this.cards.length - this.cardsPerView) {
      this.currentIndex++;
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  getTransformStyle(): string {
    return `translateX(-${(100 / this.cardsPerView) * this.currentIndex}%)`;
  }

  getCardWidth(): string {
    return `${100 / this.cardsPerView}%`;
  }
}
