import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { RecipeModel } from 'src/app/_models/recipeModel';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
})
export class RecipeCardComponent implements OnInit {
  @Input() recipe: RecipeModel = new RecipeModel();

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {}

  getRecipeInformation(recipeId: number) {
    this.router.navigate(['/recipes', recipeId]);
  }
}
