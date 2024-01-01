import {Component, OnInit} from '@angular/core';
import { QuizService } from "../../../services/quiz.service";
import { Category } from "../../../models/Category";
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { NgToastService } from "ng-angular-popup";

@Component({
  selector: 'app-admin-quiz',
  templateUrl: './admin-quiz.component.html',
  styleUrls: ['./admin-quiz.component.css']
})
export class AdminQuizComponent implements OnInit {
  categories: Category[] = [];
  questionForm: FormGroup;

  constructor(
    private quizService: QuizService,
    private toast: NgToastService
  ) {
    // Inicializa o questionForm
    this.questionForm = new FormGroup({
      categoryId: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),
      correctAnswer: new FormControl('', Validators.required),
      options: new FormArray([
        new FormControl(''),
        new FormControl(''),
        new FormControl(''),
        new FormControl('')
      ])
    });
  }

  ngOnInit() {
    this.quizService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  get options() {
    return this.questionForm.get('options') as FormArray;
  }

  addQuestion() {
    if (this.questionForm.valid) {
      this.quizService.addQuestion(this.questionForm.value).then(() => {
        this.toast.success({
          detail: "Sucesso",
          summary: "Questão criada com sucesso.",
          duration: 6000
        });
        this.questionForm.reset(); // Reseta o formulário
      }).catch(error => {
        this.toast.error({
          detail: "Error",
          summary: "Erro ao adicionar: " + error.toString(),
          duration: 6000
        });
      });
    }
  }

  trackByFn(index: any, item: any) {
    return index;
  }
}
