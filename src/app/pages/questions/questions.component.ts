import { Component, OnInit } from '@angular/core';
import { Question } from "../../models/Question";
import { ActivatedRoute } from "@angular/router";
import { QuizService } from "../../services/quiz.service";

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  questions!: Question[];
  currentQuestionIndex: number = 0;
  quizStarted: boolean = false;
  categoryId!: string;

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.categoryId = params['categoryId'];
    });
  }

  // Novo método para iniciar o questionário
  startQuiz() {
    this.quizService.getQuestionsForCategory(this.categoryId).subscribe(questions => {
      this.questions = questions;
      this.quizStarted = true; // Define o questionário como iniciado
      this.currentQuestionIndex = 0; // Começa da primeira pergunta
    });
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }
}
