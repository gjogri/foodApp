import { Component, OnInit } from '@angular/core';
import { recipeService } from 'src/app/services/recipeService';

@Component({
  selector: 'app-jokes-dialog',
  templateUrl: './jokes-dialog.component.html',
  styleUrls: ['./jokes-dialog.component.scss'],
})
export class JokesDialogComponent implements OnInit {
  public joke = '';
  public words = '';
  constructor(private recipeService: recipeService) {}

  ngOnInit(): void {
    this.getAnotherJoke();
  }

  getAnotherJoke() {
    this.recipeService.getRandomJokes().subscribe((newJoke) => {
      this.words = newJoke.text.split(' ');
      if (this.words.length > 30) {
        this.getAnotherJoke(); // If joke exceeds 30 words, fetch another one
      } else {
        this.joke = newJoke.text;
      }
    });
  }
}
