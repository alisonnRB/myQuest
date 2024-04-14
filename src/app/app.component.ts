import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    RouterOutlet,
    HeaderComponent,
    BodyComponent,
  ]
})
export class AppComponent {
  quests : Object = {};
  load : string = 'none';

  ChangeQuests($value: Object): void {
    this.quests = $value;
  }

  ChangeLoad($value: string): void {
    this.load = $value;
  }
}
