import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CardQuestComponent } from '../card-quest/card-quest.component';
import Persistence from '../dataPersistence/Persistence';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [
    CommonModule,
    CardQuestComponent
  ],
  providers: [
    Persistence,
  ],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent{
  @Input() quests: Object = {};
  @Input() load: string = 'none';

  constructor(private persistence : Persistence){}

  ngOnInit(){
    const Data: any = this.persistence.getPersistence();
    if(Data){
      this.quests = Data.quests;
    }
  }
}
