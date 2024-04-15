import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CardQuestComponent } from '../card-quest/card-quest.component';
import Persistence from '../service/Persistence';
import { ScrollTopService } from '../service/scroll.service';
import { Subscription } from 'rxjs';
import { AtalhoComponent } from '../atalho/atalho.component';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [
    CommonModule,
    CardQuestComponent,
    AtalhoComponent,
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
  private subscription: Subscription;

  constructor(private persistence : Persistence, private scrollTopService : ScrollTopService){
    this.subscription = this.scrollTopService.scrollEvent$.subscribe((index: number) => {
      this.scrollToComponente(index);
    });    
  }

  scrollToTop() {
    const divElement = document.getElementById('roll');
    if (divElement) {
      divElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  scrollToComponente(index: number) {
    if (index === 0) {
      this.scrollToTop();
      return;
    }
    
    const divId = `comp-${index}`;
    const divElement = document.getElementById(divId);
    if (divElement) {
      divElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  ngOnInit(){
    const Data: any = this.persistence.getPersistence();
    if(Data){
      this.quests = Data.quests;
    }
  }
}
