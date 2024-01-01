import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Category } from "../models/Category";
import { Question } from "../models/Question";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(
    private firestore: AngularFirestore
  ) {}

  getCategories() {
    return this.firestore.collection<Category>('category').valueChanges({ idField: 'id' });
  }

  addQuestion(question: Question) {
    return this.firestore.collection('question').add(question);
  }

  getQuestionsForCategory(categoryId: string): Observable<Question[]> {
    return this.firestore.collection<Question>('question',
        ref => ref.where('categoryId', '==', categoryId))
      .valueChanges();
  }
}
