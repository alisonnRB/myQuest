import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-quest',
  standalone: true,
  imports: [
    CommonModule
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
  }
}
