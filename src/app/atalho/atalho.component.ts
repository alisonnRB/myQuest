import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollTopService } from '../service/scroll.service';

@Component({
  selector: 'app-atalho',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './atalho.component.html',
  styleUrl: './atalho.component.css'
})
export class AtalhoComponent {
  @Input() quest : any = {};
  @Input() index : number = 1;

  constructor(private scrollTopService: ScrollTopService) { }

  toDiv() {
    this.scrollTopService.scrollToComponent(this.index);
  }
}
