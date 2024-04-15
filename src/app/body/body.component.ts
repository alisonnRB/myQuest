import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CardQuestComponent } from '../card-quest/card-quest.component';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [
    CommonModule,
    CardQuestComponent
  ],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent implements OnChanges {
  @Input() quests: Object = {};
  @Input() load: string = 'none';
  teste: any = {
    questao: 'oioioioiioi',
    opcao1: 'mlmkmmmkmkn',
    opcao2: 'mdfodkfodk',
    opcao3: 'kmkmskamsk',
    resposta: 'mlmkmmmkmkn'
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['quests'] && !changes['quests'].firstChange) {
      console.log('A variável childData mudou:', this.quests);
    }

    if (changes['load'] && !changes['load'].firstChange) {
      console.log('A variável childData mudou:', this.load);
    }
  }
}
