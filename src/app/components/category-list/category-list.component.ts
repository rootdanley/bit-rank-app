// src/app/components/category-list/category-list.component.ts

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from './../../models/Category';
import {Router} from "@angular/router";
import {QuizService} from "../../services/quiz.service";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories$!: Observable<Category[]>;

  constructor(
    private quizService: QuizService,
    private router:Router
    ) {}


  viewCategory(categoryId: string){
    this.router.navigate(['/questions', categoryId])
  }

  ngOnInit(): void {
    this.categories$ = this.quizService.getCategories();
  }
}
