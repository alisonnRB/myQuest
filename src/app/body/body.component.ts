import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent implements OnChanges {
  @Input() quests: Object = {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['quests'] && !changes['quests'].firstChange) {
      console.log('A variável childData mudou:', this.quests);
    }
  }
}
