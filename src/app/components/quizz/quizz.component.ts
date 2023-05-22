import { Component, OnInit } from '@angular/core';
import quizz_questions from "../../../assets/data/quizz_questions.json"


@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {

  ngOnInit(): void {
    if (quizz_questions) {
      this.finished = false

      this.question = quizz_questions.questions
      this.questionSelected = this.question[this.questionIndex]

      this.questionMaxIndex = quizz_questions.questions.length

    }
  }
  constructor(){}

  
  question:any
  questionSelected:any

  answers:string[] = []
  answerSelected:string = ""

  questionIndex:number = 0
  questionMaxIndex:number = 0

  finished:boolean = false

  playerChoose(value:string) {
    this.answers.push(value)
    this.nextStep()
  }

  async nextStep() {
    this.questionIndex += 1

    if (this.questionMaxIndex > this.questionIndex){
      this.questionSelected = this.question[this.questionIndex]
    }
    else {
      const finalAnswer:string = await this.checkResults(this.answers)
      this.finished = true
      this.answerSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results]
    }
  }

  async checkResults(answers:string[]) {
    const result = answers.reduce((previous, current, i, arr) => {
      if (arr.filter(item => item === previous).length > arr.filter(item => item === current).length) {
        return previous
      }
      else {
        return current
      }
    })

    return result
  }

  
}