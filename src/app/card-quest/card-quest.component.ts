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
  public letras: any = {
    '1': 'A',
    '2': 'B',
    '3': 'C',
    '4': 'D',
    '5': 'E'
  }
}
