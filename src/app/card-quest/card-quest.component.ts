import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Persistence from '../dataPersistence/Persistence';

@Component({
  selector: 'app-card-quest',
  standalone: true,
  imports: [
    CommonModule
  ],
  providers:[
    Persistence,
  ],
  templateUrl: './card-quest.component.html',
  styleUrl: './card-quest.component.css'
})
export class CardQuestComponent {
  @Input() quest: any = {};
  @Input() index: number = 0;
  public done : boolean = false;
  public right: boolean = false;
  public answer: number = 0;
  public letras: any = {
    '1': 'A',
    '2': 'B',
    '3': 'C',
    '4': 'D',
    '5': 'E'
  }

  constructor(private persistence : Persistence){}

  ngOnInit(){
    this.done = this.quest.zDone || false;
    this.right = this.quest.zRight || false;
    this.answer = this.quest.zAnswer || 0;
  }

  public answered(value: any, index: number) {
    if(this.done){
      return;
    }
    
    this.done = true;
    this.answer = index;
    if(value !== this.quest.resposta){
      this.right = false;
    }else{
      this.right = true;
    }

    this.persistir();
  }

  persistir(): void{
    this.persistence.answerPersistece(this.index, this.done, this.right, this.answer);
  }


}
